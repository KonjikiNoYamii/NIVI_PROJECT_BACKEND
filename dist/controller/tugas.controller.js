import { successResponse } from "../utils/response";
export class TugasController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (_, res) => {
        const data = await this.service.getAll();
        successResponse(res, "Semua tugas", data);
    };
    getById = async (req, res) => {
        const id = Number(req.params.id);
        if (isNaN(id)) {
            return res.status(400).json({ message: 'ID tidak valid' });
        }
        const data = await this.service.getById(id);
        successResponse(res, "Detail tugas", data);
    };
    create = async (req, res) => {
        const { kelasId, mataPelajaranId, mapelId, title, description, deadline, } = req.body;
        const data = await this.service.create({
            kelasId: Number(kelasId),
            mataPelajaranId: Number(mataPelajaranId ?? mapelId),
            title,
            description,
            deadline: new Date(deadline),
            createdBy: req.user.id,
        });
        // 🔥 REALTIME: kirim ke semua member kelas
        successResponse(res, "Tugas berhasil dibuat", data, null, 201);
    };
    update = async (req, res) => {
        const data = await this.service.update(Number(req.params.id), req.body);
        // 🔥 kirim update ke kelas terkait
        successResponse(res, "Tugas berhasil diperbarui", data);
    };
    delete = async (req, res) => {
        const data = await this.service.delete(Number(req.params.id));
        successResponse(res, "Tugas berhasil dihapus", data);
    };
    getForSantri = async (req, res) => {
        if (!req.user) {
            throw new Error("user tidak ditemukan");
        }
        const data = await this.service.getForSantri(req.user.id);
        successResponse(res, "Tugas santri", data);
    };
    archiveExpiredForSantri = async (req, res) => {
        if (!req.user) {
            throw new Error("User tidak ditemukan");
        }
        const tugasId = Number(req.params.id);
        await this.service.archiveExpiredForSantri(req.user.id, tugasId);
        successResponse(res, "Tugas berhasil diarsipkan");
    };
    // 🔹 ambil tugas arsip santri
    getArchivedForSantri = async (req, res) => {
        if (!req.user) {
            throw new Error("User tidak ditemukan");
        }
        const data = await this.service.getArchivedForSantri(req.user.id);
        successResponse(res, "Daftar tugas arsip santri", data);
    };
}
//# sourceMappingURL=tugas.controller.js.map