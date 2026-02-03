import { successResponse, errorResponse } from "../utils/response";
export class JadwalAbsensiController {
    service;
    constructor(service) {
        this.service = service;
    }
    create = async (req, res) => {
        try {
            const { kelasId, hari, jamMulai, jamSelesai, tanggal } = req.body;
            if (!kelasId || !hari || !jamMulai || !jamSelesai || !tanggal) {
                return errorResponse(res, "Data tidak lengkap");
            }
            const jadwal = await this.service.create({
                kelasId: Number(kelasId),
                hari,
                jamMulai,
                jamSelesai,
                tanggal: new Date(tanggal),
            });
            successResponse(res, "Jadwal absen berhasil dibuat!", jadwal);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    createBulk = async (req, res) => {
        try {
            const { kelasId, jamMulai, jamSelesai, tanggalMulai, tanggalSelesai } = req.body;
            const result = await this.service.createBulkJadwal(kelasId, jamMulai, jamSelesai, new Date(tanggalMulai), new Date(tanggalSelesai));
            successResponse(res, "Jadwal bulk berhasil dibuat", result, null, 201);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getAllByKelas = async (req, res) => {
        try {
            const kelasId = Number(req.params.kelasId);
            const month = req.query.month ? Number(req.query.month) : undefined; // 1-12
            const year = req.query.year ? Number(req.query.year) : undefined;
            const jadwal = await this.service.getAllByKelas(kelasId, month, year);
            successResponse(res, "Jadwal berhasil diambil", jadwal);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getById = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const jadwal = await this.service.getById(id);
            if (!jadwal)
                throw new Error("Jadwal tidak ditemukan");
            successResponse(res, "Jadwal berhasil diambil", jadwal);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    update = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const payload = { ...req.body };
            if (payload.tanggal) {
                payload.tanggal = new Date(payload.tanggal);
            }
            const jadwal = await this.service.updateJadwal(id, payload);
            successResponse(res, "Jadwal berhasil diperbarui", jadwal);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    delete = async (req, res) => {
        try {
            const id = Number(req.params.id);
            await this.service.deleteJadwal(id);
            successResponse(res, "Jadwal berhasil dihapus", null);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getKelasAndTanggal = async (req, res) => {
        try {
            const { kelasId, tanggal, jamMulai } = req.query;
            if (!kelasId || !tanggal) {
                throw new Error("Kelas dan tanggal tidak ada!");
            }
            const jadwal = await this.service.getByKelasAndTanggal(Number(kelasId), new Date(tanggal), jamMulai);
            successResponse(res, "Jadwal berhasil dibuat!", jadwal);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
}
//# sourceMappingURL=jadwalAbsensi.controller.js.map