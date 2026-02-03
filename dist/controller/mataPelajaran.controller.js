import { successResponse } from "../utils/response";
export class MataPelajaranController {
    service;
    constructor(service) {
        this.service = service;
    }
    // GET ALL
    getAll = async (_, res) => {
        const data = await this.service.getAll();
        successResponse(res, "Semua mata pelajaran", data);
    };
    // GET BY ID
    getById = async (req, res) => {
        const id = Number(req.params.id);
        const data = await this.service.getById(id);
        successResponse(res, "Detail mata pelajaran", data);
    };
    // CREATE
    create = async (req, res) => {
        const { nama, kode } = req.body;
        const data = await this.service.create({ nama, kode });
        successResponse(res, "Mata pelajaran berhasil dibuat", data, null, 201);
    };
    // UPDATE
    update = async (req, res) => {
        const id = Number(req.params.id);
        const data = await this.service.update(id, req.body);
        successResponse(res, "Mata pelajaran berhasil diperbarui", data);
    };
    // DELETE
    delete = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const data = await this.service.delete(id);
            successResponse(res, "Mata pelajaran berhasil dihapus", data);
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: error.message || "Gagal menghapus mata pelajaran",
            });
        }
    };
}
//# sourceMappingURL=mataPelajaran.controller.js.map