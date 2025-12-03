CREATE TABLE funcionario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_id INT NOT NULL,
  agenda JSON,
  cargo VARCHAR(50) DEFAULT 'funcionario',
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);