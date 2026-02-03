import { successResponse, errorResponse } from "../utils/response";
export class AbsensiSettingController {
    service;
    constructor(service) {
        this.service = service;
    }
    getAll = async (_req, res) => {
        try {
            const data = await this.service.getAll();
            successResponse(res, "Semua setting absensi berhasil diambil", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    getByKelas = async (req, res) => {
        try {
            const kelasId = Number(req.params.kelasId);
            const data = await this.service.getByKelas(kelasId);
            successResponse(res, `Setting absensi kelas ${kelasId}`, data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    createOrUpdate = async (req, res) => {
        try {
            const kelasId = Number(req.params.kelasId);
            const { maxAbsen } = req.body;
            if (!maxAbsen)
                return res.status(400).json({ message: "maxAbsen wajib diisi" });
            const data = await this.service.createOrUpdate(kelasId, Number(maxAbsen));
            // 🔔 Emit socket update ke semua clien
            successResponse(res, "Max absen berhasil disimpan", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
    updateById = async (req, res) => {
        try {
            const id = Number(req.params.id);
            const { maxAbsen } = req.body;
            if (!maxAbsen)
                return res.status(400).json({ message: "maxAbsen wajib diisi" });
            const data = await this.service.updateById(id, Number(maxAbsen));
            // 🔔 Emit socket update ke semua client
            successResponse(res, "Max absen berhasil diupdate", data);
        }
        catch (err) {
            errorResponse(res, err.message);
        }
    };
}
//# sourceMappingURL=absensiSetting.controller.js.map