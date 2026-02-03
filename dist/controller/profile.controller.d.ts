import { Request, Response } from "express";
import { ProfileService } from "../service/profile.service";
export declare class ProfileController {
    private profileService;
    constructor(profileService: ProfileService);
    getMyProfile: (req: Request, res: Response) => Promise<void>;
    getProfileByUserId: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
    createProfile: (req: Request, res: Response) => Promise<void>;
    updateProfile: (req: Request, res: Response) => Promise<void>;
    deleteProfile: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=profile.controller.d.ts.map