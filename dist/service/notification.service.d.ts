import { Notification } from "../../dist/generated";
import { NotificationRepository } from "../repository/notification.repository";
export declare class NotificationService {
    private notificationRepo;
    constructor(notificationRepo: NotificationRepository);
    createWarning: (userId: number, alpha: number, persentaseHadir: number) => Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        title: string;
        message: string;
        level: string;
        isRead: boolean;
    }>;
    getMyNotifications: (userId: number) => Promise<Notification[]>;
    readNotification: (id: number) => Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        title: string;
        message: string;
        level: string;
        isRead: boolean;
    }>;
}
//# sourceMappingURL=notification.service.d.ts.map