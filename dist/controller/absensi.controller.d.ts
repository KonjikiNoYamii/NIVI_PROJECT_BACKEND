import { Request, Response } from "express";
import { AbsensiService } from "../service/absensi.service";
import { UserService } from "../service/user.service";
export declare class AbsensiController {
    private service;
    private userService;
    constructor(service: AbsensiService, userService: UserService);
    getAll: (_req: Request, res: Response) => Promise<void>;
    getByUserId: (req: Request, res: Response) => Promise<void>;
    absen: (req: Request, res: Response) => Promise<void>;
    getMyTodayAbsensi: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    delete: (req: Request, res: Response) => Promise<void>;
    getByKelas: (req: Request, res: Response) => Promise<void>;
    rekapBulananPerSantri: (req: Request, res: Response) => Promise<void>;
    rekapMingguanPerSantri: (req: Request, res: Response) => Promise<void>;
    getRekapBulanan: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=absensi.controller.d.ts.map