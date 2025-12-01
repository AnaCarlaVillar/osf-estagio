import { RowDataPacket } from 'mysql2';
interface CargoRow extends RowDataPacket {
    cargo: string | null;
}
export declare function getCargo(usuarioId: number): Promise<CargoRow | undefined>;
export {};
//# sourceMappingURL=funcionarioLoginModel.d.ts.map