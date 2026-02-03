import { Router } from "express";
import prismaInstance from "../database";
import { LogAktivitasRepository } from "../repository/logAktivitas.repository";
import { LogAktivitasService } from "../service/logaktivitas.service";
import { LogAktivitasController } from "../controller/logAktivitas.controller";
const router = Router();
// DEPENDENCY INJECTION 
const logRepo = new LogAktivitasRepository(prismaInstance);
const logService = new LogAktivitasService(logRepo);
const logController = new LogAktivitasController(logService);
/**
 * @swagger
 * tags:
 *   name: LogAktivitas
 *   description: Pencatatan aktivitas user (login, create, update, delete, dll)
 */
/**
 * @swagger
 * /log-aktivitas:
 *   get:
 *     summary: Ambil semua log aktivitas
 *     tags: [LogAktivitas]
 *     responses:
 *       200:
 *         description: Berhasil mengambil semua log aktivitas
 */
// ROUTES
router.get("/", logController.getAll);
/**
 * @swagger
 * /log-aktivitas/user/{userId}:
 *   get:
 *     summary: Ambil log aktivitas berdasarkan user
 *     tags: [LogAktivitas]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 12
 *     responses:
 *       200:
 *         description: Log aktivitas user berhasil diambil
 */
router.get("/user/:userId", logController.getByUser);
/**
 * @swagger
 * /log-aktivitas:
 *   post:
 *     summary: Tambah log aktivitas baru
 *     tags: [LogAktivitas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - aktivitas
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 12
 *               aktivitas:
 *                 type: string
 *                 example: Login ke sistem
 *     responses:
 *       201:
 *         description: Log aktivitas berhasil dibuat
 */
router.post("/", logController.create);
/**
 * @swagger
 * /log-aktivitas/{id}:
 *   delete:
 *     summary: Hapus log aktivitas
 *     tags: [LogAktivitas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Log aktivitas berhasil dihapus
 */
router.delete("/:id", logController.delete);
export default router;
//# sourceMappingURL=logAktivitas.route.js.map