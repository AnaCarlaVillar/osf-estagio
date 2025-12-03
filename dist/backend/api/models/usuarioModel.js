import db from '../../core/config/dbConnection.js';
import { findById as qFindById } from '../../database/queries/findByIdQuery.js';
import { getAll } from '../../database/queries/usuarioQuery.js';
export async function findById(id) {
    const [rows] = await db.query(qFindById, [id]);
    return rows[0] || null;
}
export async function getAllUsers() {
    const [rows] = await db.query(getAll);
    return rows;
}
//# sourceMappingURL=usuarioModel.js.map