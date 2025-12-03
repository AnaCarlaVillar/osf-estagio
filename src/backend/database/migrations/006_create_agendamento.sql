CREATE TABLE agendamento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  funcionario_id INT NOT NULL,
  servico_id INT NOT NULL,
  data DATE NOT NULL,
  hora TIME NOT NULL,
  status VARCHAR(50) DEFAULT 'pendente',
  especificacoes TEXT,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id),
  FOREIGN KEY (funcionario_id) REFERENCES funcionario(id),
  FOREIGN KEY (servico_id) REFERENCES servico(id)
);