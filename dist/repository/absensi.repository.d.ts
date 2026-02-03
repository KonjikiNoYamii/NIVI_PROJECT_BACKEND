import { PrismaClient, Absensi, StatusAbsensi, User } from "../../dist/generated";
export declare class AbsensiRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    getAll(): Promise<Absensi[]>;
    getById(id: number): Promise<Absensi | null>;
    getByUserId(userId: number): Promise<Absensi[]>;
    getTodayByUser(userId: number): Promise<Absensi[]>;
    countTodayByUser(userId: number): Promise<number>;
    create(data: {
        userId: number;
        kelasId: number;
        jadwalId?: number;
        status: StatusAbsensi;
        tanggal: Date;
    }): Promise<Absensi>;
    update(id: number, data: Partial<Absensi>): Promise<Absensi>;
    delete(id: number): Promise<Absensi>;
    findByUserAndTanggal(userId: number, tanggal: Date): import("../../dist/generated").Prisma.Prisma__AbsensiClient<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    } | null, null, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    createIzinAbsensi(userId: number, kelasId: number, tanggal: Date): import("../../dist/generated").Prisma.Prisma__AbsensiClient<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    countTodayByKelas(kelasId: number, tanggal: Date): import("../../dist/generated").Prisma.PrismaPromise<number>;
    countByKelasAndTanggal(kelasId: number, tanggal: Date): Promise<number>;
    findByKelasPaginated: ({ kelasId, skip, take, sort, }: {
        kelasId: number;
        skip: number;
        take: number;
        sort: "asc" | "desc";
    }) => Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }[]>;
    countByKelas: (kelasId: number) => Promise<number>;
    countUserAbsensiByTanggal(userId: number, tanggal: Date): Promise<number>;
    countNonIzinAbsensiByTanggal(userId: number, tanggal: Date): Promise<number>;
    getUsersByKelas(kelasId: number): Promise<User[]>;
    getByIdWithUser(id: number): import("../../dist/generated").Prisma.Prisma__AbsensiClient<({
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
    } & {
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }) | null, null, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    countMonthly(userId: number, month: number, year: number): import("../../dist/generated").Prisma.PrismaPromise<number>;
    findLastByUser(userId: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    } | null>;
    updateAI(id: number, data: {
        aiComment: string;
        aiTone: string;
        aiConfidence: number;
    }): import("../../dist/generated").Prisma.Prisma__AbsensiClient<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    countSpamToday(userId: number): Promise<number>;
    getAbsensiByUserAndMonth(userId: number, start: Date, end: Date): import("../../dist/generated").Prisma.PrismaPromise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }[]>;
    getAbsensiByUserAndWeek(userId: number, start: Date, end: Date): import("../../dist/generated").Prisma.PrismaPromise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }[]>;
    countHadirMonthly(userId: number, month: number, year: number): import("../../dist/generated").Prisma.PrismaPromise<number>;
    getAbsensiByUserAndDates(userId: number, dates: Date[]): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }[]>;
    getByUserAndDates(userId: number, dates: Date[]): Promise<Absensi[]>;
    countAbsenHariIni(userId: number, kelasId: number, tanggal: Date): Promise<number>;
    findByUserAndJadwal(userId: number, jadwalId: number): Promise<Absensi | null>;
}
//# sourceMappingURL=absensi.repository.d.ts.map