import { Router } from "express";
import { KelasRepository } from "../repository/kelas.repository";
import prismaInstance from "../database";
import { KelasService } from "../service/kelas.service";
import { KelasController } from "../controller/kelas.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();
// INIT LAYER
const kelasRepo = new KelasRepository(prismaInstance);
const kelasService = new KelasService(kelasRepo);
const kelasController = new KelasController(kelasService);
/**
 * @swagger
 * tags:
 *   name: Kelas
 *   description: Manajemen data kelas
*/
router.get("/pengajar/me", authenticate, kelasController.getKelasByPengajar);
/**
 * @swagger
 * /kelas:
 *   get:
 *     summary: Ambil semua data kelas
 *     tags: [Kelas]
 *     responses:
 *       200:
 *         description: Berhasil mengambil data kelas
 */
// GET ALL KELAS
router.get("/all/santri/admin", kelasController.getAllSantriByAdmin);
router.get("/all/santri", kelasController.getAllSantri);
router.get("/all/pengajar", authenticate, kelasController.getAllByPengajar);
router.get("/all", authenticate, kelasController.getAllKelas);
router.get("/", kelasController.getAll);
/**
 * @swagger
 * /kelas/{id}:
 *   get:
 *     summary: Ambil detail kelas berdasarkan ID
 *     tags: [Kelas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Detail kelas ditemukan
 *       404:
 *         description: Kelas tidak ditemukan
 */
// GET KELAS BY ID
router.get("/:id", kelasController.getById);
/**
 * @swagger
 * /kelas:
 *   post:
 *     summary: Tambah kelas baru
 *     tags: [Kelas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nama
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Kelas 7A
 *     responses:
 *       201:
 *         description: Kelas berhasil dibuat
 */
// CREATE KELAS
router.post("/", kelasController.create);
/**
 * @swagger
 * /kelas/{id}:
 *   put:
 *     summary: Update data kelas
 *     tags: [Kelas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nama:
 *                 type: string
 *                 example: Kelas 8B
 *     responses:
 *       200:
 *         description: Kelas berhasil diupdate
 */
// UPDATE KELAS
router.put("/:id", kelasController.update);
/**
 * @swagger
 * /kelas/{id}:
 *   delete:
 *     summary: Hapus kelas
 *     tags: [Kelas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Kelas berhasil dihapus
 */
// DELETE KELAS
router.delete("/:id", kelasController.delete);
router.post("/:id/pengajar", kelasController.assignPengajar);
router.put("/:id/pengajar", kelasController.setPengajar);
export default router;
//# sourceMappingURL=kelas.routes.js.map