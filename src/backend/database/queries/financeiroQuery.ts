// financeiroQuery.ts

const filtroWhere = (filtro?: string): string => {
  if (filtro === 'dia')    return `AND DATE(a.data) = CURDATE()`;
  if (filtro === 'semana') return `AND a.data >= CURDATE() - INTERVAL 6 DAY`;
  if (filtro === 'mes')    return `AND YEAR(a.data) = YEAR(CURDATE()) AND MONTH(a.data) = MONTH(CURDATE())`;
  return '';
};

export const getResumoFinanceiro = (filtro?: string) => `
    SELECT
      COUNT(a.id) AS total_agendamentos,
      COALESCE(SUM(s.preco + COALESCE(p.preco, 0)), 0) AS receita_total,
      COALESCE(SUM(CASE WHEN a.status = 'pago' THEN s.preco + COALESCE(p.preco, 0) ELSE 0 END), 0) AS receita_paga,
      COALESCE(SUM(CASE WHEN a.status != 'pago' THEN s.preco + COALESCE(p.preco, 0) ELSE 0 END), 0) AS receita_pendente
    FROM agendamento a
    JOIN servico s ON s.id = a.servico_id
    LEFT JOIN produto p ON p.id = a.produto_id
    WHERE 1=1 ${filtroWhere(filtro)};
`;

export const confirmarPagamentoQuery = `
    UPDATE agendamento SET status = 'pago' WHERE id = ?;
`;

export const limparPagosQuery = `
    DELETE FROM agendamento WHERE status = 'pago';
`;

export const atualizarProdutoAgendamentoQuery = `
    UPDATE agendamento SET produto_id = ? WHERE id = ?;
`;

export const getProdutoIdAtualQuery = `
    SELECT produto_id FROM agendamento WHERE id = ?;
`;

export const decrementarEstoqueQuery = `
    UPDATE produto SET quantidade = quantidade - 1 WHERE id = ? AND quantidade > 0;
`;

export const incrementarEstoqueQuery = `
    UPDATE produto SET quantidade = quantidade + 1 WHERE id = ?;
`;

export const getResumoPorDia = `
    SELECT
      DATE(a.data) AS dia,
      COUNT(a.id) AS total_cortes,
      REPLACE(FORMAT(SUM(s.preco + COALESCE(p.preco, 0)), 2), '.', ',') AS total_valor
    FROM agendamento a
    JOIN servico s ON s.id = a.servico_id
    LEFT JOIN produto p ON p.id = a.produto_id
    WHERE a.status = 'pago'
    GROUP BY DATE(a.data)
    ORDER BY DATE(a.data) DESC;
`;

export const getAgendamentosFinanceiro = (filtro?: string) => `
    SELECT
      a.id,
      a.data,
      a.hora,
      a.status,
      a.produto_id,
      pc.nome AS cliente_nome,
      s.nome  AS servico_nome,
      REPLACE(FORMAT(s.preco, 2), '.', ',') AS preco,
      p.nome  AS produto_nome,
      REPLACE(FORMAT(p.preco, 2), '.', ',') AS produto_preco,
      REPLACE(FORMAT(s.preco + COALESCE(p.preco, 0), 2), '.', ',') AS total_valor
    FROM agendamento a
    JOIN servico    s   ON s.id  = a.servico_id
    JOIN usuario    uc  ON uc.id = a.usuario_id
    JOIN pessoa     pc  ON pc.id = uc.pessoa_id
    LEFT JOIN produto p ON p.id  = a.produto_id
    WHERE 1=1 ${filtroWhere(filtro)}
    ORDER BY a.data DESC, a.hora DESC;
`;
