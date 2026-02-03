import { Router } from "express";
import { SubmissionRepository } from "../repository/submission.repository";
import { SubmissionService } from "../service/submission.service";
import { SubmissionController } from "../controller/submission.controller";
import prismaInstance from "../database";
import { authenticate } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { TugasRepository } from "../repository/tugas.repository";
import { TugasService } from "../service/tugas.service";
const router = Router();
// === Dependency Injection ===
const repository = new SubmissionRepository(prismaInstance);
const tugasRepo = new TugasRepository(prismaInstance);
const service = new SubmissionService(repository);
const tugasService = new TugasService(tugasRepo);
const controller = new SubmissionController(service, tugasService);
/**
 * =========================
 * SANTRI
 * =========================
 */
router.get("/tugas/arsip", authenticate, controller.findArsipByPengajar);
router.put("/:id/arsip", authenticate, controller.softDelete);
router.put("/:id/unarsip", authenticate, controller.restore);
// Santri submit tugas
router.post("/", authenticate, roleMiddleware(["santri"]), controller.submit);
// Santri lihat submission miliknya
router.get("/me", authenticate, roleMiddleware(["santri"]), controller.getForSantri);
/**
 * =========================
 * PENGAJAR
 * =========================
 */
// Pengajar lihat submission dari kelas yang dia ajar
router.get("/pengajar", authenticate, roleMiddleware(["pengajar"]), controller.getForPengajar);
/**
 * =========================
 * PENGAJAR UPDATE STATUS
 * =========================
 */
router.put("/:id/status", authenticate, roleMiddleware(["pengajar"]), controller.updateStatus);
export default router;
//# sourceMappingURL=submission.route.js.map