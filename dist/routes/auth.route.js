import express from "express";
import prismaInstance from "../database";
import { AuthRepository } from "../repository/auth.repository";
import { AuthService } from "../service/auth.service";
import { AuthController } from "../controller/auth.controller";
const router = express.Router();
const repo = new AuthRepository(prismaInstance);
const service = new AuthService(repo);
const controller = new AuthController(service);
// LOGIN biasa
router.post("/login", controller.login);
// OTP aktivasi pertama user baru
router.post("/request-activation-otp", controller.requestActivationOtp);
// Aktivasi user baru dengan OTP + set password pertama
router.post("/activate-with-otp", controller.activateWithOtp);
// Lupa password
router.post("/forgot-password", controller.forgotPassword);
// Reset password dengan OTP
router.post("/reset-password", controller.resetPassword);
export default router;
//# sourceMappingURL=auth.route.js.map