import { Router } from "express";
import prismaInstance from "../database";

import { IzinRepository } from "../repository/izin.repository";
import { AbsensiRepository } from "../repository/absensi.repository";
import { AbsensiSettingRepository } from "../repository/absensiSetting.repository";
import { JadwalAbsensiRepository } from "../repository/jadwalAbsensi.repository";

import { IzinService } from "../service/izin.service";
import { AbsensiService } from "../service/absensi.service";
import { AbsensiSettingService } from "../service/absensiSetting.service";
import { JadwalAbsensiService } from "../service/jadwalAbsensi.service";

import { IzinController } from "../controller/izin.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";


const router = Router();

/* =======================
   INIT REPOSITORY
======================= */
const izinRepo = new IzinRepository(prismaInstance);
const absensiRepo = new AbsensiRepository(prismaInstance);
const settingRepo = new AbsensiSettingRepository(prismaInstance);
const jadwalRepo = new JadwalAbsensiRepository(prismaInstance);

/* =======================
   INIT SERVICE
======================= */
const settingService = new AbsensiSettingService(settingRepo);

const jadwalAbsensiService = new JadwalAbsensiService(jadwalRepo);

const absensiService = new AbsensiService(
  absensiRepo,
  settingService,
  jadwalRepo,
);
const izinService = new IzinService(
  izinRepo,
  absensiRepo,
  absensiService,
  settingService,
  jadwalRepo,
  jadwalAbsensiService
);

/* =======================
   CONTROLLER
======================= */
const izinController = new IzinController(izinService);

/* =======================
   ROUTES
======================= */

// ROUTES UNTUK SANTRI
router.get("/me", authenticate, izinController.getMyIzin);
router.post("/", authenticate, izinController.create);

// ROUTES UNTUK ADMIN / PENGAJAR
router.get(
  "/",
 
  izinController.getAll
);

router.get(
  "/user/:userId",
  authenticate,
  roleMiddleware(["admin", "pengajar"]),
  izinController.getByUser
);

router.get(
  "/:id",
  authenticate,
  roleMiddleware(["admin", "pengajar"]),
  izinController.getById
);

router.put(
  "/:id",
  authenticate,
  roleMiddleware(["admin", "pengajar"]),
  izinController.update
);

router.delete(
  "/:id",
  authenticate,
  roleMiddleware(["admin", "pengajar"]),
  izinController.delete
);

export default router;
