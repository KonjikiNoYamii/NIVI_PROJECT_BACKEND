import { successResponse } from "../utils/response";
export class IzinController {
    izinService;
    constructor(izinService) {
        this.izinService = izinService;
    }
    getMyIzin = async (req, res) => {
        const userId = Number(req.user.id);
        const result = await this.izinService.getByUserId(userId);
        successResponse(res, "Izin user berhasil diambil", result);
    };
    // GET ALL IZIN
    getAll = async (_req, res) => {
        const data = await this.izinService.getAll();
        successResponse(res, "Berhasil ambil semua izin", data);
    };
    getAllByPengajar = async (req, res) => {
        if (!req.user?.id) {
            throw new Error("user tidak ditemukank!");
        }
        const pengajarId = req.user?.id;
        const kelas = await this.izinService.getAllByPengajar(pengajarId);
        successResponse(res, "kelas berhasil diambil!", kelas);
    };
    // GET IZIN BY ID
    getById = async (req, res) => {
        const id = Number(req.params.id);
        const data = await this.izinService.getById(id);
        successResponse(res, "Berhasil ambil izin", data);
    };
    // GET IZIN BY USER
    getByUser = async (req, res) => {
        const userId = Number(req.params.userId);
        const data = await this.izinService.getByUserId(userId);
        successResponse(res, "Berhasil ambil izin user", data);
    };
    // CREATE IZIN
    create = async (req, res) => {
        const userId = Number(req.user.id);
        const kelasId = Number(req.user.kelasId);
        const data = await this.izinService.createIzin({
            userId,
            kelasId,
            tanggal: new Date(),
            alasan: req.body.alasan,
        });
        successResponse(res, "Izin berhasil dibuat", data, null, 201);
    };
    // UPDATE IZIN
    update = async (req, res) => {
        const id = Number(req.params.id);
        const status = req.body.status; // ✅ Ambil status saja
        const data = await this.izinService.updateIzinStatus(id, status);
        successResponse(res, "Izin berhasil diupdate", data);
    };
    // DELETE IZIN
    delete = async (req, res) => {
        const id = Number(req.params.id);
        const data = await this.izinService.deleteIzin(id);
        successResponse(res, "Izin berhasil dihapus", data);
    };
    getAllArchived = async (req, res) => {
        if (!req.user?.id) {
            throw new Error("user tidak ditemukan!");
        }
        const pengajarId = req.user.id;
        const data = await this.izinService.getAllArchived(pengajarId);
        successResponse(res, "Berhasil ambil semua izin arsip", data);
    };
    softDelete = async (req, res) => {
        const id = Number(req.params.id);
        const data = await this.izinService.softDelete(id);
        successResponse(res, "Izin berhasil diarsipkan", data);
    };
}
//# sourceMappingURL=izin.controller.js.map