import { Request, Response } from "express";
import { JadwalAbsensiService } from "../service/jadwalAbsensi.service";
export declare class JadwalAbsensiController {
    private service;
    constructor(service: JadwalAbsensiService);
    create: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createBulk: (req: Request, res: Response) => Promise<void>;
    getAllByKelas: (req: Request, res: Response) => Promise<void>;
    getById: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    getKelasAndTanggal: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=jadwalAbsensi.controller.d.ts.map