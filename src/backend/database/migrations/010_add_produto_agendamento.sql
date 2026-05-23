ALTER TABLE agendamento ADD COLUMN produto_id INT NULL AFTER servico_id;
ALTER TABLE agendamento ADD CONSTRAINT fk_agendamento_produto FOREIGN KEY (produto_id) REFERENCES produto(id) ON DELETE SET NULL;
