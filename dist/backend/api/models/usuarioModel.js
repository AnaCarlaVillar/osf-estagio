import db from '../../core/config/dbConnection.js';
import { findById as qFindById } from '../../database/queries/findByIdQuery.js';
export async function findById(id) {
    const [rows] = await db.query(qFindById, [id]);
    return rows[0] || null;
}
//# sourceMappingURL=usuarioModel.js.map