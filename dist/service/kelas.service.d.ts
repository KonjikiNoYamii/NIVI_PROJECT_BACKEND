import { Kelas } from "../../dist/generated";
import { KelasRepository } from "../repository/kelas.repository";
export declare class KelasService {
    private kelasRepository;
    constructor(kelasRepository: KelasRepository);
    getAllKelas: () => Promise<Kelas[]>;
    getAll: () => Promise<Kelas[]>;
    getAllSantri: () => Promise<Kelas[]>;
    getAllSantriByAdmin: () => Promise<Kelas[]>;
    getById: (id: number) => Promise<Kelas | null>;
    createKelas: (data: {
        namaKelas: string;
        deskripsi?: string;
    }) => Promise<Kelas>;
    updateKelas: (id: number, data: Partial<Kelas>) => Promise<Kelas>;
    deleteKelas: (id: number) => Promise<Kelas>;
    assignPengajarKeKelas: (kelasId: number, pengajarIds: number | number[]) => Promise<{
        pengajar: {
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
        }[];
    } & {
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }>;
    setPengajarKelas: (kelasId: number, pengajarIds: number[]) => Promise<{
        pengajar: {
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
        }[];
        santri: {
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
        }[];
    } & {
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    }>;
    getKelasByPengajar: (pengajarId: number) => Promise<({
        absensi: {
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
        izin: {
            id: number;
            userId: number;
            kelasId: number;
            tanggal: Date;
            status: import("../../dist/generated").$Enums.StatusIzin;
            createdAt: Date;
            deletedAt: Date | null;
            alasan: string;
        }[];
        pengajar: {
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
        }[];
        santri: ({
            profile: {
                fotoUrl: string | null;
            } | null;
        } & {
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
        })[];
        tugas: {
            id: number;
            kelasId: number;
            createdAt: Date;
            deletedAt: Date | null;
            mataPelajaranId: number;
            title: string;
            description: string | null;
            deadline: Date;
            createdBy: number;
        }[];
        absensiSetting: {
            id: number;
            kelasId: number;
            createdAt: Date;
            maxAbsen: number;
            updatedAt: Date;
        } | null;
        jadwal: {
            id: number;
            kelasId: number;
            tanggal: Date;
            createdAt: Date;
            hari: import("../../dist/generated").$Enums.Hari;
            jamMulai: string;
            jamSelesai: string;
        }[];
    } & {
        id: number;
        namaKelas: string;
        deskripsi: string | null;
    })[]>;
}
//# sourceMappingURL=kelas.service.d.ts.map