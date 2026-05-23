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

export const updateServico = `
    UPDATE servico
    SET categoria_id = (SELECT id FROM categoria WHERE categoria = ? LIMIT 1),
        nome = ?,
        descricao = ?,
        duracao = SEC_TO_TIME(? * 60),
        preco = ?
    WHERE id = ?;
  `;

export const deleteServico = `DELETE FROM servico WHERE id = ?;`;