// funcionarioLoginModel.ts

import db from '../../core/config/dbConnection.js';
import { getCargo as query } from '../../database/queries/funcionarioLoginQuery.js';
import { RowDataPacket } from 'mysql2';

interface CargoRow extends RowDataPacket {
  cargo: string | null; // adjust according to your query result
}

export async function getCargo(usuarioId: number) {
  const [rows] = await db.query<CargoRow[]>(query, [usuarioId]);
  return rows[0];
}