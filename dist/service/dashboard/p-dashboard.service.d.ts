import { DashboardRepository } from "../../repository/dashboard/p-dashboard.repository";
export declare class DashboardService {
    private repo;
    constructor(repo: DashboardRepository);
    getDashboardPengajar(pengajarId: number): Promise<{
        totalSantri: number;
        totalKelas: number;
        absensi: {
            hadir: number;
            izin: number;
            sakit: number;
            alpha: number;
        };
        tugasAktif: number;
        submissionMasuk: number;
        izinPending: number;
    }>;
}
//# sourceMappingURL=p-dashboard.service.d.ts.map