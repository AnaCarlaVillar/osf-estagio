// registerAgendamentoModel.ts

import db from '../../core/config/dbConnection.js';
import { insertAgendamento } from '../../database/queries/registerAgendamentoQuery.js';
import { ResultSetHeader } from 'mysql2';

export async function registerNewBooking(
  usuarioId: number,
  funcionarioId: number,
  servicoId: number,
  data: string,
  hora: string,
  especificacoes: string = ''
): Promise<void> {
  await db.query<ResultSetHeader>(insertAgendamento, [usuarioId, funcionarioId, servicoId, data, hora, especificacoes]);
}