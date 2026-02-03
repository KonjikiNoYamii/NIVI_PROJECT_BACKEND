import { Router } from "express";
import { UserRepository } from "../repository/user.repository";
import prismaInstance from "../database";
import { UserService } from "../service/user.service";
import { UserController } from "../controller/user.controller";
const router = Router();
const userRepo = new UserRepository(prismaInstance);
const userService = new UserService(userRepo);
const userController = new UserController(userService);
router.put("/:id/activate/santri", userController.activate);
/**
 * @swagger
 * tags:
 *   name: User
 *   description: Manajemen data user (admin, pengajar, santri)
 */
router.get("/all/user", userController.getUsers);
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Ambil semua user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Semua user berhasil diambil
 */
router.get("/", userController.getAll);
/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Ambil user berdasarkan ID
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: User ditemukan
 */
router.get("/santri", userController.getSantri);
router.get("/pengajar", userController.getPengajar);
// GET USER BY ID
router.get("/:id", userController.getById);
/**
 * @swagger
 * /users:
 *   post:
 *     summary: Tambah user baru (biasanya oleh admin)
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmad Fauzi
 *               email:
 *                 type: string
 *                 format: email
 *                 example: fauzi@mail.com
 *               password:
 *                 type: string
 *                 example: rahasia123
 *               role:
 *                 type: string
 *                 example: santri
 *               kelasId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: User berhasil dibuat
 */
router.post("/", userController.create);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update data user
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Ahmad Update
 *               email:
 *                 type: string
 *                 example: update@mail.com
 *               role:
 *                 type: string
 *                 example: santri
 *               kelasId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       200:
 *         description: User berhasil diupdate
 */
router.put("/:id", userController.update);
/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Nonaktifkan user (soft delete)
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *           example: 4
 *     responses:
 *       200:
 *         description: User berhasil dinonaktifkan
 */
router.delete("/:id", userController.deactivate);
/**
 * @swagger
 * /users/stats/all:
 *   get:
 *     summary: Ambil statistik user
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Statistik user berhasil diambil
 */
router.get("/stats/all", userController.getStats);
router.post("/admin/bootstrap", userController.createAdmin);
export default router;
//# sourceMappingURL=user.route.js.map