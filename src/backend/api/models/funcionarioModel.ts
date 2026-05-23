import db from '../../core/config/dbConnection.js';
import { getAllBarbeiros as getAllBarbeirosQuery } from '../../database/queries/funcionarioQuery.js';
import { RowDataPacket } from 'mysql2';

export async function getAllBarbeiros() {
  const [rows] = await db.query<RowDataPacket[]>(getAllBarbeirosQuery);
  return rows;
}
