// registerCategoriaModel.ts

import db from "../../core/config/dbConnection.js";
import { insertCategoria as query } from "../../database/queries/registerCategoriaQuery.js";
import { ResultSetHeader } from "mysql2";

export async function registerNewCategory(categoria: string, descricao: string): Promise<void> {
  await db.query<ResultSetHeader>(query, [categoria, descricao]);
}