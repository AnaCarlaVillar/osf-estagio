// registerCategoriaQuery.ts

export const insertCategoria = `
    INSERT INTO categoria (categoria, descricao)
    VALUES (?, ?);
  `;