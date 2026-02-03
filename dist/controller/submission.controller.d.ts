import type { Request, Response } from "express";
import { SubmissionService } from "../service/submission.service";
import { TugasService } from "../service/tugas.service";
export declare class SubmissionController {
    private service;
    private tugasService;
    constructor(service: SubmissionService, tugasService: TugasService);
    /**
     * =========================
     * PENGAJAR
     * =========================
     * Melihat submission dari kelas yang dia ajar
     */
    getForPengajar: (req: Request, res: Response) => Promise<void>;
    /**
     * =========================
     * SANTRI
     * =========================
     * Melihat submission milik sendiri
     */
    getForSantri: (req: any, res: Response) => Promise<void>;
    /**
     * =========================
     * SANTRI
     * =========================
     * Submit tugas
     */
    submit: (req: any, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateStatus: (req: any, res: any) => Promise<any>;
    softDelete: (req: Request, res: Response) => Promise<void>;
    restore: (req: Request, res: Response) => Promise<void>;
    findArsipByPengajar: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=submission.controller.d.ts.map