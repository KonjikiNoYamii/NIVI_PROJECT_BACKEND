import { Router } from "express";
import { PengajarRepository } from "../repository/pengajar.repository";
import prismaInstance from "../database";
import { PengajarService } from "../service/pengajar.service";
import { PengajarController } from "../controller/pengajar.controller";
const router = Router();
const repo = new PengajarRepository(prismaInstance);
const service = new PengajarService(repo);
const controller = new PengajarController(service);
// Hanya admin yang bisa create pengajar
router.post("/", controller.create);
export default router;
//# sourceMappingURL=pengajar.route.js.map