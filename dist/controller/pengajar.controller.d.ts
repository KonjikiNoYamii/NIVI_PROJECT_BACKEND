import type { Request, Response } from "express";
import * as service from "../service/pengajar.service";
export declare class PengajarController {
    private prisma;
    constructor(prisma: service.PengajarService);
    create: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=pengajar.controller.d.ts.map