export declare const getAll = "\n    SELECT \n      id,\n      categoria,\n      descricao,\n      ativo\n    FROM categoria\n    WHERE ativo = 1\n    ORDER BY categoria ASC;\n  ";
export declare const getById = "\n    SELECT \n      id,\n      categoria,\n      descricao,\n      ativo\n    FROM categoria\n    WHERE id = ?;\n  ";
//# sourceMappingURL=categoriaQuery.d.ts.map