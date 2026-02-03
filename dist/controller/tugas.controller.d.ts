import { Request, Response } from "express";
import { TugasService } from "../service/tugas.service";
export declare class TugasController {
    private service;
    constructor(service: TugasService);
    getAll: (_: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    create: (req: any, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    getForSantri: (req: Request, res: Response) => Promise<void>;
    archiveExpiredForSantri: (req: Request, res: Response) => Promise<void>;
    getArchivedForSantri: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=tugas.controller.d.ts.map