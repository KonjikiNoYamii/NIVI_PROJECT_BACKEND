import { StatusAbsensi } from "../../dist/generated";
import cron from "node-cron";
export class AbsensiService {
    absensiRepo;
    settingService;
    jadwalRepo;
    aiAssistantService;
    IzinRepo;
    constructor(absensiRepo, settingService, jadwalRepo, aiAssistantService, IzinRepo) {
        this.absensiRepo = absensiRepo;
        this.settingService = settingService;
        this.jadwalRepo = jadwalRepo;
        this.aiAssistantService = aiAssistantService;
        this.IzinRepo = IzinRepo;
    }
    // ===============================
    // ABSEN HADIR / TELAT / DLL
    // ===============================
    async absenHadir(userId, kelasId, status, jadwalId) {
        const now = new Date();
        // 1️⃣ setting wajib ada
        const setting = await this.settingService.getByKelas(kelasId);
        if (!setting) {
            throw new Error("Admin belum mengatur absensi kelas");
        }
        // 2️⃣ cari jadwal aktif
        const jadwal = await this.jadwalRepo.findActiveSchedule(kelasId, now, jadwalId);
        if (!jadwal) {
            throw new Error("Tidak ada jadwal absensi aktif");
        }
        // 3️⃣ VALIDASI TANGGAL
        const today = now.toDateString();
        const jadwalDate = new Date(jadwal.tanggal).toDateString();
        if (today !== jadwalDate) {
            throw new Error("Absensi tidak sesuai tanggal jadwal");
        }
        // 4️⃣ VALIDASI JAM
        const nowTime = now.toTimeString().slice(0, 5);
        if (nowTime < jadwal.jamMulai || nowTime > jadwal.jamSelesai) {
            throw new Error("Absensi belum dibuka atau sudah ditutup");
        }
        // 5️⃣ TIDAK BOLEH DOUBLE ABSEN DI JADWAL YANG SAMA
        const alreadyAbsen = await this.absensiRepo.findByUserAndJadwal(userId, jadwal.id);
        if (alreadyAbsen) {
            throw new Error("Anda sudah melakukan absensi pada jadwal ini");
        }
        // 6️⃣ BATAS MAX ABSEN HARIAN
        const todayCount = await this.absensiRepo.countTodayByUser(userId);
        if (todayCount >= setting.maxAbsen) {
            throw new Error(`Absensi hari ini sudah mencapai batas (${setting.maxAbsen}x)`);
        }
        // 7️⃣ STATUS VALID
        if (status !== "hadir") {
            throw new Error("Status absensi tidak valid");
        }
        // ✅ SIMPAN ABSENSI
        const absensi = await this.absensiRepo.create({
            userId,
            kelasId,
            jadwalId: jadwal.id,
            status,
            tanggal: now,
        });
        // 🤖 NON-BLOCKING AI
        this.aiAssistantService.evaluateAbsensi(absensi.id, "santri");
        return absensi;
    }
    // ===============================
    // IZIN → ABSENSI (SETELAH DISETUJUI)
    // ===============================
    async absenIzinDariPersetujuan(userId, kelasId, tanggal) {
        const setting = await this.settingService.getByKelas(kelasId);
        if (!setting)
            throw new Error("Setting absensi belum ada");
        // HITUNG NON-IZIN SAJA
        const nonIzinCount = await this.absensiRepo.countNonIzinAbsensiByTanggal(userId, tanggal);
        if (nonIzinCount >= setting.maxAbsen) {
            throw new Error(`Izin ditolak otomatis: batas absensi (${setting.maxAbsen}) tercapai`);
        }
        return this.absensiRepo.create({
            userId,
            kelasId,
            tanggal,
            status: "izin",
        });
    }
    // ===============================
    // GETTER
    // ===============================
    getTodayByUser(userId) {
        return this.absensiRepo.getTodayByUser(userId);
    }
    getByUserId(userId) {
        return this.absensiRepo.getByUserId(userId);
    }
    getAll() {
        return this.absensiRepo.getAll();
    }
    // ===============================
    // UPDATE & DELETE
    // ===============================
    updateAbsensi(id, data) {
        return this.absensiRepo.update(id, data);
    }
    deleteAbsensi(id) {
        return this.absensiRepo.delete(id);
    }
    getByKelas = async ({ kelasId, page, limit, sort, }) => {
        const skip = (page - 1) * limit;
        const [data, total] = await Promise.all([
            this.absensiRepo.findByKelasPaginated({
                kelasId,
                skip,
                take: limit,
                sort,
            }),
            this.absensiRepo.countByKelas(kelasId),
        ]);
        return {
            data,
            meta: {
                page,
                limit,
                total,
                totalPage: Math.ceil(total / limit),
            },
        };
    };
    //   generateDailyAbsensiStatus = async (
    //   userId: number,
    //   kelasId: number,
    //   tanggal: Date,
    // ) => {
    //   const setting = await this.settingService.getByKelas(kelasId);
    //   if (!setting?.maxAbsen) return;
    //   // Hitung absensi hari itu
    //   const absensiHariIni = await this.absensiRepo.countUserAbsensiByTanggal(
    //     userId,
    //     tanggal,
    //   );
    //   // Jika absensi kurang dari maxAbsen, sisa slot dianggap alpha
    //   const alphaCount = setting.maxAbsen - absensiHariIni;
    //   // Tandai sisa slot sebagai alpha (optional, bisa simpan di tabel absensi)
    //   for (let i = 0; i < alphaCount; i++) {
    //     await this.absensiRepo.create({
    //       userId,
    //       kelasId,
    //       tanggal,
    //       status: StatusAbsensi.alpha, // status khusus
    //     });
    //   }
    // };
    parseJam(jamSelesai) {
        const parts = jamSelesai.split(":");
        if (parts.length !== 2)
            return null;
        const jam = Number(parts[0]);
        const menit = Number(parts[1]);
        if (Number.isNaN(jam) || Number.isNaN(menit))
            return null;
        return { jam, menit };
    }
    async generateDailyAbsensiStatus(userId, kelasId, tanggal) {
        const setting = await this.settingService.getByKelas(kelasId);
        if (!setting?.maxAbsen)
            return;
        const jadwalHariIni = await this.jadwalRepo.getByKelasAndTanggal(kelasId, tanggal);
        if (!jadwalHariIni || jadwalHariIni.length === 0)
            return;
        const now = new Date();
        for (const jadwal of jadwalHariIni) {
            if (!jadwal.id || !jadwal.jamSelesai)
                continue;
            // 1️⃣ Batasi maxAbsen
            const totalHariIni = await this.absensiRepo.countNonIzinAbsensiByTanggal(userId, tanggal);
            if (totalHariIni >= setting.maxAbsen)
                break;
            // 2️⃣ Hitung waktu sesi selesai (PAKAI parseJam SAJA)
            const waktu = this.parseJam(jadwal.jamSelesai);
            if (!waktu)
                continue;
            const sesiSelesai = new Date();
            sesiSelesai.setFullYear(tanggal.getFullYear(), tanggal.getMonth(), tanggal.getDate());
            sesiSelesai.setHours(waktu.jam, waktu.menit, 0, 0);
            console.log({
                now: now.toISOString(),
                sesiSelesai: sesiSelesai.toISOString(),
                jadwalId: jadwal.id,
            });
            // 3️⃣ Sesi belum lewat → skip
            if (now < sesiSelesai)
                continue;
            // 4️⃣ Slot sudah terisi → skip
            const sudahAda = await this.absensiRepo.findByUserAndJadwal(userId, jadwal.id);
            if (sudahAda)
                continue;
            // 5️⃣ BUAT ALPHA
            await this.absensiRepo.create({
                userId,
                kelasId,
                tanggal,
                jadwalId: jadwal.id,
                status: StatusAbsensi.alpha,
            });
        }
    }
    // ===============================
    // GENERATE ALPHA UNTUK SEMUA USER DAN KELAS
    // ===============================
    async generateAlphaForAll(date) {
        const semuaSetting = await this.settingService.getAll();
        for (const setting of semuaSetting) {
            const kelasId = setting.kelasId;
            // Ambil semua santri di kelas ini
            const santri = await this.absensiRepo.getUsersByKelas(kelasId);
            for (const user of santri) {
                await this.generateDailyAbsensiStatus(user.id, kelasId, date);
            }
        }
    }
    async generateAlphaRealtimePerUser(userId, kelasId, maxAbsen, now) {
        const tanggal = new Date(now);
        tanggal.setHours(0, 0, 0, 0);
        const jadwalHariIni = await this.jadwalRepo.getByKelasAndTanggal(kelasId, tanggal);
        if (!jadwalHariIni || jadwalHariIni.length === 0)
            return;
        const totalHariIni = await this.absensiRepo.countNonIzinAbsensiByTanggal(userId, tanggal);
        if (totalHariIni >= maxAbsen)
            return;
        for (const jadwal of jadwalHariIni) {
            if (!jadwal.id || !jadwal.jamSelesai)
                continue;
            // 1️⃣ Hitung jam selesai sesi
            const waktu = this.parseJam(jadwal.jamSelesai);
            if (!waktu)
                continue;
            const sesiSelesai = new Date(tanggal);
            sesiSelesai.setHours(waktu.jam, waktu.menit, 0, 0);
            // 2️⃣ Sesi BELUM selesai → stop
            if (now < sesiSelesai)
                continue;
            // 3️⃣ Slot sudah terisi → skip
            const sudahAda = await this.absensiRepo.findByUserAndJadwal(userId, jadwal.id);
            if (sudahAda)
                continue;
            // 4️⃣ BUAT ALPHA
            await this.absensiRepo.create({
                userId,
                kelasId,
                tanggal,
                jadwalId: jadwal.id,
                status: StatusAbsensi.alpha,
            });
        }
    }
    async generateAlphaRealtime(now) {
        const semuaSetting = await this.settingService.getAll();
        for (const setting of semuaSetting) {
            const kelasId = setting.kelasId;
            if (!setting.maxAbsen)
                continue;
            const santri = await this.absensiRepo.getUsersByKelas(kelasId);
            for (const user of santri) {
                await this.generateAlphaRealtimePerUser(user.id, kelasId, setting.maxAbsen, now);
            }
        }
    }
    startCronRealtime() {
        cron.schedule("*/1 * * * *", async () => {
            const now = new Date();
            now.setSeconds(0, 0);
            console.log("[CRON] Realtime alpha check:", now.toISOString());
            await this.generateAlphaRealtime(now);
        });
        console.log("[CRON] Alpha realtime per sesi AKTIF");
    }
    // ================================
    // TEST MANUAL (tanpa cron)
    // ================================
    async testGenerateAlphaForDate(tanggal) {
        console.log("=== Mulai generate alpha manual ===");
        await this.generateAlphaForAll(tanggal);
        console.log("=== Selesai generate alpha manual ===");
    }
    async rekapBulananPerSantri(userId, bulan) {
        // "2026-01" → [2026, 1]
        const [year, month] = bulan.split("-").map(Number);
        // validasi format
        if (!year || !month) {
            throw new Error("Format bulan harus YYYY-MM");
        }
        // range tanggal
        const start = new Date(year, month - 1, 1);
        const end = new Date(year, month, 0, 23, 59, 59);
        // ambil data mentah
        const absensi = await this.absensiRepo.getAbsensiByUserAndMonth(userId, start, end);
        // hitung status
        let hadir = 0;
        let izin = 0;
        let alpha = 0;
        absensi.forEach((a) => {
            if (a.status === StatusAbsensi.hadir)
                hadir++;
            if (a.status === StatusAbsensi.izin)
                izin++;
            if (a.status === StatusAbsensi.alpha)
                alpha++;
        });
        const total = absensi.length;
        const persentaseHadir = total === 0 ? 0 : Math.round((hadir / total) * 100);
        return {
            userId,
            bulan,
            hadir,
            izin,
            alpha,
            total,
            persentaseHadir,
        };
    }
    async rekapMingguanPerSantri(userId, minggu) {
        const baseDate = new Date(minggu);
        if (isNaN(baseDate.getTime())) {
            throw new Error("Format minggu harus YYYY-MM-DD");
        }
        // hitung awal & akhir minggu (Senin - Minggu)
        const day = baseDate.getDay(); // 0 = Minggu
        const diffToMonday = day === 0 ? -6 : 1 - day;
        const start = new Date(baseDate);
        start.setDate(baseDate.getDate() + diffToMonday);
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        // ambil data
        const absensi = await this.absensiRepo.getAbsensiByUserAndWeek(userId, start, end);
        let hadir = 0;
        let izin = 0;
        let alpha = 0;
        absensi.forEach((a) => {
            if (a.status === StatusAbsensi.hadir)
                hadir++;
            if (a.status === StatusAbsensi.izin)
                izin++;
            if (a.status === StatusAbsensi.alpha)
                alpha++;
        });
        const total = absensi.length;
        const persentaseHadir = total === 0 ? 0 : Math.round((hadir / total) * 100);
        return {
            userId,
            minggu: `${start.toISOString().slice(0, 10)} s/d ${end.toISOString().slice(0, 10)}`,
            hadir,
            izin,
            alpha,
            total,
            persentaseHadir,
        };
    }
    async getRekapBulanan(kelasId, bulan, tahun) {
        const start = new Date(tahun, bulan - 1, 1);
        const end = new Date(tahun, bulan, 0, 23, 59, 59);
        const santris = await this.absensiRepo.getUsersByKelas(kelasId);
        const rekap = {};
        for (const santri of santris) {
            const absensis = await this.absensiRepo.getAbsensiByUserAndMonth(santri.id, start, end);
            const izins = await this.IzinRepo.getIzinByUserAndMonth(santri.id, start, end);
            const summary = {
                hadir: 0,
                sakit: 0,
                izin: 0,
                alpha: 0,
                total: absensis.length + izins.length,
                detail: [],
            };
            // Absensi
            for (const a of absensis) {
                const status = a.status ?? "alpha"; // default kalau null
                summary[status] = (summary[status] || 0) + 1;
                summary.detail.push({
                    tanggal: a.tanggal,
                    status,
                    alasan: null,
                    aiComment: a.aiComment ?? "Belum ada analisis AI.",
                    aiTone: a.aiTone ?? "netral",
                    aiConfidence: a.aiConfidence ?? 0.1,
                });
            }
            // Izin
            for (const i of izins) {
                summary.izin += 1;
                summary.detail.push({
                    tanggal: i.tanggal,
                    status: "izin",
                    alasan: i.alasan,
                    aiComment: "Belum ada analisis AI.",
                    aiTone: "netral",
                    aiConfidence: 0.1,
                });
            }
            // Sortir berdasarkan tanggal
            summary.detail.sort((a, b) => a.tanggal.getTime() - b.tanggal.getTime());
            const key = santri.name ?? `User-${santri.id}`;
            rekap[key] = summary;
        }
        return { kelasId, bulan, tahun, rekap };
    }
}
//# sourceMappingURL=absensi.service.js.map