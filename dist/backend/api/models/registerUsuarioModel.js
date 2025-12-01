import db from '../../core/config/dbConnection.js';
import { findByEmail as qEmail } from '../../database/queries/findByEmailQuery.js';
import { insertPessoa, insertUsuario } from '../../database/queries/registerUsuarioQuery.js';
export async function findByEmail(email) {
    const [rows] = await db.query(qEmail, [email]);
    return rows[0];
}
export async function registerNewUser(nome, email, senhaHash) {
    const [pessoa] = await db.query(insertPessoa, [nome]);
    const pessoaId = pessoa.insertId; // safely typed
    await db.query(insertUsuario, [pessoaId, email, senhaHash]);
}
//# sourceMappingURL=registerUsuarioModel.js.map