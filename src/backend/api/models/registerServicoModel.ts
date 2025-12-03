// registerServicoModel.ts

import db from '../../core/config/dbConnection.js';
import { insertServico as query } from '../../database/queries/registerServicoQuery.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

interface CategoriaRow extends RowDataPacket {
  id: number;
}

export async function registerNewService(
  categoriaNome: string,
  nome: string,
  descricao: string,
  duracao: string,
  preco: string
): Promise<void> {
  const [categoriaRows] = await db.query<CategoriaRow[]>(
    'SELECT id FROM categoria WHERE categoria = ? LIMIT 1',
    [categoriaNome]
  );

  if (categoriaRows.length === 0) throw new Error(`Categoria '${categoriaNome}' not found`);

  const categoriaId = categoriaRows[0]!.id;

  await db.query<ResultSetHeader>(query, [categoriaId, nome, descricao, duracao, preco]);
}