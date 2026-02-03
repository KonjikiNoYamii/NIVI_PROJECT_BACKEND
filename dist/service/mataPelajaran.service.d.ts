import { MataPelajaranRepository } from "../repository/mataPelajaran.repository";
export declare class MataPelajaranService {
    private repo;
    constructor(repo: MataPelajaranRepository);
    getAll: () => Promise<{
        id: number;
        createdAt: Date;
        nama: string;
        kode: string;
    }[]>;
    getById: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        nama: string;
        kode: string;
    } | null>;
    create: (data: {
        nama: string;
        kode: string;
    }) => Promise<{
        id: number;
        createdAt: Date;
        nama: string;
        kode: string;
    }>;
    update: (id: number, data: {
        nama?: string;
        kode?: string;
    }) => Promise<{
        id: number;
        createdAt: Date;
        nama: string;
        kode: string;
    }>;
    delete: (id: number) => Promise<{
        id: number;
        createdAt: Date;
        nama: string;
        kode: string;
    }>;
}
//# sourceMappingURL=mataPelajaran.service.d.ts.map