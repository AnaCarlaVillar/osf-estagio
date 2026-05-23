export const findAgendamentosByDateAndService = `
    SELECT a.*, f.nome as funcionario_nome, s.nome as servico_nome
    FROM agendamento a
    JOIN funcionario f ON a.funcionario_id = f.id
    JOIN servico s ON a.servico_id = s.id
    WHERE a.data = ? AND a.servico_id = ? AND a.status = 'agendado';
  `;

export const findAllAgendamentos = `
    SELECT
      a.id,
      a.funcionario_id,
      a.servico_id,
      a.data,
      a.hora,
      a.status,
      a.especificacoes,
      pf.nome  AS funcionario_nome,
      pc.nome  AS cliente_nome,
      s.nome   AS servico_nome
    FROM agendamento a
    JOIN funcionario f  ON f.id  = a.funcionario_id
    JOIN usuario    uf  ON uf.id = f.usuario_id
    JOIN pessoa     pf  ON pf.id = uf.pessoa_id
    JOIN usuario    uc  ON uc.id = a.usuario_id
    JOIN pessoa     pc  ON pc.id = uc.pessoa_id
    JOIN servico    s   ON s.id  = a.servico_id
    WHERE a.status = 'agendado'
    ORDER BY a.data ASC, a.hora ASC;
  `;

export const checkSlotAvailable = `
    SELECT COUNT(*) AS total
    FROM agendamento
    WHERE funcionario_id = ?
      AND data = ?
      AND hora = ?
      AND status = 'agendado';
  `;

export const findAgendamentosByFuncionario = `
    SELECT
      a.*,
      s.nome  AS servico_nome,
      pc.nome AS cliente_nome
    FROM agendamento a
    JOIN servico  s  ON s.id  = a.servico_id
    JOIN usuario  uc ON uc.id = a.usuario_id
    JOIN pessoa   pc ON pc.id = uc.pessoa_id
    WHERE a.funcionario_id = ? AND a.status = 'agendado'
    ORDER BY a.data ASC, a.hora ASC;
  `;

export const findBarberServices = `
    SELECT f.id as funcionario_id, p.nome as funcionario_nome, s.id as servico_id, s.nome as servico_nome
    FROM agendamento a
    JOIN funcionario f ON a.funcionario_id = f.id
    JOIN usuario u ON u.id = f.usuario_id
    JOIN pessoa p ON p.id = u.pessoa_id
    JOIN servico s ON a.servico_id = s.id
    WHERE a.status = 'agendado'
    GROUP BY f.id, s.id
    ORDER BY p.nome, s.nome;
  `;