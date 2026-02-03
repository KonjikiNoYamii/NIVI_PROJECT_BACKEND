import { Request, Response } from "express";
import { DashboardService } from "../../service/dashboard/p-dashboard.service";
export declare class DashboardController {
    private service;
    constructor(service: DashboardService);
    getPengajarDashboard: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
}
//# sourceMappingURL=p-dashboard.controller.d.ts.map