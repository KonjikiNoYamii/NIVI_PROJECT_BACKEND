import { Router } from "express";
import prismaInstance from "../database";
import { JadwalAbsensiRepository } from "../repository/jadwalAbsensi.repository";
import { JadwalAbsensiService } from "../service/jadwalAbsensi.service";
import { JadwalAbsensiController } from "../controller/jadwalAbsensi.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { AbsensiSettingRepository } from "../repository/absensiSetting.repository";
const router = Router();
const repo = new JadwalAbsensiRepository(prismaInstance);
const settingRepo = new AbsensiSettingRepository(prismaInstance);
const service = new JadwalAbsensiService(repo, settingRepo);
const controller = new JadwalAbsensiController(service);
// CRUD
router.post("/", authenticate, controller.create); // create 1
router.get("/", authenticate, controller.getKelasAndTanggal);
router.get("/:id", authenticate, controller.getById);
router.post("/bulk", authenticate, controller.createBulk); // create banyak hari / bulan
router.get("/kelas/:kelasId", authenticate, controller.getAllByKelas);
router.put("/:id", authenticate, controller.update);
router.delete("/:id", authenticate, controller.delete);
export default router;
//# sourceMappingURL=jadwalAbsen.route.js.map