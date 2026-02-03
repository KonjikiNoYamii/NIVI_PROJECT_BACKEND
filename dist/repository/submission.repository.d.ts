import { PrismaClient, Prisma, Submission } from "../../dist/generated";
export declare class SubmissionRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    /**
     * ========== CREATE ==========
     */
    create(data: Prisma.SubmissionCreateInput): Promise<Submission>;
    /**
     * ========== READ ==========
     */
    findById(id: number): Promise<Submission | null>;
    findByUserAndTugas(userId: number, tugasId: number): Promise<Submission | null>;
    findForSantri(userId: number): Promise<Submission[]>;
    findForPengajar(pengajarId: number): Promise<Submission[]>;
    findArsipForPengajar(pengajarId: number): Promise<Submission[]>;
    /**
     * ========== UPDATE ==========
     */
    update(id: number, data: Prisma.SubmissionUpdateInput): Promise<Submission>;
    /**
     * ========== DELETE ==========
     */
    delete(id: number): Promise<Submission>;
    softDelete(id: number): Promise<Submission>;
    restore(id: number): Promise<Submission>;
}
//# sourceMappingURL=submission.repository.d.ts.map