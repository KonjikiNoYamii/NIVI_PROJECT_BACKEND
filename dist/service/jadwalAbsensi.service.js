import { Hari } from "../../dist/generated";
export class JadwalAbsensiService {
    repo;
    settingRepo;
    constructor(repo, settingRepo) {
        this.repo = repo;
        this.settingRepo = settingRepo;
    }
    async create(data) {
        // 1️⃣ pastikan absensi setting ada
        const setting = await this.settingRepo.getByKelas(data.kelasId);
        if (!setting) {
            throw new Error('Absensi setting belum dibuat');
        }
        // 2️⃣ validasi max absen
        const totalJadwal = await this.repo.countByKelas(data.kelasId);
        if (totalJadwal >= setting.maxAbsen) {
            throw new Error(`Jumlah jadwal sudah mencapai batas maksimal (${setting.maxAbsen})`);
        }
        // 3️⃣ validasi bentrok jam
        const bentrok = await this.repo.findBentrok(data.kelasId, data.tanggal, data.jamMulai, data.jamSelesai);
        if (bentrok) {
            throw new Error('Jadwal bentrok dengan sesi lain');
        }
        // 4️⃣ create
        return this.repo.create(data);
    }
    createBulkJadwal = async (kelasId, jamMulai, jamSelesai, tanggalMulai, tanggalSelesai) => {
        for (let d = new Date(tanggalMulai); d <= tanggalSelesai; d.setDate(d.getDate() + 1)) {
            const exists = await this.repo.findByTanggal(kelasId, d);
            if (exists) {
                throw new Error(`Jadwal tanggal ${d.toISOString().split("T")[0]} sudah ada`);
            }
        }
        return this.repo.createBulk(kelasId, jamMulai, jamSelesai, tanggalMulai, tanggalSelesai);
    };
    getAllByKelas = async (kelasId, month, year) => {
        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0); // last day of month
            return this.repo.getAllByKelasInRange(kelasId, startDate, endDate);
        }
        return this.repo.getAllByKelas(kelasId);
    };
    getById = async (id) => {
        return this.repo.getById(id);
    };
    async updateJadwal(id, data) {
        const jadwal = await this.repo.getById(id);
        if (!jadwal) {
            throw new Error("Jadwal tidak ditemukan");
        }
        const totalAbsensi = await this.repo.countAbsensiByTanggalDanKelas(jadwal.kelasId, jadwal.tanggal);
        if (totalAbsensi > 0) {
            if (data.tanggal || data.kelasId || data.hari) {
                throw new Error("Jadwal sudah digunakan absensi, hanya jam yang boleh diubah");
            }
        }
        if (totalAbsensi === 0 && data.tanggal) {
            const oldDate = jadwal.tanggal.toDateString();
            const newDate = data.tanggal.toDateString();
            if (oldDate !== newDate) {
                const exists = await this.repo.findByTanggal(jadwal.kelasId, data.tanggal);
                if (exists && exists.id !== id) {
                    throw new Error("Tanggal tersebut sudah memiliki jadwal");
                }
                data.hari = this.mapDayToEnum(data.tanggal);
            }
        }
        return this.repo.update(id, data);
    }
    async deleteJadwal(id) {
        const totalAbsensi = await this.repo.countByJadwalId(id);
        if (totalAbsensi > 0) {
            throw new Error("Jadwal tidak dapat dihapus karena sudah digunakan untuk absensi");
        }
        return this.repo.delete(id);
    }
    async hasScheduleOnDate(kelasId, date) {
        const normalizedDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        // 1️⃣ PRIORITAS: override tanggal
        const jadwalTanggal = await this.repo.findByTanggal(kelasId, normalizedDate);
        if (jadwalTanggal)
            return true;
        // 2️⃣ fallback: jadwal mingguan
        const hariEnum = this.mapDayToEnum(normalizedDate);
        const jadwalHari = await this.repo.findByHari(kelasId, hariEnum);
        return !!jadwalHari;
    }
    mapDayToEnum(date) {
        const map = [
            Hari.minggu,
            Hari.senin,
            Hari.selasa,
            Hari.rabu,
            Hari.kamis,
            Hari.jumat,
            Hari.sabtu,
        ];
        const dayIndex = date.getDay();
        const hari = map[dayIndex];
        if (!hari) {
            throw new Error("Hari tidak valid");
        }
        return hari;
    }
    getByKelasAndTanggal(kelasId, tanggal, jamMulai) {
        return this.repo.findByKelasAndTanggal(kelasId, tanggal, jamMulai);
    }
}
//# sourceMappingURL=jadwalAbsensi.service.js.map