import { PrismaClient } from "../../dist/generated";
export declare class TugasRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    getAll: () => Promise<({
        kelas: {
            id: number;
            namaKelas: string;
            deskripsi: string | null;
        };
        mataPelajaran: {
            id: number;
            createdAt: Date;
            nama: string;
            kode: string;
        };
        creator: {
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
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    })[]>;
    getById: (id: number) => Promise<({
        kelas: {
            id: number;
            namaKelas: string;
            deskripsi: string | null;
        };
        submission: {
            id: number;
            userId: number;
            status: import("../../dist/generated").$Enums.StatusSubmission;
            deletedAt: Date | null;
            tugasId: number;
            fileUrl: string | null;
            linkUrl: string | null;
            submittedAt: Date;
        }[];
        mataPelajaran: {
            id: number;
            createdAt: Date;
            nama: string;
            kode: string;
        };
        creator: {
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
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    }) | null>;
    create(data: {
        title: string;
        description?: string;
        deadline: Date;
        kelasId: number;
        mataPelajaranId: number;
        createdBy: number;
    }): import("../../dist/generated").Prisma.Prisma__TugasClient<{
        id: number;
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    update: (id: number, data: {
        title?: string;
        description?: string;
        deadline?: Date;
        mataPelajaranId?: number;
    }) => Promise<{
        id: number;
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    }>;
    delete: (id: number) => Promise<{
        id: number;
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    }>;
    getForSantri(userId: number): Promise<({
        kelas: {
            id: number;
            namaKelas: string;
            deskripsi: string | null;
        };
        submission: {
            id: number;
            userId: number;
            status: import("../../dist/generated").$Enums.StatusSubmission;
            deletedAt: Date | null;
            tugasId: number;
            fileUrl: string | null;
            linkUrl: string | null;
            submittedAt: Date;
        }[];
        mataPelajaran: {
            id: number;
            createdAt: Date;
            nama: string;
            kode: string;
        };
        creator: {
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
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    })[]>;
    archiveExpiredForSantri(userId: number, tugasId: number): Promise<{
        id: number;
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    }>;
    getArchivedForSantri(userId: number): Promise<({
        submission: {
            id: number;
            userId: number;
            status: import("../../dist/generated").$Enums.StatusSubmission;
            deletedAt: Date | null;
            tugasId: number;
            fileUrl: string | null;
            linkUrl: string | null;
            submittedAt: Date;
        }[];
        mataPelajaran: {
            id: number;
            createdAt: Date;
            nama: string;
            kode: string;
        };
        creator: {
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
        kelasId: number;
        createdAt: Date;
        deletedAt: Date | null;
        mataPelajaranId: number;
        title: string;
        description: string | null;
        deadline: Date;
        createdBy: number;
    })[]>;
}
//# sourceMappingURL=tugas.repository.d.ts.map