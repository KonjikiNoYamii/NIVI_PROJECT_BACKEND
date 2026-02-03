import { Router } from "express";
import prismaInstance from "../database";
import { AdminRepository } from "../repository/admin.repository";
import { AdminService } from "../service/admin.service";
import { AdminController } from "../controller/admin.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { Role } from "../../dist/generated";
const router = Router();
const repo = new AdminRepository(prismaInstance);
const service = new AdminService(repo);
const controller = new AdminController(service);
router.post("/", controller.createFirstAdmin);
router.post("/create", controller.createAdmin);
// SANTRI & PENGAJAR
router.post("/santri", authenticate, roleMiddleware([Role.admin]), controller.createSantriByAdmin);
router.post("/pengajar", authenticate, roleMiddleware([Role.admin]), controller.createPengajarByAdmin);
// AKTIVASI PERTAMA PASSWORD
router.post("/activate", controller.activateWithPassword);
// PENGAJAR KELAS
router.post("/kelas/pengajar", authenticate, roleMiddleware([Role.admin]), controller.assignPengajar);
router.delete("/kelas/pengajar", authenticate, roleMiddleware([Role.admin]), controller.removePengajar);
router.get("/kelas/:kelasId/pengajar", authenticate, roleMiddleware([Role.admin]), controller.getPengajarByKelas);
export default router;
//# sourceMappingURL=admin.route.js.map