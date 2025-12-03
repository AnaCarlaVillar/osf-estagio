INSERT INTO pessoa (nome, foto) 
VALUES ('João Silva', NULL);

INSERT INTO usuario (pessoa_id, email, senha, ativo, historicoAtendimentos)
VALUES (
    LAST_INSERT_ID(),       
    'usuario@gmail.com',  
    'senha123',               
    1,                       
    NULL                      
);