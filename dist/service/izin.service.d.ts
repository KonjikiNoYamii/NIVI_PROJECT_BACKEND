import { IzinRepository } from "../repository/izin.repository";
import { Izin, StatusIzin } from "../../dist/generated";
import { AbsensiService } from "./absensi.service";
import { AbsensiSettingService } from "./absensiSetting.service";
import { AbsensiRepository } from "../repository/absensi.repository";
import { JadwalAbsensiRepository } from "../repository/jadwalAbsensi.repository";
export declare class IzinService {
    private izinRepo;
    private absensiRepo;
    private absensiService;
    private settingService;
    private jadwalAbsensiRepo;
    constructor(izinRepo: IzinRepository, absensiRepo: AbsensiRepository, absensiService: AbsensiService, settingService: AbsensiSettingService, jadwalAbsensiRepo: JadwalAbsensiRepository);
    getAll: () => Promise<{
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    }[]>;
    getAllByPengajar: (pengajarId: number) => Promise<{
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    }[]>;
    getAllArchived: (pengajarId: number) => Promise<({
        user: {
            name: string | null;
            id: number;
            kelasId: number | null;
            createdAt: Date;
            email: string;
            password: string | null;
            activatedAt: Date | null;
            isActive: boolean;
            otp: string | null;
            otpExpiresAt: Date | null;
            role: import("../../dist/generated").$Enums.Role;
            deletedAt: Date | null;
        };
        kelas: {
            id: number;
            namaKelas: string;
            deskripsi: string | null;
        };
    } & {
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    })[]>;
    softDelete: (id: number) => Promise<{
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    }>;
    getById(id: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    } | null>;
    getByUserId(userId: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    }[]>;
    createIzin(data: {
        userId: number;
        kelasId: number;
        tanggal: Date;
        alasan: string;
    }): Promise<Izin>;
    updateIzinStatus(izinId: number, status: StatusIzin): Promise<Izin>;
    deleteIzin(id: number): Promise<{
        id: number;
        userId: number;
        kelasId: number;
        tanggal: Date;
        status: import("../../dist/generated").$Enums.StatusIzin;
        createdAt: Date;
        deletedAt: Date | null;
        alasan: string;
    }>;
}
//# sourceMappingURL=izin.service.d.ts.map