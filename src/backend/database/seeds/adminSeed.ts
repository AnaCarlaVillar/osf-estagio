import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { ResultSetHeader } from 'mysql2';

dotenv.config();

export async function adminSeed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST as string,
    user: process.env.DB_USER as string,
    password: process.env.DB_PASS as string,
    database: process.env.DB_NAME as string
  });

  const [pessoa] = await connection.query<ResultSetHeader>(`
    INSERT INTO pessoa (nome, foto)
    VALUES ('Admin Sistema', NULL)
  `);

  const hash = await bcrypt.hash("senha123", 10);

  const [usuario] = await connection.query<ResultSetHeader>(
    `INSERT INTO usuario (pessoa_id, email, senha, ativo, historicoAtendimentos)
     VALUES (?, 'admin@gmail.com', ?, 1, NULL)`,
    [pessoa.insertId, hash]
  );

  await connection.query<ResultSetHeader>(
    `INSERT INTO funcionario (usuario_id, agenda, cargo)
     VALUES (?, '{}', 'admin')`,
    [usuario.insertId]
  );

  await connection.end();
}