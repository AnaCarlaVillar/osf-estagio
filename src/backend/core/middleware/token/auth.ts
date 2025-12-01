import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import db from "../../config/dbConnection.js";

const SECRET = process.env.URL_TOKEN_SECRET || "default_secret";

export default async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.params.token;

  if (!token) return res.status(401).send("Token not provided");

  try {
    const decoded = jwt.verify(token, SECRET) as { id: number };

    const user = await db.user.findOne({ where: { id: decoded.id } });

    if (!user) return res.status(401).send("Invalid token");

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).send("Invalid or expired token");
  }
}