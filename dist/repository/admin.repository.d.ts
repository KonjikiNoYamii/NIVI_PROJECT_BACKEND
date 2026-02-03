import { PrismaClient, User } from "../../dist/generated";
export declare class AdminRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    createSantriByAdmin: (data: {
        name: string;
        email: string;
        kelasId: number;
    }) => Promise<User>;
    createPengajarByAdmin: (data: {
        name: string;
        email: string;
    }) => Promise<User>;
    findByEmail: (email: string) => Promise<User | null>;
    updatePassword: (id: number, hashedPassword: string) => Promise<{
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
    }>;
    assignPengajar(kelasId: number, pengajarId: number): import("../../dist/generated").Prisma.Prisma__KelasClient<{
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    removePengajar(kelasId: number, pengajarId: number): import("../../dist/generated").Prisma.Prisma__KelasClient<{
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    getPengajarByKelas(kelasId: number): import("../../dist/generated").Prisma.Prisma__KelasClient<{
        id: number;
        pengajar: {
            name: string | null;
            id: number;
            email: string;
            profile: {
                namaLengkap: string;
                fotoUrl: string | null;
            } | null;
        }[];
        namaKelas: string;
    } | null, null, import("../../dist/generated/runtime/client").DefaultArgs, import("../../dist/generated").Prisma.PrismaClientOptions>;
    createAdmin: (data: {
        name: string;
        email: string;
        password: string;
    }) => Promise<User>;
    getAllAdmins: () => Promise<User[]>;
    getAdminById: (id: number) => Promise<User | null>;
    updateAdmin: (id: number, data: Partial<{
        name: string;
        email: string;
        password: string;
    }>) => Promise<{
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
    }>;
    deleteAdmin: (id: number) => Promise<{
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
    }>;
}
//# sourceMappingURL=admin.repository.d.ts.map