import { RowDataPacket } from "mysql2";
interface Categoria extends RowDataPacket {
    id: number;
    categoria: string;
    descricao: string;
    ativo: number;
}
export declare function getAll(): Promise<Categoria[]>;
export declare function getById(id: number): Promise<Categoria | null>;
export {};
//# sourceMappingURL=categoriaModel.d.ts.map