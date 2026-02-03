import type { Request, Response } from "express";
import { AdminDashboardService } from "../../service/dashboard/a-dashboard.service";
export declare class AdminDashboardController {
    private service;
    constructor(service: AdminDashboardService);
    getAdminDashboard: (_req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=a-dashboard.controller.d.ts.map