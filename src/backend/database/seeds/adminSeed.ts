const bcrypt = require('bcryptjs');
const mysql = require('mysql2/promise');
require('dotenv').config();

async function adminSeed() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });

  const [pessoa] = await connection.query(`
    INSERT INTO pessoa (nome, foto)
    VALUES ('Admin Sistema', NULL)
  `);

  const hash = await bcrypt.hash("senha123", 10);

  const [usuario] = await connection.query(
    `INSERT INTO usuario (pessoa_id, email, senha, ativo, historicoAtendimentos)
     VALUES (?, 'admin@gmail.com', ?, 1, NULL)`,
    [pessoa.insertId, hash]
  );

  await connection.query(
    `INSERT INTO funcionario (usuario_id, agenda, cargo)
     VALUES (?, '{}', 'admin')`,
    [usuario.insertId]
  );

  await connection.end();
}

module.exports = { adminSeed };