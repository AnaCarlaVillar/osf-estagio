import db from "../../core/config/dbConnection.js";
import { insertCategoria as query } from "../../database/queries/registerCategoriaQuery.js";
export async function registerNewCategory(categoria, descricao) {
    await db.query(query, [categoria, descricao]);
}
//# sourceMappingURL=registerCategoriaModel.js.map