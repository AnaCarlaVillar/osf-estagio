// servicoQuery.ts

export const getAll = `
    SELECT 
      s.id,
      s.nome,
      s.descricao,
      CAST(TIME_TO_SEC(s.duracao) / 60 AS UNSIGNED) AS duracao,
      REPLACE(FORMAT(s.preco, 2), '.', ',') AS preco,
      c.categoria AS categoria
    FROM servico s
    JOIN categoria c ON c.id = s.categoria_id;
  `;

export const getById = `
    SELECT 
      s.id,
      s.nome,
      s.descricao,
      CAST(TIME_TO_SEC(s.duracao) / 60 AS UNSIGNED) AS duracao,
      REPLACE(FORMAT(s.preco, 2), '.', ',') AS preco,
      c.categoria AS categoria
    FROM servico s
    JOIN categoria c ON c.id = s.categoria_id
    WHERE s.id = ?;
  `;