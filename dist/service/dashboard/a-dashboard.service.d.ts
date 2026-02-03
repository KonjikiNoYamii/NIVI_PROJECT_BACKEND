import { AdminDashboardRepository } from "../../repository/dashboard/a-dashboard.repository";
export declare class AdminDashboardService {
    private repo;
    constructor(repo: AdminDashboardRepository);
    getDashboardAdmin(): Promise<{
        totalSantri: number;
        totalPengajar: number;
        totalAdmin: number;
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
//# sourceMappingURL=a-dashboard.service.d.ts.map