// confirmController.ts

import { Request, Response } from 'express';
import * as bookingModel from '../../models/registerAgendamentoModel.js';
import db from '../../../core/config/dbConnection.js';
import { checkSlotAvailable } from '../../../database/queries/agendamentoQuery.js';
import { RowDataPacket } from 'mysql2';

const newPath = "pages/shop/confirm/index";

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    const service = req.query.service;
    const barber = req.query.barber;
    const datetime = req.query.datetime
    res.render(newPath, { page: "confirm", title: "Confirm", token, service, barber, datetime });
};

export const saveBooking = async (req: Request, res: Response) => {
    try {
        const { servicoId, funcionarioId, data, hora, datetime, especificacoes } = req.body;
        const usuarioId = Number(req.user!.id);

        let bookingDate = data;
        let bookingTime = hora;

        if ((!bookingDate || !bookingTime) && datetime) {
            const [parsedDate, parsedTime] = String(datetime).split('T');
            bookingDate = parsedDate;
            bookingTime = parsedTime;
        }

        if (!servicoId || !funcionarioId || !bookingDate || !bookingTime) {
            return res.status(400).send("Dados de agendamento incompletos.");
        }

        const [[{ total }]] = await db.query<RowDataPacket[]>(
            checkSlotAvailable,
            [Number(funcionarioId), bookingDate, bookingTime]
        );
        if (Number(total) > 0) {
            console.warn(`⚠️  - Slot já ocupado: funcionario=${funcionarioId} ${bookingDate} ${bookingTime}`);
            return res.status(409).send("Este horário já está agendado para esse barbeiro. Escolha outro horário.");
        }

        await bookingModel.registerNewBooking(
            usuarioId,
            Number(funcionarioId),
            Number(servicoId),
            bookingDate,
            bookingTime,
            especificacoes || ''
        );

        console.log(`✅ - Booking: \x1b[92mUser ${usuarioId}\x1b[0m, \x1b[92m${bookingDate} ${bookingTime}\x1b[0m\n`);

        return res.redirect(`/home/${req.params.token}`);

    } catch (err) {
        console.error('❌ - Booking: \x1b[31m$', err, '\x1b[0m\n');
        return res.status(500).send("Erro ao confirmar agendamento.");
    }
};