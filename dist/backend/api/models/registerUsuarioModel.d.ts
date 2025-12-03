import { RowDataPacket } from 'mysql2';
export declare function findByEmail(email: string): Promise<RowDataPacket>;
export declare function registerNewUser(nome: string, email: string, senhaHash: string): Promise<void>;
//# sourceMappingURL=registerUsuarioModel.d.ts.map