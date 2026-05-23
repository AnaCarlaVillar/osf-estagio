export const getAllBarbeiros = `
    SELECT
      f.id,
      p.nome AS nome,
      f.cargo
    FROM funcionario f
    JOIN usuario u ON u.id = f.usuario_id
    JOIN pessoa p ON p.id = u.pessoa_id;
  `;
