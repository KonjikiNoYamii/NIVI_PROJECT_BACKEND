import { StatusAbsensi } from "../../dist/generated";
import { successResponse, errorResponse } from "../utils/response";
export class AbsensiController {
    service;
    userService;
    constructor(service, userService) {
        this.service = service;
        this.userService = userService;
    }
    // Tambahkan di AbsensiController.ts
    getAll = async (_req, res) => {
        try {
            const data = await this.service.getAll();
            successResponse(res, "Semua absensi", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getByUserId = async (req, res) => {
        try {
            const userId = Number(req.params.id);
            const data = await this.service.getByUserId(userId);
            successResponse(res, `Absensi user ${userId}`, data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    absen = async (req, res) => {
        try {
            const userId = Number(req.user.id);
            const { status, jadwalId } = req.body;
            // 1️⃣ Validasi status
            if (!Object.values(StatusAbsensi).includes(status)) {
                throw new Error("Status tidak valid");
            }
            // 2️⃣ Ambil user
            const user = await this.userService.getById(userId);
            if (!user?.kelasId) {
                throw new Error("User belum punya kelas");
            }
            // 3️⃣ Pastikan kelasId selalu array
            const kelasIds = Array.isArray(user.kelasId)
                ? user.kelasId
                : [user.kelasId];
            if (kelasIds.length === 0) {
                throw new Error("User belum punya kelas");
            }
            // 4️⃣ Loop absen untuk semua kelas
            const dataResults = [];
            for (const kelasId of kelasIds) {
                // Absen hadir
                const data = await this.service.absenHadir(userId, kelasId, status, jadwalId);
                dataResults.push(data);
                // Emit ke user-specific room
            }
            successResponse(res, "Absen berhasil", dataResults, null, 201);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getMyTodayAbsensi = async (req, res) => {
        try {
            const userId = Number(req.user.id);
            const data = await this.service.getTodayByUser(userId);
            successResponse(res, "Absensi hari ini", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    update = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { status } = req.body;
            const data = await this.service.updateAbsensi(id, {
                status: status,
            });
            successResponse(res, "Absensi diperbarui", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    delete = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const data = await this.service.deleteAbsensi(id);
            successResponse(res, "Absensi dihapus", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getByKelas = async (req, res) => {
        try {
            const kelasId = Number(req.params.kelasId);
            const page = Number(req.query.page ?? 1);
            const limit = Number(req.query.limit ?? 20);
            const sort = req.query.sort === "asc" ? "asc" : "desc";
            const result = await this.service.getByKelas({
                kelasId,
                page,
                limit,
                sort,
            });
            res.json({
                success: true,
                ...result,
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    };
    rekapBulananPerSantri = async (req, res) => {
        try {
            const userId = Number(req.params.userId);
            const { bulan } = req.query;
            if (!bulan) {
                throw new Error("Query bulan wajib (YYYY-MM)");
            }
            const data = await this.service.rekapBulananPerSantri(userId, String(bulan));
            res.json({
                success: true,
                message: "Rekap bulanan santri berhasil",
                data,
            });
        }
        catch (err) {
            res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    };
    rekapMingguanPerSantri = async (req, res) => {
        try {
            const userId = Number(req.params.userId);
            const { minggu } = req.query;
            if (!minggu) {
                throw new Error("Query minggu wajib (YYYY-MM-DD)");
            }
            const data = await this.service.rekapMingguanPerSantri(userId, String(minggu));
            res.json({
                message: "Rekap mingguan santri berhasil",
                data,
            });
        }
        catch (err) {
            res.status(400).json({
                message: err.message,
            });
        }
    };
    getRekapBulanan = async (req, res) => {
        try {
            const kelasId = Number(req.params.kelasId);
            const bulan = Number(req.query.bulan);
            const tahun = Number(req.query.tahun);
            if (!kelasId || !bulan || !tahun) {
                return res.status(400).json({ message: "Kelas, bulan, dan tahun wajib diisi" });
            }
            const rekap = await this.service.getRekapBulanan(kelasId, bulan, tahun);
            return res.json(rekap);
        }
        catch (err) {
            console.error(err);
            return res.status(500).json({ message: "Terjadi kesalahan server" });
        }
    };
}
//# sourceMappingURL=absensi.controller.js.map