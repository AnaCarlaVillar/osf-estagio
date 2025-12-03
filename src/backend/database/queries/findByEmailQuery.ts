// findByEmailQuery.ts

export const findByEmail = `
    SELECT id, email, senha, ativo
    FROM usuario
    WHERE email = ?
    LIMIT 1;
  `;