import { Request, Response } from "express";
import { KelasService } from "../service/kelas.service";
export declare class KelasController {
    private kelasService;
    constructor(kelasService: KelasService);
    getAllKelas: (_req: Request, res: Response) => Promise<void>;
    getAll: (_req: Request, res: Response) => Promise<void>;
    getAllSantri: (_req: Request, res: Response) => Promise<void>;
    getAllSantriByAdmin: (_req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    create: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    assignPengajar: (req: Request, res: Response) => Promise<void>;
    setPengajar: (req: Request, res: Response) => Promise<void>;
    getKelasByPengajar: (req: Request, res: Response) => Promise<void>;
    getAllByPengajar: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=kelas.controller.d.ts.map