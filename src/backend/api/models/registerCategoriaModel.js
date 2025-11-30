const db = require('../../core/config/dbConnection');
const query = require('../../database/queries/registerCategoriaQuery.js');

async function registerNewCategory(categoria, descricao) {
  await db.query(query.insertCategoria, [categoria, descricao]);
}

module.exports = { registerNewCategory };