import { PrismaClient, MataPelajaran } from "../../dist/generated";
export declare class MataPelajaranRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    create: (data: {
        nama: string;
        kode: string;
    }) => Promise<MataPelajaran>;
    getAll: () => Promise<MataPelajaran[]>;
    getById: (id: number) => Promise<MataPelajaran | null>;
    update: (id: number, data: Partial<MataPelajaran>) => Promise<MataPelajaran>;
    delete: (id: number) => Promise<MataPelajaran>;
}
//# sourceMappingURL=mataPelajaran.repository.d.ts.map