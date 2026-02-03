import { AbsensiRepository } from "../repository/absensi.repository";
import { AbsensiSettingService } from "./absensiSetting.service";
import { StatusAbsensi } from "../../dist/generated";
import { JadwalAbsensiRepository } from "../repository/jadwalAbsensi.repository";
import { AIAssistantService } from "./ai.assistant.service";
import { IzinRepository } from "../repository/izin.repository";
export declare class AbsensiService {
    private absensiRepo;
    private settingService;
    private jadwalRepo;
    private aiAssistantService;
    private IzinRepo;
    constructor(absensiRepo: AbsensiRepository, settingService: AbsensiSettingService, jadwalRepo: JadwalAbsensiRepository, aiAssistantService: AIAssistantService, IzinRepo: IzinRepository);
    absenHadir(userId: number, kelasId: number, status: StatusAbsensi, jadwalId?: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }>;
    absenIzinDariPersetujuan(userId: number, kelasId: number, tanggal: Date): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }>;
    getTodayByUser(userId: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }[]>;
    getByUserId(userId: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }[]>;
    getAll(): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }[]>;
    updateAbsensi(id: number, data: Partial<{
        status: StatusAbsensi;
    }>): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }>;
    deleteAbsensi(id: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        jadwalId: number | null;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusAbsensi;
        createdAt: Date;
        aiComment: string | null;
        aiTone: string | null;
        aiConfidence: number | null;
    }>;
    getByKelas: ({ kelasId, page, limit, sort, }: {
        kelasId: number;
        page: number;
        limit: number;
        sort: "asc" | "desc";
    }) => Promise<{
        data: {
            id: number;
            userId: number;
            kelasId: number;
            jadwalId: number | null;
            tanggal: Date;
            status: import("../../dist/generated").$Enums.StatusAbsensi;
            createdAt: Date;
            aiComment: string | null;
            aiTone: string | null;
            aiConfidence: number | null;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPage: number;
        };
    }>;
    parseJam(jamSelesai: string): {
        jam: number;
        menit: number;
    } | null;
    generateDailyAbsensiStatus(userId: number, kelasId: number, tanggal: Date): Promise<void>;
    generateAlphaForAll(date: Date): Promise<void>;
    generateAlphaRealtimePerUser(userId: number, kelasId: number, maxAbsen: number, now: Date): Promise<void>;
    generateAlphaRealtime(now: Date): Promise<void>;
    startCronRealtime(): void;
    testGenerateAlphaForDate(tanggal: Date): Promise<void>;
    rekapBulananPerSantri(userId: number, bulan: string): Promise<{
        userId: number;
        bulan: string;
        hadir: number;
        izin: number;
        alpha: number;
        total: number;
        persentaseHadir: number;
    }>;
    rekapMingguanPerSantri(userId: number, minggu: string): Promise<{
        userId: number;
        minggu: string;
        hadir: number;
        izin: number;
        alpha: number;
        total: number;
        persentaseHadir: number;
    }>;
    getRekapBulanan(kelasId: number, bulan: number, tahun: number): Promise<{
        kelasId: number;
        bulan: number;
        tahun: number;
        rekap: Record<string, {
            hadir: number;
            sakit: number;
            izin: number;
            alpha: number;
            total: number;
            detail: {
                tanggal: Date;
                status: string;
                alasan?: string | null;
                aiComment: string;
                aiTone: string;
                aiConfidence: number;
            }[];
        }>;
    }>;
}
//# sourceMappingURL=absensi.service.d.ts.map