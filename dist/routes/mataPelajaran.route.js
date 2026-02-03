import { Router } from "express";
import prisma from "../database";
import { MataPelajaranRepository } from "../repository/mataPelajaran.repository";
import { MataPelajaranService } from "../service/mataPelajaran.service";
import { MataPelajaranController } from "../controller/mataPelajaran.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();
const repo = new MataPelajaranRepository(prisma);
const service = new MataPelajaranService(repo);
const controller = new MataPelajaranController(service);
// ADMIN / PENGAJAR
router.get("/", controller.getAll);
router.get("/:id", authenticate, controller.getById);
router.post("/", authenticate, controller.create);
router.put("/:id", authenticate, controller.update);
router.delete("/:id", authenticate, controller.delete);
export default router;
//# sourceMappingURL=mataPelajaran.route.js.map