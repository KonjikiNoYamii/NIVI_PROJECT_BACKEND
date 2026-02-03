import { PrismaClient, JadwalAbsensi, Hari } from "../../dist/generated";
export declare class JadwalAbsensiRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    countByKelas(kelasId: number): import("../../dist/generated").Prisma.PrismaPromise<number>;
    findActiveSchedule: (kelasId: number, now: Date, jadwalId?: number) => Promise<JadwalAbsensi | null>;
    create: (data: {
        kelasId: number;
        hari: Hari;
        jamMulai: string;
        jamSelesai: string;
        tanggal: Date;
    }) => Promise<JadwalAbsensi>;
    findBentrok(kelasId: number, tanggal: Date, jamMulai: string, jamSelesai: string): import("../../dist/generated").Prisma.Prisma__JadwalAbsensiClient<{
        id: number;
        kelasId: number;
        tanggal: Date;
        createdAt: Date;
        hari: import("../../dist/generated").$Enums.Hari;
        jamMulai: string;
        jamSelesai: string;
    } | null, null, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    createBulk: (kelasId: number, jamMulai: string, jamSelesai: string, tanggalMulai: Date, tanggalSelesai: Date) => Promise<import("../../dist/generated").Prisma.BatchPayload>;
    getAllByKelas: (kelasId: number) => Promise<JadwalAbsensi[]>;
    getAllByKelasInRange: (kelasId: number, startDate: Date, endDate: Date) => Promise<JadwalAbsensi[]>;
    getById: (id: number) => Promise<JadwalAbsensi | null>;
    update: (id: number, data: Partial<JadwalAbsensi>) => Promise<JadwalAbsensi>;
    delete: (id: number) => Promise<JadwalAbsensi>;
    findByTanggal(kelasId: number, tanggal: Date): import("../../dist/generated").Prisma.Prisma__JadwalAbsensiClient<{
        id: number;
        kelasId: number;
        tanggal: Date;
        createdAt: Date;
        hari: import("../../dist/generated").$Enums.Hari;
        jamMulai: string;
        jamSelesai: string;
    } | null, null, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    findByHari(kelasId: number, hari: Hari): import("../../dist/generated").Prisma.Prisma__JadwalAbsensiClient<{
        id: number;
        kelasId: number;
        tanggal: Date;
        createdAt: Date;
        hari: import("../../dist/generated").$Enums.Hari;
        jamMulai: string;
        jamSelesai: string;
    } | null, null, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    countByJadwalId: (jadwalId: number) => Promise<number>;
    countAbsensiByTanggalDanKelas(kelasId: number, tanggal: Date): import("../../dist/generated").Prisma.PrismaPromise<number>;
    getByKelasAndTanggal(kelasId: number, tanggal: Date, jamMulai?: string): Promise<JadwalAbsensi[]>;
    getByKelas(kelasId: number): Promise<JadwalAbsensi[]>;
    findByKelasHariJam: (kelasId: number, hari: Hari, jamMulai: string) => Promise<JadwalAbsensi | null>;
    findByKelasAndTanggal(kelasId: number, tanggal: Date, jamMulai?: string): Promise<JadwalAbsensi[]>;
}
//# sourceMappingURL=jadwalAbsensi.repository.d.ts.map