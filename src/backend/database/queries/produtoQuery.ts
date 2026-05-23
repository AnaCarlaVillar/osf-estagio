// produtoQuery.ts

export const getAllProdutos = `
    SELECT id, nome, descricao, preco, quantidade, ativo FROM produto ORDER BY nome;
`;

export const getProdutosAtivos = `
    SELECT id, nome, descricao, preco, quantidade FROM produto WHERE ativo = 1 AND quantidade > 0 ORDER BY nome;
`;

export const getProdutoById = `
    SELECT id, nome, descricao, preco, quantidade, ativo FROM produto WHERE id = ?;
`;

export const insertProduto = `
    INSERT INTO produto (nome, descricao, preco, quantidade) VALUES (?, ?, ?, ?);
`;

export const updateProduto = `
    UPDATE produto SET nome = ?, descricao = ?, preco = ?, quantidade = ?, ativo = ? WHERE id = ?;
`;

export const deleteProduto = `
    DELETE FROM produto WHERE id = ?;
`;
