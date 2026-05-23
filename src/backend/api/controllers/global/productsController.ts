// productsController.ts

import { Request, Response } from 'express';
import db from '../../../core/config/dbConnection.js';
import { getProdutosAtivos } from '../../../database/queries/produtoQuery.js';
import { RowDataPacket } from 'mysql2';

const newPath = "pages/shop/products/index";

export const page = async (req: Request, res: Response) => {
    try {
        const token = req.params.token;
        const [produtos] = await db.query<RowDataPacket[]>(getProdutosAtivos);
        res.render(newPath, { page: "products", title: "Produtos", token, produtos });
    } catch (err) {
        console.error('❌ Products:', err);
        res.status(500).send('Erro ao carregar produtos.');
    }
};
