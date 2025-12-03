// registerUsuarioQuery.ts
export const insertPessoa = `
    INSERT INTO pessoa (nome)
    VALUES (?);
  `;
export const insertUsuario = `
    INSERT INTO usuario (pessoa_id, email, senha)
    VALUES (?, ?, ?);
  `;
//# sourceMappingURL=registerUsuarioQuery.js.map