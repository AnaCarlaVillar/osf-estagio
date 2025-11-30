const db = require('../../core/config/dbConnection');
const queries = require("../../database/queries/servicoQuery.js");

module.exports = {
  getAll: async () => {
    const [rows] = await db.query(queries.getAll);
    return rows;
  },

  getById: async (id: number) => {
    const [rows] = await db.query(queries.getById, [id]);
    return rows[0];
  }
};