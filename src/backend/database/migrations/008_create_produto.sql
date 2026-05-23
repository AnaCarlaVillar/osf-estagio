CREATE TABLE produto (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(100)  NOT NULL,
  descricao   TEXT,
  preco       DECIMAL(10,2) NOT NULL,
  quantidade  INT           NOT NULL DEFAULT 0,
  ativo       TINYINT(1)    NOT NULL DEFAULT 1,
  criado_em   TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);
