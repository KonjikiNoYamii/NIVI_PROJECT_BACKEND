import { errorResponse, successResponse } from "../utils/response";
export class SubmissionController {
    service;
    tugasService;
    constructor(service, tugasService) {
        this.service = service;
        this.tugasService = tugasService;
    }
    /**
     * =========================
     * PENGAJAR
     * =========================
     * Melihat submission dari kelas yang dia ajar
     */
    getForPengajar = async (req, res) => {
        if (!req.user) {
            throw new Error("User tidak ditemukan!");
        }
        const pengajarId = req.user.id;
        const data = await this.service.getForPengajar(pengajarId);
        successResponse(res, "Submission kelas yang anda ajar", data);
    };
    /**
     * =========================
     * SANTRI
     * =========================
     * Melihat submission milik sendiri
     */
    getForSantri = async (req, res) => {
        const userId = req.user.id;
        const data = await this.service.getForSantri(userId);
        successResponse(res, "Submission saya", data);
    };
    /**
     * =========================
     * SANTRI
     * =========================
     * Submit tugas
     */
    submit = async (req, res) => {
        const { tugasId, fileUrl, linkUrl } = req.body;
        const submission = await this.service.submitTugas({
            userId: req.user.id,
            tugasId: Number(tugasId),
            fileUrl,
            linkUrl,
        });
        // 🔥 ambil kelasId dari TUGAS
        const tugas = await this.tugasService.getById(Number(tugasId));
        if (!tugas) {
            return res.status(404).json({
                message: "Tugas tidak ditemukan",
            });
        }
        successResponse(res, "Tugas berhasil dikumpulkan", submission, null, 201);
    };
    updateStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body; // 'reviewed' | 'rejected'
            // Validasi status
            if (!['reviewed', 'rejected'].includes(status)) {
                return res.status(400).json({ message: "Status tidak valid" });
            }
            const updated = await this.service.updateStatus(+id, status);
            res.json({ success: true, data: updated });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ success: false, message: "Gagal update status" });
        }
    };
    softDelete = async (req, res) => {
        try {
            const submission = await this.service.softDelete(Number(req.params.id));
            successResponse(res, "Submission berhasil di arsipkan!", submission);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    restore = async (req, res) => {
        try {
            const submission = await this.service.restore(Number(req.params.id));
            successResponse(res, "Submission berhasil diambil!", submission);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    findArsipByPengajar = async (req, res) => {
        try {
            const data = await this.service.findArsipForPengajar(Number(req.user?.id));
            successResponse(res, "Submission berhasil diambil!", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
}
//# sourceMappingURL=submission.controller.js.map