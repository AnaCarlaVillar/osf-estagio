import db from '../../core/config/dbConnection.js';
import { getAll as getAllQuery, getById as getByIdQuery } from '../../database/queries/servicoQuery.js';
import { RowDataPacket } from 'mysql2';

export async function getAll() {
  const [rows] = await db.query<RowDataPacket[]>(getAllQuery);
  return rows;
}

export async function getById(id: number) {
  const [rows] = await db.query<RowDataPacket[]>(getByIdQuery, [id]);
  return rows[0];
}