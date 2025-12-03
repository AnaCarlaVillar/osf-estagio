// funcionarioLoginModel.ts
import db from '../../core/config/dbConnection.js';
import { getCargo as query } from '../../database/queries/funcionarioLoginQuery.js';
export async function getCargo(usuarioId) {
    const [rows] = await db.query(query, [usuarioId]);
    return rows[0];
}
//# sourceMappingURL=funcionarioLoginModel.js.map