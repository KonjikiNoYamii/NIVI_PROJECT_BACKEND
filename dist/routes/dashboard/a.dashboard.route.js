import { Router } from "express";
import prismaInstance from "../../database";
import { authenticate } from "../../middlewares/auth.middleware";
import { AdminDashboardRepository } from "../../repository/dashboard/a-dashboard.repository";
import { AdminDashboardService } from "../../service/dashboard/a-dashboard.service";
import { AdminDashboardController } from "../../controller/dashboard/a-dashboard.controller";
import { roleMiddleware } from "../../middlewares/role.middleware";
import { Role } from "../../../dist/generated";
const router = Router();
const repo = new AdminDashboardRepository(prismaInstance);
const service = new AdminDashboardService(repo);
const controller = new AdminDashboardController(service);
router.get("/dashboard/admin", authenticate, roleMiddleware([Role.admin]), controller.getAdminDashboard);
export default router;
//# sourceMappingURL=a.dashboard.route.js.map