import { PrismaClient, Role, User } from "../../dist/generated";
export declare class UserRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(data: {
        name: string;
        email: string;
        password: string;
        role: Role;
        kelasId?: number;
    }): Promise<User>;
    update(id: number, data: Partial<User>): Promise<User>;
    deactivate(id: number): Promise<User>;
    getStats(): Promise<import("../../dist/generated").Prisma.GetUserAggregateType<{
        _count: {
            id: true;
        };
    }>>;
    getSantri(): Promise<{
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
    getPengajar(): Promise<{
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
    isAdminExist(): Promise<boolean>;
    activate(userId: number): Promise<{
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
    activateByRole(userId: number, role: Role): Promise<import("../../dist/generated").Prisma.BatchPayload>;
    findManyByKelas(kelasId: number): Promise<{
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
    getAllUsers(): Promise<{
        name: string | null;
        id: number;
        email: string;
        isActive: boolean;
        role: import("../../dist/generated").$Enums.Role;
    }[]>;
}
//# sourceMappingURL=user.repository.d.ts.map