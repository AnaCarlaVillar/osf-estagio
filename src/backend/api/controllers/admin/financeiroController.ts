// financeiroController.ts

import { Request, Response } from 'express';
import db from '../../../core/config/dbConnection.js';
import { RowDataPacket } from 'mysql2';
import { getResumoFinanceiro, getAgendamentosFinanceiro, getResumoPorDia, confirmarPagamentoQuery, atualizarProdutoAgendamentoQuery, getProdutoIdAtualQuery, decrementarEstoqueQuery, incrementarEstoqueQuery, limparPagosQuery } from '../../../database/queries/financeiroQuery.js';
import { ResultSetHeader } from 'mysql2';
import { getAllProdutos } from '../../../database/queries/produtoQuery.js';

const newPath = "pages/admin/financeiro/index";

const filtroValido = (f: unknown): 'dia' | 'semana' | 'mes' | undefined => {
    if (f === 'dia' || f === 'semana' || f === 'mes') return f;
    return undefined;
};

const redirectComFiltro = (token: string, filtro?: string) =>
    `/financeiro/${token}${filtro ? `?filtro=${filtro}` : ''}`;

export const confirmarPagamento = async (req: Request, res: Response) => {
    try {
        const { id, token } = req.params;
        const filtro = filtroValido(req.body.filtro);
        await db.query<ResultSetHeader>(confirmarPagamentoQuery, [Number(id)]);
        return res.redirect(redirectComFiltro(token, filtro));
    } catch (err) {
        console.error('❌ Confirmar pagamento:', err);
        return res.status(500).send('Erro ao confirmar pagamento.');
    }
};

export const atualizarProduto = async (req: Request, res: Response) => {
    try {
        const { id, token } = req.params;
        const { produto_id, filtro: filtroBody } = req.body;
        const filtro = filtroValido(filtroBody);
        const novoId = produto_id ? Number(produto_id) : null;

        const [[atual]] = await db.query<RowDataPacket[]>(getProdutoIdAtualQuery, [Number(id)]);
        const antigoId: number | null = atual?.produto_id ?? null;

        if (antigoId && antigoId !== novoId) {
            await db.query<ResultSetHeader>(incrementarEstoqueQuery, [antigoId]);
        }
        if (novoId && novoId !== antigoId) {
            await db.query<ResultSetHeader>(decrementarEstoqueQuery, [novoId]);
        }

        await db.query<ResultSetHeader>(atualizarProdutoAgendamentoQuery, [novoId, Number(id)]);
        return res.redirect(redirectComFiltro(token, filtro));
    } catch (err) {
        console.error('❌ Atualizar produto agendamento:', err);
        return res.status(500).send('Erro ao atualizar produto.');
    }
};

export const page = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;

        if (req.query.action === 'limpar') {
            await db.query<ResultSetHeader>(limparPagosQuery);
            return res.redirect(`/financeiro/${token}`);
        }

        const filtro = filtroValido(req.query.filtro);
        const [[resumo]] = await db.query<RowDataPacket[]>(getResumoFinanceiro(filtro));
        const [agendamentos] = await db.query<RowDataPacket[]>(getAgendamentosFinanceiro(filtro));
        const [produtos] = await db.query<RowDataPacket[]>(getAllProdutos);
        const [resumoPorDia] = await db.query<RowDataPacket[]>(getResumoPorDia);
        res.render(newPath, { page: "financeiro", title: "Financeiro", token, resumo, agendamentos, produtos, filtro: filtro ?? '', resumoPorDia });
    } catch (err) {
        console.error('❌ Financeiro:', err);
        res.status(500).send('Erro ao carregar dados financeiros.');
    }
};
