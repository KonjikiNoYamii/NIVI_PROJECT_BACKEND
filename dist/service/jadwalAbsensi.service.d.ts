import { Hari, JadwalAbsensi } from "../../dist/generated";
import { AbsensiSettingRepository } from "../repository/absensiSetting.repository";
import { JadwalAbsensiRepository } from "../repository/jadwalAbsensi.repository";
export declare class JadwalAbsensiService {
    private repo;
    private settingRepo;
    constructor(repo: JadwalAbsensiRepository, settingRepo: AbsensiSettingRepository);
    create(data: {
        kelasId: number;
        hari: Hari;
        jamMulai: string;
        jamSelesai: string;
        tanggal: Date;
    }): Promise<{
        id: number;
        kelasId: number;
        tanggal: Date;
        createdAt: Date;
        hari: import("../../dist/generated").$Enums.Hari;
        jamMulai: string;
        jamSelesai: string;
    }>;
    createBulkJadwal: (kelasId: number, jamMulai: string, jamSelesai: string, tanggalMulai: Date, tanggalSelesai: Date) => Promise<import("../../dist/generated").Prisma.BatchPayload>;
    getAllByKelas: (kelasId: number, month?: number, year?: number) => Promise<JadwalAbsensi[]>;
    getById: (id: number) => Promise<JadwalAbsensi | null>;
    updateJadwal(id: number, data: Partial<JadwalAbsensi>): Promise<JadwalAbsensi>;
    deleteJadwal(id: number): Promise<{
        id: number;
        kelasId: number;
        tanggal: Date;
        createdAt: Date;
        hari: import("../../dist/generated").$Enums.Hari;
        jamMulai: string;
        jamSelesai: string;
    }>;
    hasScheduleOnDate(kelasId: number, date: Date): Promise<boolean>;
    private mapDayToEnum;
    getByKelasAndTanggal(kelasId: number, tanggal: Date, jamMulai?: string): Promise<JadwalAbsensi[]>;
}
//# sourceMappingURL=jadwalAbsensi.service.d.ts.map