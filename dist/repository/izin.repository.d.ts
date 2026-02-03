import { PrismaClient, Izin } from "../../dist/generated";
export declare class IzinRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    getAll: () => Promise<Izin[]>;
    getAllByPengajar: (pengajarId: number) => Promise<Izin[]>;
    getAllArchived: (pengajarId: number) => Promise<({
        user: {
            name: string | null;
            id: number;
            kelasId: number | null;
            createdAt: Date;
            email: string;
            password: string | null;
            activatedAt: Date | null;
            isActive: boolean;
            otp: string | null;
            otpExpiresAt: Date | null;
            role: import("../../dist/generated").$Enums.Role;
            deletedAt: Date | null;
        };
        kelas: {
            id: number;
            namaKelas: string;
            deskripsi: string | null;
        };
    } & {
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    })[]>;
    softDelete: (id: number) => Promise<{
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    }>;
    getById: (id: number) => Promise<Izin | null>;
    getByUserId: (userId: number) => Promise<Izin[]>;
    create: (data: {
        userId: number;
        kelasId: number;
        tanggal: Date;
        alasan: string;
        status?: "menunggu" | "disetujui" | "ditolak";
    }) => Promise<Izin>;
    update: (id: number, data: Partial<Izin>) => Promise<Izin>;
    delete: (id: number) => Promise<Izin>;
    findByUserAndDate(userId: number, kelasId: number, tanggal: Date, status?: "menunggu" | "disetujui" | "ditolak"): Promise<Izin | null>;
    countMonthly(userId: number): Promise<number>;
    getIzinByUserAndMonth(userId: number, start: Date, end: Date): Promise<Izin[]>;
}
//# sourceMappingURL=izin.repository.d.ts.map