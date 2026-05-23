// agendamentoController.ts

import { Request, Response } from 'express';
import db from '../../../core/config/dbConnection.js';
import { findAgendamentosByDateAndService, findAllAgendamentos, findAgendamentosByFuncionario } from '../../../database/queries/agendamentoQuery.js';
import { RowDataPacket } from 'mysql2';

export const getBookedTimes = async (req: Request, res: Response) => {
    try {
        const { data, servicoId, funcionarioId } = req.query;

        if (funcionarioId) {
            const [rows] = await db.query<RowDataPacket[]>(findAgendamentosByFuncionario, [funcionarioId]);
            return res.json({
                bookedTimes: rows.map((row: any) => ({
                    data:         row.data,
                    hora:         row.hora,
                    servico_nome: row.servico_nome,
                    cliente_nome: row.cliente_nome,
                    funcionario_id: row.funcionario_id,
                }))
            });
        }

        if (!data || !servicoId) {
            return res.status(400).json({ error: 'Data e servicoId são obrigatórios quando funcionarioId não é informado' });
        }

        const [rows] = await db.query<RowDataPacket[]>(findAgendamentosByDateAndService, [data, servicoId]);
        
        return res.json({
            bookedTimes: rows.map((row: any) => ({
                hora: row.hora,
                funcionario: row.funcionario_nome,
                cliente: row.usuario_id
            }))
        });

    } catch (err) {
        console.error('❌ Get Booked Times Error:', err);
        return res.status(500).json({ error: 'Erro ao buscar horários agendados' });
    }
};

export const getAllBookedTimes = async (req: Request, res: Response) => {
    try {
        const [rows] = await db.query<RowDataPacket[]>(findAllAgendamentos);
        return res.json({ booked: rows });
    } catch (err) {
        console.error('❌ Get All Booked Times Error:', err);
        return res.status(500).json({ error: 'Erro ao buscar agendamentos' });
    }
};