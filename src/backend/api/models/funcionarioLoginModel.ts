const db = require('../../core/config/dbConnection');
const { getCargo: qCargo } = require('../../database/queries/funcionarioLoginQuery.js');

async function getCargo(usuarioId: number) {
  const [rows] = await db.query(qCargo, [usuarioId]);
  return rows[0];
}

module.exports = { getCargo };