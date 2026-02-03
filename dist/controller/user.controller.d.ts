import type { Request, Response, NextFunction } from "express";
import { UserService } from "../service/user.service";
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getAll: (_req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getById: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    create: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    update: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    deactivate: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getStats: (_req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    getSantri: (_req: Request, res: Response) => Promise<void>;
    getPengajar: (_req: Request, res: Response) => Promise<void>;
    createAdmin: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
    activate: (req: Request, res: Response) => Promise<void>;
    getUsers: (_req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=user.controller.d.ts.map