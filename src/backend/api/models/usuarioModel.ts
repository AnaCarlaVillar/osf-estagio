// usuarioModel.ts

import db from '../../core/config/dbConnection.js';
import { findById as qFindById } from '../../database/queries/findByIdQuery.js';
import { getAll } from '../../database/queries/usuarioQuery.js';
import { RowDataPacket } from 'mysql2';

export interface UsuarioRow extends RowDataPacket {
  id: number;
  pessoa_id: number;
  email: string;
  senha: string;
  ativo: number;
  historicoAtendimentos?: string;
  nome?: string;
}

export async function findById(id: number): Promise<UsuarioRow | null> {
  const [rows] = await db.query<UsuarioRow[]>(qFindById, [id]);
  return rows[0] || null;
}


export async function getAllUsers(): Promise<UsuarioRow[]> {
  const [rows] = await db.query<UsuarioRow[]>(getAll);
  return rows;
}