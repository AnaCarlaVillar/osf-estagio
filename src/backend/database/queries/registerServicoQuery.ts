// registerServicoQuery.ts

export const insertServico = `
    INSERT INTO servico (categoria_id, nome, descricao, duracao, preco)
    VALUES (?, ?, ?, SEC_TO_TIME(? * 60), ?);
  `;