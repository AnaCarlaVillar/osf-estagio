// servicoModel.ts

import db from '../../core/config/dbConnection.js';
import { getAll as getAllQuery, getById as getByIdQuery, updateServico as updateServicoQuery, deleteServico as deleteServicoQuery } from '../../database/queries/servicoQuery.js';
import { RowDataPacket } from 'mysql2';

export async function getAll() {
  const [rows] = await db.query<RowDataPacket[]>(getAllQuery);
  return rows;
}

export async function getById(id: number) {
  const [rows] = await db.query<RowDataPacket[]>(getByIdQuery, [id]);
  return rows[0];
}

export async function updateService(
  id: number,
  categoria: string,
  nome: string,
  descricao: string,
  duracao: string,
  preco: string
): Promise<void> {
  await db.query(updateServicoQuery, [categoria, nome, descricao, duracao, preco, id]);
}

export async function deleteService(id: number): Promise<void> {
  await db.query(deleteServicoQuery, [id]);
}