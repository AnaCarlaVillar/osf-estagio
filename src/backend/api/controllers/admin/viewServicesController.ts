// viewServicesController.ts

import { Request, Response } from 'express';
import db from '../../../core/config/dbConnection.js';
import * as servicoModel from '../../models/servicoModel.js';
import * as funcionarioModel from '../../models/funcionarioModel.js';
import { findBarberServices } from '../../../database/queries/agendamentoQuery.js';
import { RowDataPacket } from 'mysql2';

const newPath = "pages/admin/components/services/view";

export const page = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const cargo = req.user?.cargo;
        const isBarber = cargo !== null && cargo !== undefined;

        // Se for funcionario (não admin), busca apenas o próprio ID
        let myFuncionarioId: number | null = null;
        if (cargo === 'funcionario') {
            const [rows] = await db.query<RowDataPacket[]>(
                'SELECT id FROM funcionario WHERE usuario_id = ?', [req.user!.id]
            );
            myFuncionarioId = (rows as any[])[0]?.id ?? null;
        }

        const [services, barbers] = await Promise.all([
            servicoModel.getAll(),
            funcionarioModel.getAllBarbeiros(),
        ]);

        const [barberServiceRows] = await db.query<RowDataPacket[]>(findBarberServices);
        const barberServices = barberServiceRows.reduce((acc: Record<string, any>, row: any) => {
            const key = row.funcionario_id;
            if (!acc[key]) {
                acc[key] = {
                    funcionario_id: row.funcionario_id,
                    funcionario_nome: row.funcionario_nome,
                    servicos: [],
                };
            }
            acc[key].servicos.push({
                servico_id: row.servico_id,
                servico_nome: row.servico_nome,
            });
            return acc;
        }, {} as Record<string, any>);
        
        res.render(newPath, {
            page: "services-view",
            title: "View Services",
            token,
            isBarber,
            myFuncionarioId,
            services: services || [],
            barbers: barbers || [],
            barberServices: Object.values(barberServices),
        });
    } catch (err) {
        console.error('❌ View Services Error:', err);
        res.status(500).send('Erro ao carregar serviços');
    }
};