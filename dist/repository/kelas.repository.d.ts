import { PrismaClient, Kelas } from "../../dist/generated";
export declare class KelasRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    getAllKelas(): import("../../dist/generated").Prisma.PrismaPromise<({
        santri: {
            id: number;
        }[];
        tugas: ({
            mataPelajaran: {
                id: number;
                createdAt: Date;
                nama: string;
                kode: string;
            };
        } & {
            id: number;
            kelasId: number;
            createdAt: Date;
            deletedAt: Date | null;
            mataPelajaranId: number;
            title: string;
            description: string | null;
            deadline: Date;
            createdBy: number;
        })[];
    } & {
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    })[]>;
    getAll: () => Promise<Kelas[]>;
    getAllSantri: () => Promise<Kelas[]>;
    getAllSantriByAdmin: () => Promise<Kelas[]>;
    getById: (id: number) => Promise<Kelas | null>;
    create: (data: {
        namaKelas: string;
        deskripsi?: string;
    }) => Promise<Kelas>;
    update: (id: number, data: Partial<Kelas>) => Promise<Kelas>;
    delete: (id: number) => Promise<Kelas>;
    assignPengajar(kelasId: number, pengajarIds: number | number[]): import("../../dist/generated").Prisma.Prisma__KelasClient<{
        pengajar: {
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
        }[];
    } & {
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    setPengajar: (kelasId: number, pengajarIds: number[]) => Promise<{
        pengajar: {
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
        }[];
        santri: {
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
        }[];
    } & {
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }>;
    addPengajar: (kelasId: number, pengajarId: number) => Promise<{
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }>;
    getKelasByPengajar: (pengajarId: number) => import("../../dist/generated").Prisma.PrismaPromise<{
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }[]>;
    findByPengajar(pengajarId: number): Promise<({
        absensi: {
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
        }[];
        izin: {
            id: number;
            userId: number;
            kelasId: number;
            tanggal: Date;
            status: import("../../dist/generated").$Enums.StatusIzin;
            createdAt: Date;
            deletedAt: Date | null;
            alasan: string;
        }[];
        pengajar: {
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
        }[];
        santri: ({
            profile: {
                fotoUrl: string | null;
            } | null;
        } & {
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
        })[];
        tugas: {
            id: number;
            kelasId: number;
            createdAt: Date;
            deletedAt: Date | null;
            mataPelajaranId: number;
            title: string;
            description: string | null;
            deadline: Date;
            createdBy: number;
        }[];
        absensiSetting: {
            id: number;
            kelasId: number;
            createdAt: Date;
            maxAbsen: number;
            updatedAt: Date;
        } | null;
        jadwal: {
            id: number;
            kelasId: number;
            tanggal: Date;
            createdAt: Date;
            hari: import("../../dist/generated").$Enums.Hari;
            jamMulai: string;
            jamSelesai: string;
        }[];
    } & {
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    })[]>;
}
//# sourceMappingURL=kelas.repository.d.ts.map