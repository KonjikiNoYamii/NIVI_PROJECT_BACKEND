import { Request, Response } from "express";
import { NilaiService } from "../service/nilai.service";
export declare class NilaiController {
    private service;
    constructor(service: NilaiService);
    getAll: (_req: Request, res: Response) => Promise<void>;
    getBySubmission: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=nilai.controller.d.ts.map