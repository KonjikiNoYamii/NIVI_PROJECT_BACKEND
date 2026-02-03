import { Request, Response } from "express";
import { AbsensiService } from "../service/absensi.service";
export declare class AutomationController {
    private absensiService;
    constructor(absensiService: AbsensiService);
    generateAlpha: (_req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
}
//# sourceMappingURL=automation.controller.d.ts.map