import { successResponse, errorResponse } from "../utils/response";
export class NilaiController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (_req, res) => {
        try {
            const data = await this.service.getAll();
            successResponse(res, "Semua nilai", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getBySubmission = async (req, res) => {
        try {
            const submissionId = Number(req.params.submissionId);
            const data = await this.service.getBySubmission(submissionId);
            successResponse(res, "Detail nilai", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    create = async (req, res) => {
        try {
            const data = await this.service.create(req.body);
            successResponse(res, "Nilai berhasil disimpan", data, null, 201);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    update = async (req, res) => {
        try {
            const submissionId = Number(req.params.submissionId);
            const data = await this.service.update(submissionId, req.body);
            // 🔥 REALTIME: emit ke room submission
            successResponse(res, "Nilai berhasil diperbarui", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    delete = async (req, res) => {
        try {
            const submissionId = Number(req.params.submissionId);
            await this.service.delete(submissionId);
            // 🔥 REALTIME: emit ke room submissio
            successResponse(res, "Nilai berhasil dihapus");
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
}
//# sourceMappingURL=nilai.controller.js.map