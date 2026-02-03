import { Request, Response } from "express";
import { AbsensiSettingService } from "../service/absensiSetting.service";
export declare class AbsensiSettingController {
    private service;
    constructor(service: AbsensiSettingService);
    getAll: (_req: Request, res: Response) => Promise<void>;
    getByKelas: (req: Request, res: Response) => Promise<void>;
    createOrUpdate: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    updateById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=absensiSetting.controller.d.ts.map