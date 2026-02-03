import { Router } from "express";
import { AbsensiSettingRepository } from "../repository/absensiSetting.repository";
import { AbsensiSettingService } from "../service/absensiSetting.service";
import { AbsensiSettingController } from "../controller/absensiSetting.controller";
import { authenticate } from "../middlewares/auth.middleware";
import prismaInstance from "../database";
const repo = new AbsensiSettingRepository(prismaInstance);
const service = new AbsensiSettingService(repo);
const controller = new AbsensiSettingController(service);
const router = Router();
// GET semua setting
router.get("/", controller.getAll);
// GET setting per kelas
router.get("/kelas/:kelasId", authenticate, controller.getByKelas);
// POST create/update per kelas (upsert)
router.post("/kelas/:kelasId", authenticate, controller.createOrUpdate);
// PUT update berdasarkan id (jangan ada duplikasi)
router.put("/:id", authenticate, controller.updateById);
export default router;
//# sourceMappingURL=absensiSetting.route.js.map