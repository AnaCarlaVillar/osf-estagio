import db from '../../core/config/dbConnection.js';
import { findById as qFindById } from '../../database/queries/findByIdQuery.js';
import { RowDataPacket } from 'mysql2';

export interface UsuarioRow extends RowDataPacket {
  id: number;
  pessoa_id: number;
  email: string;
  senha: string;
  ativo: number;
  historicoAtendimentos?: string;
}

export async function findById(id: number): Promise<UsuarioRow | null> {
  const [rows] = await db.query<UsuarioRow[]>(qFindById, [id]);
  return rows[0] || null;
}
