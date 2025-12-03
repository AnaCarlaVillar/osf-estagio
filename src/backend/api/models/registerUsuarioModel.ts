// registerUsuarioModel.ts

import db from '../../core/config/dbConnection.js';
import { findByEmail as qEmail } from '../../database/queries/findByEmailQuery.js';
import { insertPessoa, insertUsuario } from '../../database/queries/registerUsuarioQuery.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface PessoaRow extends RowDataPacket {
  insertId: number;
}

export async function findByEmail(email: string) {
  const [rows] = await db.query<RowDataPacket[]>(qEmail, [email]);
  return rows[0];
}

export async function registerNewUser(nome: string, email: string, senhaHash: string) {
  const [pessoa] = await db.query<ResultSetHeader>(insertPessoa, [nome]);
  const pessoaId = pessoa.insertId; // safely typed
  await db.query<ResultSetHeader>(insertUsuario, [pessoaId, email, senhaHash]);
}