import { Request, Response } from "express";
import { MataPelajaranService } from "../service/mataPelajaran.service";
export declare class MataPelajaranController {
    private service;
    constructor(service: MataPelajaranService);
    getAll: (_: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=mataPelajaran.controller.d.ts.map