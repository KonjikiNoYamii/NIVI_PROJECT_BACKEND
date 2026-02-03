import { Router } from "express";
import prismaInstance from "../database";
import { NotificationRepository } from "../repository/notification.repository";
import { NotificationService } from "../service/notification.service";
import { NotificationController } from "../controller/notification.controller";
import { authenticate } from "../middlewares/auth.middleware";
const router = Router();
// INIT
const repo = new NotificationRepository(prismaInstance);
const service = new NotificationService(repo);
const controller = new NotificationController(service);
// GET MY NOTIFICATIONS
router.get("/me", authenticate, controller.getMyNotifications);
// MARK AS READ
router.put("/:id/read", authenticate, controller.markAsRead);
export default router;
//# sourceMappingURL=notification.route.js.map