import { Router } from "express";
import { AbsensiController } from "../controller/absensi.controller";
import { AbsensiService } from "../service/absensi.service";
import { AbsensiRepository } from "../repository/absensi.repository";
import { AbsensiSettingRepository } from "../repository/absensiSetting.repository";
import { JadwalAbsensiRepository } from "../repository/jadwalAbsensi.repository";
import prismaInstance from "../database";
import { authenticate } from "../middlewares/auth.middleware";
import { AbsensiSettingService } from "../service/absensiSetting.service";
import { UserRepository } from "../repository/user.repository";
import { UserService } from "../service/user.service";
import { AbsensiAIService } from "../service/absensiAI.service";
import { AIService } from "../ai/ai.service";
import { AIAssistantService } from "../service/ai.assistant.service";


const router = Router();

// 🔹 Inisialisasi repository & service & controller
const absensiRepo = new AbsensiRepository(prismaInstance);
const settingRepo = new AbsensiSettingRepository(prismaInstance);
const jadwalRepo = new JadwalAbsensiRepository(prismaInstance); // wajib punya method findActiveSchedule
const userRepo = new UserRepository(prismaInstance)
const userService = new UserService(userRepo)
const settingService = new AbsensiSettingService(settingRepo)
const AI = new AIService()
const AIAssistantServices = new AIAssistantService(absensiRepo, AI)
const absensiService = new AbsensiService(absensiRepo, settingService, jadwalRepo, AIAssistantServices);
// absensiService.startCronTest("*/1 * * * *"); 

const absensiController = new AbsensiController(absensiService, userService);

// POST absen (HADIR/IZIN/SAKIT) opsional jadwalId
router.post("/absen", authenticate,absensiController.absen);

// GET absensi hari ini
router.get("/me/today",authenticate, absensiController.getMyTodayAbsensi);

// 🔹 ADMIN CRUD (opsional, kalau admin ingin mengelola absensi manual)
router.get("/",absensiController.getAll); // semua absensi
router.get(
  "/rekap/santri/:userId",
  absensiController.rekapBulananPerSantri
);

router.get("/:id", authenticate,absensiController.getByUserId); // lihat absensi per user
router.put("/:id", authenticate,absensiController.update); // update status
router.delete("/:id",authenticate, absensiController.delete); // hapus absensi
router.get(
  '/kelas/:kelasId/absensi',
  absensiController.getByKelas,
);


export default router;
