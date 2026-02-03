import { SubmissionRepository } from "../repository/submission.repository";
import { Submission } from "../../dist/generated";
export declare class SubmissionService {
    private repo;
    constructor(repo: SubmissionRepository);
    /**
     * =========================
     * PENGAJAR
     * =========================
     * Ambil semua submission dari kelas yang dia ajar
     */
    getForPengajar(pengajarId: number): Promise<Submission[]>;
    /**
     * =========================
     * SANTRI
     * =========================
     * Ambil submission milik santri sendiri
     */
    getForSantri(userId: number): Promise<Submission[]>;
    /**
     * =========================
     * SANTRI SUBMIT TUGAS
     * =========================
     */
    submitTugas(params: {
        userId: number;
        tugasId: number;
        fileUrl?: string;
        linkUrl?: string;
    }): Promise<Submission>;
    updateStatus: (id: number, status: "reviewed" | "rejected") => Promise<{
        id: number;
        userId: number;
        status: import("../../dist/generated").$Enums.StatusSubmission;
        deletedAt: Date | null;
        tugasId: number;
        fileUrl: string | null;
        linkUrl: string | null;
        submittedAt: Date;
    }>;
    softDelete: (id: number) => Promise<{
        id: number;
        userId: number;
        status: import("../../dist/generated").$Enums.StatusSubmission;
        deletedAt: Date | null;
        tugasId: number;
        fileUrl: string | null;
        linkUrl: string | null;
        submittedAt: Date;
    }>;
    restore: (id: number) => Promise<{
        id: number;
        userId: number;
        status: import("../../dist/generated").$Enums.StatusSubmission;
        deletedAt: Date | null;
        tugasId: number;
        fileUrl: string | null;
        linkUrl: string | null;
        submittedAt: Date;
    }>;
    findArsipForPengajar: (pengajarId: number) => Promise<{
        id: number;
        userId: number;
        status: import("../../dist/generated").$Enums.StatusSubmission;
        deletedAt: Date | null;
        tugasId: number;
        fileUrl: string | null;
        linkUrl: string | null;
        submittedAt: Date;
    }[]>;
}
//# sourceMappingURL=submission.service.d.ts.map