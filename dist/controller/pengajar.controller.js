import { successResponse } from "../utils/response";
export class PengajarController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create = async (req, res) => {
        const result = await this.prisma.createPengajar(req.body);
        successResponse(res, "Pengajar berhasil dibuat!", result);
    };
}
//# sourceMappingURL=pengajar.controller.js.map