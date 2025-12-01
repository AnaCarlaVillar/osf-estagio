import db from "../../core/config/dbConnection.js";
import { getAll as getAllQuery, getById as getByIdQuery } from "../../database/queries/categoriaQuery.js";
import { RowDataPacket } from "mysql2";

interface Categoria extends RowDataPacket {
  id: number;
  categoria: string;
  descricao: string;
  ativo: number;
}

export async function getAll(): Promise<Categoria[]> {
  const [rows] = await db.query<Categoria[]>(getAllQuery);
  return rows;
}

export async function getById(id: number): Promise<Categoria | null> {
  const [rows] = await db.query<Categoria[]>(getByIdQuery, [id]);
  return rows[0] ?? null;
}