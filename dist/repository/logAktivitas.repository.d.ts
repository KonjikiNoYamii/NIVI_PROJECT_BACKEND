import { PrismaClient, LogAktivitas } from "../../dist/generated";
export declare class LogAktivitasRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    create(data: {
        userId: number;
        aktivitas: string;
    }): Promise<LogAktivitas>;
    findAll(): Promise<LogAktivitas[]>;
    findByUserId(userId: number): Promise<LogAktivitas[]>;
    delete(id: number): Promise<LogAktivitas>;
}
//# sourceMappingURL=logAktivitas.repository.d.ts.map