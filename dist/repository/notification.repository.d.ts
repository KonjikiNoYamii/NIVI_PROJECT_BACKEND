import { PrismaClient, Notification } from "../../dist/generated";
export declare class NotificationRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    create: (data: {
        userId: number;
        title: string;
        message: string;
        level: "warning" | "critical";
    }) => Promise<Notification>;
    getByUser: (userId: number) => Promise<Notification[]>;
    markAsRead: (id: number) => Promise<Notification>;
}
//# sourceMappingURL=notification.repository.d.ts.map