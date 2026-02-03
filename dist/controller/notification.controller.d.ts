import { Request, Response } from "express";
import { NotificationService } from "../service/notification.service";
export declare class NotificationController {
    private notificationService;
    constructor(notificationService: NotificationService);
    getMyNotifications: (req: Request, res: Response) => Promise<void>;
    markAsRead: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=notification.controller.d.ts.map