import { Router } from "express";
import { DashboardRepository } from "../../repository/dashboard/p-dashboard.repository";
import { DashboardService } from "../../service/dashboard/p-dashboard.service";
import { DashboardController } from "../../controller/dashboard/p-dashboard.controller";
import prismaInstance from "../../database";
import { authenticate } from "../../middlewares/auth.middleware";
const router = Router();
const repo = new DashboardRepository(prismaInstance);
const service = new DashboardService(repo);
const controller = new DashboardController(service);
router.get("/pengajar/dashboard", authenticate, controller.getPengajarDashboard);
export default router;
//# sourceMappingURL=p-dashboard.route.js.map