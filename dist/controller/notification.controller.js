import { successResponse } from "../utils/response";
export class NotificationController {
    notificationService;
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    getMyNotifications = async (req, res) => {
        const userId = Number(req.user.id);
        const data = await this.notificationService.getMyNotifications(userId);
        successResponse(res, "Notifikasi berhasil diambil", data);
    };
    markAsRead = async (req, res) => {
        const id = Number(req.params.id);
        const data = await this.notificationService.readNotification(id);
        successResponse(res, "Notifikasi ditandai dibaca", data);
    };
}
//# sourceMappingURL=notification.controller.js.map