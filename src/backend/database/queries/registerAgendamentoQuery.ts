// registerAgendamentoQuery.ts

export const insertAgendamento = `
    INSERT INTO agendamento (usuario_id, funcionario_id, servico_id, data, hora, status, especificacoes)
    VALUES (?, ?, ?, ?, ?, 'agendado', ?);
  `;