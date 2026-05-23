// employeesController.ts

import { Request, Response } from 'express';
import db from '../../../core/config/dbConnection.js';
import { RowDataPacket } from 'mysql2';

const newPath = "pages/admin/components/employees/index";

export const page = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const [funcionarios] = await db.query<RowDataPacket[]>(`
            SELECT f.id, f.cpf, f.telefone, f.cargo, p.nome, u.email
            FROM funcionario f
            JOIN usuario u ON u.id = f.usuario_id
            JOIN pessoa p ON p.id = u.pessoa_id
            ORDER BY p.nome
        `);
        res.render(newPath, { page: "employees", title: "Employees", token, funcionarios });
    } catch (err) {
        console.error('❌ Employees:', err);
        res.status(500).send('Erro ao carregar funcionários.');
    }
};