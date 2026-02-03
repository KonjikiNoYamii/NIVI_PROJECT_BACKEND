import { errorResponse, successResponse } from "../utils/response";
export class ProfileController {
    profileService;
    constructor(profileService) {
        this.profileService = profileService;
    }
    // ======================
    // GET /profile/me
    // ======================
    getMyProfile = async (req, res) => {
        const userId = req.user.id;
        const profile = await this.profileService.getProfileByUserId(userId);
        successResponse(res, "Profile berhasil diambil", {
            user: req.user,
            profile,
        });
    };
    // ======================
    // GET /profile/user/:userId (ADMIN)
    // ======================
    getProfileByUserId = async (req, res) => {
        const userId = Number(req.params.userId);
        const profile = await this.profileService.getProfileByUserId(userId);
        if (!profile) {
            return successResponse(res, "Profile tidak ditemukan", null, null, 404);
        }
        successResponse(res, "Profile user berhasil diambil", profile);
    };
    // ======================
    // POST /profile
    // ======================
    createProfile = async (req, res) => {
        const userId = req.user.id;
        const profile = await this.profileService.createProfile({
            userId,
            namaLengkap: req.body.namaLengkap,
            noHp: req.body.noHp,
            alamat: req.body.alamat,
            fotoUrl: req.body.fotoUrl,
            tanggalLahir: req.body.tanggalLahir,
            jenisKelamin: req.body.jenisKelamin,
        });
        successResponse(res, "Profile berhasil dibuat", profile, null, 201);
    };
    // PUT /profile
    updateProfile = async (req, res) => {
        const userId = req.user.id;
        const file = req.file;
        try {
            // Jika profile belum ada, otomatis buat baru nanti via upsert
            const updateData = {
                namaLengkap: req.body.namaLengkap,
                noHp: req.body.noHp ?? null,
                alamat: req.body.alamat ?? null,
                tanggalLahir: req.body.tanggalLahir ? new Date(req.body.tanggalLahir) : null,
                jenisKelamin: req.body.jenisKelamin ?? null,
            };
            // Update foto hanya jika ada file baru
            if (file) {
                updateData.fotoUrl = `/uploads/${file.filename}`;
            }
            const profile = await this.profileService.updateProfile(userId, updateData);
            successResponse(res, "Profile berhasil diupdate", {
                user: req.user,
                profile,
            });
        }
        catch (error) {
            errorResponse(res, error.message || "Gagal update profile");
        }
    };
    // DELETE /profile
    deleteProfile = async (req, res) => {
        const userId = Number(req.user.id);
        await this.profileService.deletedProfile(userId);
        successResponse(res, "Profile berhasil dihapus", null);
    };
}
//# sourceMappingURL=profile.controller.js.map