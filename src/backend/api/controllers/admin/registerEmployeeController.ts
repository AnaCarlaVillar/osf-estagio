// registerEmployeeController.ts

import { Request, Response } from 'express';
import db from '../../../core/config/dbConnection.js';
import { ResultSetHeader } from 'mysql2';
import bcrypt from 'bcryptjs';
import { generateUserToken } from '../../../core/utils/token.js';

export const page = (req: Request, res: Response) => {
    const token = req.params.token;
    res.render("pages/admin/components/employees/register/index", {
        page: "register-employee", title: "Cadastrar Funcionário", token
    });
};

export const editPage = async (req: Request, res: Response) => {
    try {
        const { id, token } = req.params;
        const [rows] = await db.query<ResultSetHeader[]>(
            `SELECT f.id, f.cpf, f.telefone, f.cargo, p.nome, u.email, u.id AS usuario_id
             FROM funcionario f
             JOIN usuario u ON u.id = f.usuario_id
             JOIN pessoa p ON p.id = u.pessoa_id
             WHERE f.id = ?`, [id]
        );
        const func = (rows as any[])[0];
        if (!func) return res.status(404).send('Funcionário não encontrado.');
        res.render("pages/admin/components/employees/register/index", {
            page: "edit-employee", title: "Editar Funcionário", token, func
        });
    } catch (err) {
        res.status(500).send('Erro ao carregar funcionário.');
    }
};

export const editSave = async (req: Request, res: Response) => {
    try {
        const { id, token } = req.params;
        const { nome, cpf, telefone, email, cargo } = req.body;

        const [func] = await db.query<any[]>(`SELECT usuario_id FROM funcionario WHERE id = ?`, [id]);
        const usuarioId = (func as any[])[0]?.usuario_id;
        if (!usuarioId) return res.status(404).send('Funcionário não encontrado.');

        await db.query(`UPDATE pessoa SET nome = ? WHERE id = (SELECT pessoa_id FROM usuario WHERE id = ?)`, [nome, usuarioId]);
        await db.query(`UPDATE usuario SET email = ? WHERE id = ?`, [email, usuarioId]);
        await db.query(`UPDATE funcionario SET cpf = ?, telefone = ?, cargo = ? WHERE id = ?`, [cpf || null, telefone || null, cargo, id]);

        const newToken = generateUserToken({ id: req.user!.id, cargo: req.user!.cargo ?? null });
        return res.redirect(`/employees/${newToken}`);
    } catch (err: any) {
        if (err?.code === 'ER_DUP_ENTRY') return res.status(400).send('CPF ou e-mail já cadastrado.');
        console.error('❌ Editar funcionário:', err);
        return res.status(500).send('Erro ao editar funcionário.');
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { nome, cpf, telefone, email, senha } = req.body;
        const token = req.params.token;

        if (!nome || !cpf || !email || !senha) {
            return res.status(400).send("Dados incompletos.");
        }

        const senhaHash = await bcrypt.hash(senha, 10);

        // Cria pessoa (nome apenas — cpf/telefone ficam no funcionario)
        const [pessoaResult] = await db.query<ResultSetHeader>(
            "INSERT INTO pessoa (nome) VALUES (?)",
            [nome]
        );

        // Cria usuario
        const [usuarioResult] = await db.query<ResultSetHeader>(
            "INSERT INTO usuario (pessoa_id, email, senha) VALUES (?, ?, ?)",
            [pessoaResult.insertId, email, senhaHash]
        );

        // Cria funcionario com cpf e telefone
        await db.query<ResultSetHeader>(
            "INSERT INTO funcionario (usuario_id, cpf, telefone, cargo) VALUES (?, ?, ?, 'funcionario')",
            [usuarioResult.insertId, cpf, telefone || null]
        );

        console.log(`✅ Funcionário cadastrado: ${nome} (${email})`);

        const newToken = generateUserToken({ id: req.user!.id, cargo: req.user!.cargo ?? null });
        return res.redirect(`/employees/${newToken}`);

    } catch (err: any) {
        if (err?.code === 'ER_DUP_ENTRY') {
            return res.status(400).send("CPF ou e-mail já cadastrado.");
        }
        console.error('❌ Cadastro funcionário:', err);
        return res.status(500).send("Erro ao cadastrar funcionário.");
    }
};
