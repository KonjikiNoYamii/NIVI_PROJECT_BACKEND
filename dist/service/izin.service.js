import { StatusIzin } from "../../dist/generated";
export class IzinService {
    izinRepo;
    absensiRepo;
    absensiService;
    settingService;
    jadwalAbsensiRepo;
    constructor(izinRepo, absensiRepo, absensiService, settingService, jadwalAbsensiRepo) {
        this.izinRepo = izinRepo;
        this.absensiRepo = absensiRepo;
        this.absensiService = absensiService;
        this.settingService = settingService;
        this.jadwalAbsensiRepo = jadwalAbsensiRepo;
    }
    // ===============================
    // GET
    // ===============================
    getAll = async () => {
        return this.izinRepo.getAll();
    };
    getAllByPengajar = async (pengajarId) => {
        return this.izinRepo.getAllByPengajar(pengajarId);
    };
    getAllArchived = async (pengajarId) => {
        return this.izinRepo.getAllArchived(pengajarId);
    };
    // ===== SOFT DELETE =====
    softDelete = async (id) => {
        return this.izinRepo.softDelete(id);
    };
    getById(id) {
        return this.izinRepo.getById(id);
    }
    getByUserId(userId) {
        return this.izinRepo.getByUserId(userId);
    }
    // ===============================
    // CREATE IZIN (SANTRI)
    // ===============================
    async createIzin(data) {
        // 🔹 NORMALISASI TANGGAL (00:00)
        const tanggalIzin = new Date(data.tanggal.getFullYear(), data.tanggal.getMonth(), data.tanggal.getDate(), 12, 0, 0 // ⬅️ AMAN dari timezone bug
        );
        // 1️⃣ CEK JADWAL AKTIF SESUAI TANGGAL IZIN
        const jadwalAktif = await this.jadwalAbsensiRepo.findActiveSchedule(data.kelasId, tanggalIzin);
        if (!jadwalAktif) {
            throw new Error("Izin hanya bisa diajukan saat jadwal absensi aktif");
        }
        // 2️⃣ CEGAH IZIN DOBEL (STATUS MENUNGGU)
        const pending = await this.izinRepo.findByUserAndDate(data.userId, data.kelasId, tanggalIzin, "menunggu");
        if (pending) {
            throw new Error("Masih ada izin menunggu di hari ini");
        }
        // 3️⃣ VALIDASI KUOTA ABSENSI HARIAN
        const setting = await this.settingService.getByKelas(data.kelasId);
        if (!setting?.maxAbsen) {
            throw new Error("Setting absensi kelas belum lengkap");
        }
        const jumlahAbsenHariIni = await this.absensiRepo.countAbsenHariIni(data.userId, data.kelasId, tanggalIzin);
        if (jumlahAbsenHariIni >= setting.maxAbsen) {
            throw new Error("Kuota absensi hari ini sudah penuh");
        }
        // 4️⃣ SIMPAN IZIN
        return this.izinRepo.create({
            userId: data.userId,
            kelasId: data.kelasId,
            tanggal: new Date(), // waktu real submit
            alasan: data.alasan,
            status: "menunggu",
        });
    }
    // ===============================
    // UPDATE IZIN (PENGAJAR)
    // ===============================
    // IzinService.ts
    async updateIzinStatus(izinId, status) {
        const izin = await this.izinRepo.getById(izinId);
        if (!izin)
            throw new Error("Izin tidak ditemukan");
        if (izin.status !== StatusIzin.menunggu)
            throw new Error("Izin sudah diproses");
        // JIKA PENGAJAR MENYETUJUI
        if (status === StatusIzin.disetujui) {
            const setting = await this.settingService.getByKelas(izin.kelasId);
            if (!setting?.maxAbsen) {
                await this.izinRepo.update(izinId, {
                    status: StatusIzin.ditolak,
                });
                izin.status = StatusIzin.ditolak;
                return izin;
            }
            const totalHariIni = await this.absensiRepo.countTodayByUser(izin.userId);
            // 🚨 AUTO-TOLAK JIKA KUOTA HABIS
            if (totalHariIni >= setting.maxAbsen) {
                await this.izinRepo.update(izinId, {
                    status: StatusIzin.ditolak,
                });
                izin.status = StatusIzin.ditolak;
                return izin;
            }
            // ✅ KUOTA MASIH ADA → CATAT ABSENSI IZIN
            await this.absensiService.absenIzinDariPersetujuan(izin.userId, izin.kelasId, izin.tanggal);
            await this.izinRepo.update(izinId, {
                status: StatusIzin.disetujui,
            });
            izin.status = StatusIzin.disetujui;
            return izin;
        }
        // JIKA PENGAJAR MENOLAK MANUAL
        await this.izinRepo.update(izinId, {
            status: StatusIzin.ditolak,
        });
        izin.status = StatusIzin.ditolak;
        return izin;
    }
    // ===============================
    // DELETE IZIN
    // ===============================
    deleteIzin(id) {
        return this.izinRepo.delete(id);
    }
}
//# sourceMappingURL=izin.service.js.map