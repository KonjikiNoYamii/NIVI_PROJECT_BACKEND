import { Router } from "express";
import { ProfileRepository } from "../repository/profile.repository";
import { ProfileService } from "../service/profile.service";
import { ProfileController } from "../controller/profile.controller";
import prismaInstance from "../database";
import { authenticate } from "../middlewares/auth.middleware";
import { roleMiddleware } from "../middlewares/role.middleware";
import { Role } from "../../dist/generated";
import { upload } from "../middlewares/upload.middleware";
const router = Router();
// DEPENDENCY INJECTION
const profileRepository = new ProfileRepository(prismaInstance);
const profileService = new ProfileService(profileRepository);
const profileController = new ProfileController(profileService);
/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Manajemen profile user
 */
/**
 * @swagger
 * /profile/me:
 *   get:
 *     summary: Ambil profile user yang sedang login
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile berhasil diambil
 *       404:
 *         description: Profile belum dibuat
 */
router.get("/me", authenticate, profileController.getMyProfile);
/**
 * @swagger
 * /profile/user/{userId}:
 *   get:
 *     summary: Ambil profile berdasarkan userId (Admin only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Profile user ditemukan
 *       403:
 *         description: Akses ditolak
 */
router.get("/user/:userId", authenticate, roleMiddleware([Role.admin]), profileController.getProfileByUserId);
/**
 * @swagger
 * /profile:
 *   post:
 *     summary: Buat profile user (user login)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - namaLengkap
 *             properties:
 *               namaLengkap:
 *                 type: string
 *                 example: Yusuf Ramadhani
 *               noHp:
 *                 type: string
 *                 example: "08123456789"
 *               alamat:
 *                 type: string
 *                 example: Jakarta
 *               fotoUrl:
 *                 type: string
 *                 example: https://img.com/profile.jpg
 *               tanggalLahir:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-01
 *               jenisKelamin:
 *                 type: string
 *                 example: Laki-laki
 *     responses:
 *       201:
 *         description: Profile berhasil dibuat
 */
router.post("/", authenticate, profileController.createProfile);
/**
 * @swagger
 * /profile:
 *   put:
 *     summary: Update profile user (user login)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               namaLengkap:
 *                 type: string
 *                 example: Yusuf Ramadhani
 *               noHp:
 *                 type: string
 *                 example: "08123456789"
 *               alamat:
 *                 type: string
 *                 example: Bandung
 *               fotoUrl:
 *                 type: string
 *                 example: https://img.com/profile-new.jpg
 *               tanggalLahir:
 *                 type: string
 *                 format: date
 *                 example: 2000-01-01
 *               jenisKelamin:
 *                 type: string
 *                 example: Laki-laki
 *     responses:
 *       200:
 *         description: Profile berhasil diupdate
 */
router.put("/me", authenticate, upload.single("image"), profileController.updateProfile);
/**
 * @swagger
 * /profile/user/{userId}:
 *   delete:
 *     summary: Hapus profile user (Admin only)
 *     tags: [Profile]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 10
 *     responses:
 *       200:
 *         description: Profile berhasil dihapus
 *       403:
 *         description: Akses ditolak
 */
router.delete("/user/:userId", authenticate, roleMiddleware([Role.admin]));
export default router;
//# sourceMappingURL=profile.route.js.map