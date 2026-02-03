import { StatusIzin } from "../../../dist/generated";
export class AdminDashboardRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getTotalSantri() {
        return this.prisma.user.count({
            where: { role: "santri", isActive: true },
        });
    }
    getTotalPengajar() {
        return this.prisma.user.count({
            where: { role: "pengajar", isActive: true },
        });
    }
    getTotalAdmin() {
        return this.prisma.user.count({
            where: { role: "admin", isActive: true },
        });
    }
    getTotalKelas() {
        return this.prisma.kelas.count();
    }
    getAbsensiHariIni(today) {
        const start = new Date(today);
        start.setHours(0, 0, 0, 0);
        const end = new Date(today);
        end.setHours(23, 59, 59, 999);
        return this.prisma.absensi.groupBy({
            by: ["status"],
            where: {
                tanggal: { gte: start, lte: end },
            },
            _count: { _all: true },
        });
    }
    getTugasAktif(today) {
        return this.prisma.tugas.count({
            where: {
                deadline: { gte: today },
            },
        });
    }
    getSubmissionMasukHariIni(today) {
        const start = new Date(today);
        start.setHours(0, 0, 0, 0);
        const end = new Date(today);
        end.setHours(23, 59, 59, 999);
        return this.prisma.submission.count({
            where: {
                submittedAt: { gte: start, lte: end },
            },
        });
    }
    getIzinPending() {
        return this.prisma.izin.count({
            where: { status: StatusIzin.menunggu },
        });
    }
}
//# sourceMappingURL=a-dashboard.repository.js.map