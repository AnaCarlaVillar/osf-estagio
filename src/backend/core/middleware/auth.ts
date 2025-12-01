import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as model from "../../api/models/usuarioModel.js";

const SECRET = process.env.URL_TOKEN_SECRET;
if (!SECRET) {
  throw new Error("URL_TOKEN_SECRET não definido no .env");
}

declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export default async function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.params.token; 
    if (!token) return res.status(401).send("Token não fornecido");

    const decoded = jwt.verify(token, SECRET!) as unknown as { id: number };

    const user = await model.findById(decoded.id);
    if (!user) return res.status(401).send("Token inválido");

    req.user = user;

    next();
  } catch (err) {
    console.error("❌ Auth Middleware:", err);
    return res.status(401).send("Token inválido ou expirado");
  }
}