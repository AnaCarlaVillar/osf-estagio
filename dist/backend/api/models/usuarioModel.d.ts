import { RowDataPacket } from 'mysql2';
export interface UsuarioRow extends RowDataPacket {
    id: number;
    pessoa_id: number;
    email: string;
    senha: string;
    ativo: number;
    historicoAtendimentos?: string;
}
export declare function findById(id: number): Promise<UsuarioRow | null>;
//# sourceMappingURL=usuarioModel.d.ts.map