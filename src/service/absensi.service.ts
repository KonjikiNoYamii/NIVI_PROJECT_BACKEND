import { AbsensiRepository } from "../repository/absensi.repository";
import { AbsensiSettingService } from "./absensiSetting.service";
import { StatusAbsensi } from "../../dist/generated";
import cron from "node-cron";
import { JadwalAbsensiRepository } from "../repository/jadwalAbsensi.repository";
import { AIAssistantService } from "./ai.assistant.service";

export class AbsensiService {
  constructor(
    private absensiRepo: AbsensiRepository,
    private settingService: AbsensiSettingService,
    private jadwalRepo: JadwalAbsensiRepository,
    private aiAssistantService: AIAssistantService,
  ) {}

  // ===============================
  // ABSEN HADIR / TELAT / DLL
  // ===============================
  async absenHadir(
    userId: number,
    kelasId: number,
    status: StatusAbsensi,
    jadwalId?: number,
  ) {
    const now = new Date();

    const setting = await this.settingService.getByKelas(kelasId);
    if (!setting) throw new Error("Admin belum mengatur absensi kelas");

    const jadwal = await this.jadwalRepo.findActiveSchedule(
      kelasId,
      now,
      jadwalId,
    );
    if (!jadwal) throw new Error("Tidak ada jadwal absensi aktif");

    const todayCount = await this.absensiRepo.countTodayByUser(userId);
    if (todayCount >= setting.maxAbsen) {
      throw new Error(
        `Absensi hari ini sudah mencapai batas (${setting.maxAbsen}x)`,
      );
    }

    // ✅ 1️⃣ SIMPAN ABSENSI
    const absensi = await this.absensiRepo.create({
      userId,
      kelasId,
      jadwalId: jadwal.id,
      status,
      tanggal: now,
    });

    // 🤖 2️⃣ PANGGIL AI (NON-BLOCKING)
    this.aiAssistantService.evaluateAbsensi(
      absensi.id,
      "santri"
    );
  }

  // ===============================
  // IZIN → ABSENSI (SETELAH DISETUJUI)
  // ===============================
  async absenIzinDariPersetujuan(
    userId: number,
    kelasId: number,
    tanggal: Date,
  ) {
    const setting = await this.settingService.getByKelas(kelasId);
    if (!setting) throw new Error("Setting absensi belum ada");

    // HITUNG NON-IZIN SAJA
    const nonIzinCount = await this.absensiRepo.countNonIzinAbsensiByTanggal(
      userId,
      tanggal,
    );
    if (nonIzinCount >= setting.maxAbsen) {
      throw new Error(
        `Izin ditolak otomatis: batas absensi (${setting.maxAbsen}) tercapai`,
      );
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
  getTodayByUser(userId: number) {
    return this.absensiRepo.getTodayByUser(userId);
  }

  getByUserId(userId: number) {
    return this.absensiRepo.getByUserId(userId);
  }

  getAll() {
    return this.absensiRepo.getAll();
  }

  async rekapBulananPerSantri(
  userId: number,
  bulan: string,
) {
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
  const absensi =
    await this.absensiRepo.getAbsensiByUserAndMonth(
      userId,
      start,
      end
    );

  // hitung status
  let hadir = 0;
  let izin = 0;
  let alpha = 0;

  absensi.forEach((a) => {
    if (a.status === StatusAbsensi.hadir) hadir++;
    if (a.status === StatusAbsensi.izin) izin++;
    if (a.status === StatusAbsensi.alpha) alpha++;
  });

  const total = absensi.length

  const persentaseHadir =
    total === 0 ? 0 : Math.round((hadir / total) * 100);

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

  // ===============================
  // UPDATE & DELETE
  // ===============================
  updateAbsensi(id: number, data: Partial<{ status: StatusAbsensi }>) {
    return this.absensiRepo.update(id, data);
  }

  deleteAbsensi(id: number) {
    return this.absensiRepo.delete(id);
  }

  getByKelas = async ({
    kelasId,
    page,
    limit,
    sort,
  }: {
    kelasId: number;
    page: number;
    limit: number;
    sort: "asc" | "desc";
  }) => {
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
  async generateDailyAbsensiStatus(
    userId: number,
    kelasId: number,
    tanggal: Date,
  ) {
    const setting = await this.settingService.getByKelas(kelasId);
    if (!setting?.maxAbsen) return;

    // Ambil semua jadwal untuk tanggal ini
    const jadwalHariIni = await this.jadwalRepo.getByKelasAndTanggal(
      kelasId,
      tanggal,
    );

    if (!jadwalHariIni || jadwalHariIni.length === 0) {
      // Hari ini tidak ada jadwal → tidak generate alpha
      console.log(
        `Tidak ada jadwal hari ini untuk kelasId=${kelasId}, tanggal=${tanggal.toISOString()}. Alpha tidak dibuat.`,
      );
      return;
    }

    // Hitung sisa slot alpha
    const absensiHariIni = await this.absensiRepo.countNonIzinAbsensiByTanggal(
      userId,
      tanggal,
    );
    const alphaCount = setting.maxAbsen - absensiHariIni;
    if (alphaCount <= 0) return;

    // Generate alpha per slot, jadwal di-rotasi
    for (let i = 0; i < alphaCount; i++) {
      const jadwal = jadwalHariIni[i % jadwalHariIni.length];
      if (!jadwal) continue; // aman, skip jika undefined (meski tidak akan terjadi)

      await this.absensiRepo.create({
        userId,
        kelasId,
        tanggal,
        jadwalId: jadwal.id,
        status: StatusAbsensi.alpha,
      });
    }

    console.log(
      `Generate ${alphaCount} alpha untuk userId=${userId}, kelasId=${kelasId}, tanggal=${tanggal.toISOString()}`,
    );
  }

  // ===============================
  // GENERATE ALPHA UNTUK SEMUA USER DAN KELAS
  // ===============================
  async generateAlphaForAll(date: Date) {
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

  // Cron default tiap jam 00:00
  startCronDaily() {
    cron.schedule("0 0 * * *", async () => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() - 1);
      targetDate.setHours(0, 0, 0, 0);

      console.log(
        "[CRON] Generate alpha untuk tanggal:",
        targetDate.toISOString(),
      );

      await this.generateAlphaForAll(targetDate);
    });

    console.log("[CRON] Alpha harian aktif (00:00 server time)");
  }

  // ================================
  // TEST MANUAL (tanpa cron)
  // ================================
  async testGenerateAlphaForDate(tanggal: Date) {
    console.log("=== Mulai generate alpha manual ===");
    await this.generateAlphaForAll(tanggal);
    console.log("=== Selesai generate alpha manual ===");
  }
}
