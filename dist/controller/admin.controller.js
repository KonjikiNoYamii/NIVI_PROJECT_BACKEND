import { successResponse } from "../utils/response";
export class AdminController {
    service;
    constructor(service) {
        this.service = service;
    }
    createFirstAdmin = async (req, res, next) => {
        try {
            const { name, email, password } = req.body;
            const admin = await this.service.createFirstAdmin({ name, email, password });
            return successResponse(res, "Admin pertama berhasil dibuat", { id: admin.id, email: admin.email }, null, 201);
        }
        catch (err) {
            next(err);
        }
    };
    // CREATE SANTRI
    createSantriByAdmin = async (req, res, next) => {
        try {
            const santri = await this.service.createSantriByAdmin(req.body);
            return successResponse(res, "Santri berhasil dibuat, login untuk aktivasi", { email: santri.email }, null, 201);
        }
        catch (err) {
            next(err);
        }
    };
    // CREATE PENGAJAR
    createPengajarByAdmin = async (req, res, next) => {
        try {
            const pengajar = await this.service.createPengajarByAdmin(req.body);
            return successResponse(res, "Pengajar berhasil dibuat, login untuk aktivasi", { email: pengajar.email }, null, 201);
        }
        catch (err) {
            next(err);
        }
    };
    // AKTIVASI PASSWORD PERTAMA
    activateWithPassword = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            if (!email || !password)
                throw new Error("Email dan password wajib diisi");
            const user = await this.service.activateWithPassword(email, password);
            return successResponse(res, "Akun berhasil diaktivasi", { id: user.id, email: user.email });
        }
        catch (err) {
            next(err);
        }
    };
    // PENGAJAR KELAS
    assignPengajar = async (req, res, next) => {
        try {
            const { kelasId, pengajarId } = req.body;
            await this.service.assign(Number(kelasId), Number(pengajarId));
            return successResponse(res, "Pengajar berhasil ditambahkan ke kelas");
        }
        catch (err) {
            next(err);
        }
    };
    removePengajar = async (req, res, next) => {
        try {
            const { kelasId, pengajarId } = req.body;
            await this.service.remove(Number(kelasId), Number(pengajarId));
            return successResponse(res, "Pengajar berhasil dihapus dari kelas");
        }
        catch (err) {
            next(err);
        }
    };
    getPengajarByKelas = async (req, res, next) => {
        try {
            const kelasId = Number(req.params.kelasId);
            if (!kelasId)
                throw new Error("kelasId tidak valid");
            const pengajar = await this.service.listPengajar(kelasId);
            return successResponse(res, "Berhasil mengambil pengajar kelas", pengajar);
        }
        catch (err) {
            next(err);
        }
    };
    listAdmins = async (_req, res, next) => {
        try {
            const admins = await this.service.listAdmins();
            return successResponse(res, "List admin berhasil diambil", admins);
        }
        catch (err) {
            next(err);
        }
    };
    getAdmin = async (req, res, next) => {
        try {
            const admin = await this.service.getAdmin(Number(req.params.id));
            return successResponse(res, "Admin berhasil diambil", admin);
        }
        catch (err) {
            next(err);
        }
    };
    updateAdmin = async (req, res, next) => {
        try {
            const admin = await this.service.updateAdmin(Number(req.params.id), req.body);
            return successResponse(res, "Admin berhasil diperbarui", admin);
        }
        catch (err) {
            next(err);
        }
    };
    deleteAdmin = async (req, res, next) => {
        try {
            await this.service.deleteAdmin(Number(req.params.id));
            return successResponse(res, "Admin berhasil dihapus", null);
        }
        catch (err) {
            next(err);
        }
    };
    // CREATE ADMIN BARU (SETELAH FIRST ADMIN)
    createAdmin = async (req, res, next) => {
        try {
            // Pastikan yang request adalah admin (middleware auth)
            const { name, email, password } = req.body;
            if (!name || !email || !password)
                throw new Error("Semua field wajib diisi");
            const admin = await this.service.createAdmin({ name, email, password });
            return successResponse(res, "Admin berhasil dibuat", { id: admin.id, email: admin.email }, null, 201);
        }
        catch (err) {
            next(err);
        }
    };
}
//# sourceMappingURL=admin.controller.js.map