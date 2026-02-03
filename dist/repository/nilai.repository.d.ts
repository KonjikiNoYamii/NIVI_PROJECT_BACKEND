import { PrismaClient, Prisma, Nilai } from "../../dist/generated";
export declare class NilaiRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    findAll(): Prisma.PrismaPromise<({
        submission: {
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
            };
        } & {
            id: number;
            userId: number;
            status: import("../../dist/generated").$Enums.StatusSubmission;
            deletedAt: Date | null;
            tugasId: number;
            fileUrl: string | null;
            linkUrl: string | null;
            submittedAt: Date;
        };
    } & {
        id: number;
        createdAt: Date;
        nilai: number;
        submissionId: number;
        catatan: string | null;
    })[]>;
    findBySubmissionId(submissionId: number): Prisma.Prisma__NilaiClient<{
        id: number;
        createdAt: Date;
        nilai: number;
        submissionId: number;
        catatan: string | null;
    } | null, null, import("../../dist/generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    create(data: Prisma.NilaiCreateInput): Promise<Nilai>;
    update(submissionId: number, data: Prisma.NilaiUpdateInput): Prisma.Prisma__NilaiClient<{
        id: number;
        createdAt: Date;
        nilai: number;
        submissionId: number;
        catatan: string | null;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
    delete(submissionId: number): Prisma.Prisma__NilaiClient<{
        id: number;
        createdAt: Date;
        nilai: number;
        submissionId: number;
        catatan: string | null;
    }, never, import("../../dist/generated/runtime/client").DefaultArgs, Prisma.PrismaClientOptions>;
}
//# sourceMappingURL=nilai.repository.d.ts.map