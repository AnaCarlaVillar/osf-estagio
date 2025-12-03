// categoriaModel.ts
import db from "../../core/config/dbConnection.js";
import { getAll as getAllQuery, getById as getByIdQuery } from "../../database/queries/categoriaQuery.js";
export async function getAll() {
    const [rows] = await db.query(getAllQuery);
    return rows;
}
export async function getById(id) {
    const [rows] = await db.query(getByIdQuery, [id]);
    return rows[0] ?? null;
}
//# sourceMappingURL=categoriaModel.js.map