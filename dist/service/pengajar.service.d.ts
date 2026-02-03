import { PengajarRepository } from "../repository/pengajar.repository";
export declare class PengajarService {
    private prisma;
    constructor(prisma: PengajarRepository);
    createPengajar: (data: {
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
//# sourceMappingURL=pengajar.service.d.ts.map