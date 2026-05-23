// produtoController.ts

import { Request, Response } from 'express';
import db from '../../../core/config/dbConnection.js';
import { getAllProdutos, insertProduto, updateProduto, deleteProduto } from '../../../database/queries/produtoQuery.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

const newPath = "pages/admin/produtos/index";

export const page = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const [produtos] = await db.query<RowDataPacket[]>(getAllProdutos);
        res.render(newPath, { page: "produtos", title: "Produtos", token, produtos });
    } catch (err) {
        console.error('❌ Produtos:', err);
        res.status(500).send('Erro ao carregar produtos.');
    }
};

export const create = async (req: Request, res: Response) => {
    try {
        const { nome, descricao, preco, quantidade } = req.body;
        const token = req.params.token;

        const precoNorm = typeof preco === 'string' ? preco.replace(',', '.') : preco;

        if (!nome || !preco || quantidade === undefined || Number(precoNorm) <= 0 || Number(quantidade) < 1) {
            return res.status(400).send('Preço e quantidade devem ser maiores que zero.');
        }

        await db.query<ResultSetHeader>(insertProduto, [nome, descricao || '', precoNorm, Number(quantidade)]);

        return res.redirect(`/admin/produtos/${token}`);
    } catch (err) {
        console.error('❌ Criar produto:', err);
        return res.status(500).send('Erro ao criar produto.');
    }
};

export const update = async (req: Request, res: Response) => {
    try {
        const { nome, descricao, preco, quantidade, ativo } = req.body;
        const { id, token } = req.params;

        const precoNorm = typeof preco === 'string' ? preco.replace(',', '.') : preco;
        const ativoVal  = ativo === '1' || ativo === 'on' || ativo === true ? 1 : 0;

        if (!nome || Number(precoNorm) <= 0 || Number(quantidade) < 1) {
            return res.status(400).send('Preço e quantidade devem ser maiores que zero.');
        }

        await db.query<ResultSetHeader>(updateProduto, [nome, descricao || '', precoNorm, Number(quantidade), ativoVal, Number(id)]);

        return res.redirect(`/admin/produtos/${token}`);
    } catch (err) {
        console.error('❌ Atualizar produto:', err);
        return res.status(500).send('Erro ao atualizar produto.');
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        const { id, token } = req.params;
        await db.query<ResultSetHeader>(deleteProduto, [Number(id)]);
        return res.redirect(`/admin/produtos/${token}`);
    } catch (err) {
        console.error('❌ Remover produto:', err);
        return res.status(500).send('Erro ao remover produto.');
    }
};
