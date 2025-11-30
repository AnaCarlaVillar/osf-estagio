const db = require('../../core/config/dbConnection');
const { findByEmail: qEmail } = require('../../database/queries/findByEmailQuery.js');
const query = require('../../database/queries/registerUsuarioQuery.js');

async function findByEmail(email: string) {
  const [rows] = await db.query(qEmail, [email]);
  return rows[0];
}

async function registerNewUser(nome: string, email: string, senhaHash: string) {
  const [pessoa] = await db.query(query.insertPessoa, [nome]);
  await db.query(query.insertUsuario, [pessoa.insertId, email, senhaHash]);
}

module.exports = { findByEmail, registerNewUser };