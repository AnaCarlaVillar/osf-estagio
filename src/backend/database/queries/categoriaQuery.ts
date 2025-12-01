export const getAll = `
    SELECT 
      id,
      categoria,
      descricao,
      ativo
    FROM categoria
    WHERE ativo = 1
    ORDER BY categoria ASC;
  `;

export const getById = `
    SELECT 
      id,
      categoria,
      descricao,
      ativo
    FROM categoria
    WHERE id = ?;
  `;
