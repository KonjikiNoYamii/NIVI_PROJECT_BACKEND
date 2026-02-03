import { PrismaClient, User } from "../../dist/generated";
export declare class AuthRepository {
    private prisma;
    constructor(prisma: PrismaClient);
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
    setOtp: (email: string, otp: string, otpExpiresAt: Date) => Promise<{
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
//# sourceMappingURL=auth.repository.d.ts.map