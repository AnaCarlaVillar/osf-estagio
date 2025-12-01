import db from '../../core/config/dbConnection.js';
import { insertServico as query } from '../../database/queries/registerServicoQuery.js';
export async function registerNewService(categoriaNome, nome, descricao, duracao, preco) {
    const [categoriaRows] = await db.query('SELECT id FROM categoria WHERE categoria = ? LIMIT 1', [categoriaNome]);
    if (categoriaRows.length === 0)
        throw new Error(`Categoria '${categoriaNome}' not found`);
    const categoriaId = categoriaRows[0].id;
    await db.query(query, [categoriaId, nome, descricao, duracao, preco]);
}
//# sourceMappingURL=registerServicoModel.js.map