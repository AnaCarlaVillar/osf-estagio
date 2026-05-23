// authAdmin.ts

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as model from "../../api/models/usuarioModel.js";

const SECRET = process.env.URL_TOKEN_SECRET!;

export default async function authAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.params.token || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).send("Token não fornecido");

        const decoded = jwt.verify(token, SECRET) as { id: number; cargo?: string };
        const user = await model.findById(decoded.id);
        if (!user) return res.status(401).send("Token inválido");

        if (decoded.cargo !== 'admin') {
            return res.status(403).send("Acesso restrito ao administrador.");
        }

        req.user = { id: user.id, cargo: decoded.cargo };
        next();
    } catch (err) {
        return res.status(401).send("Token inválido ou expirado");
    }
}
