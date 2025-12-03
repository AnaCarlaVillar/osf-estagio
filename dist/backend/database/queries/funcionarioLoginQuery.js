// funcionarioLoginQuery.ts
export const getCargo = `
    SELECT cargo
    FROM funcionario
    WHERE usuario_id = ?
    LIMIT 1;
  `;
//# sourceMappingURL=funcionarioLoginQuery.js.map