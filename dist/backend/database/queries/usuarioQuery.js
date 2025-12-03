export const getAll = `
    SELECT 
      u.id AS usuario_id,
      u.email,
      u.ativo,
      u.historicoAtendimentos,
      p.id AS pessoa_id,
      p.nome,
      p.foto
    FROM usuario u
    JOIN pessoa p ON u.pessoa_id = p.id;
  `;
//# sourceMappingURL=usuarioQuery.js.map