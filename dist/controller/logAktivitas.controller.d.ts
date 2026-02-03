import type { Request, Response } from "express";
import { LogAktivitasService } from "../service/logaktivitas.service";
export declare class LogAktivitasController {
    private logService;
    constructor(logService: LogAktivitasService);
    getAll: (_req: Request, res: Response) => Promise<void>;
    getByUser: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=logAktivitas.controller.d.ts.map