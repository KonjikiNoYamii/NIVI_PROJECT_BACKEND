import { AuthRepository } from "../repository/auth.repository";
export declare class AuthService {
    private repo;
    constructor(repo: AuthRepository);
    login(email: string, password: string): Promise<{
        status: string;
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
        token?: never;
    } | {
        status: string;
        token: string;
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
    }>;
    private sendEmailOtp;
    requestActivationOtp(email: string): Promise<{
        message: string;
    }>;
    activateWithOtp(email: string, otp: string, password: string): Promise<{
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
    forgotPassword(email: string): Promise<{
        message: string;
    }>;
    resetPassword(email: string, otp: string, newPassword: string): Promise<{
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
//# sourceMappingURL=auth.service.d.ts.map