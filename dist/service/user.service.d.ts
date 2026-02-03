import { Role, User } from "../../dist/generated";
import { UserRepository } from "../repository/user.repository";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getAll: () => Promise<User[]>;
    getById: (id: number) => Promise<User | null>;
    getByEmail: (email: string) => Promise<User | null>;
    createUser: (data: {
        name: string;
        email: string;
        password: string;
        role: Role;
        kelasId?: number;
    }) => Promise<User>;
    updateUser: (id: number, data: Partial<User>) => Promise<User>;
    deactivateUser: (id: number) => Promise<User>;
    getStats: () => Promise<import("../../dist/generated").Prisma.GetUserAggregateType<{
        _count: {
            id: true;
        };
    }>>;
    getSantri: () => Promise<{
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
    getPengajar: () => Promise<{
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
    activateUser: (userId: number, role?: Role) => Promise<{
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
    getUsersByKelas(kelasId: number): Promise<{
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
    getUsers(): Promise<{
        name: string | null;
        id: number;
        email: string;
        isActive: boolean;
        role: import("../../dist/generated").$Enums.Role;
    }[]>;
}
//# sourceMappingURL=user.service.d.ts.map