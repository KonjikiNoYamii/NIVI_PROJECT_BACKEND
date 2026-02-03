import { AdminRepository } from "../repository/admin.repository";
export declare class AdminService {
    private repo;
    constructor(repo: AdminRepository);
    createFirstAdmin: (data: {
        name: string;
        email: string;
        password: string;
    }) => Promise<{
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
    createSantriByAdmin: (data: {
        name: string;
        email: string;
        kelasId: number;
    }) => Promise<{
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
    createPengajarByAdmin: (data: {
        name: string;
        email: string;
    }) => Promise<{
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
    activateWithPassword: (email: string, password: string) => Promise<{
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
    assign(kelasId: number, pengajarId: number): Promise<{
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }>;
    remove(kelasId: number, pengajarId: number): Promise<{
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }>;
    listPengajar(kelasId: number): Promise<{
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
    } | null>;
    listAdmins: () => Promise<{
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
    }[]>;
    getAdmin: (id: number) => Promise<{
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
    } | null>;
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
    createAdmin: (data: {
        name: string;
        email: string;
        password: string;
    }) => Promise<{
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
//# sourceMappingURL=admin.service.d.ts.map