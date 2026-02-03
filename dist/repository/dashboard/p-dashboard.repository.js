import { StatusIzin, StatusSubmission } from "../../../dist/generated";
export class DashboardRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getTotalSantriByPengajar(kelasIds) {
        return this.prisma.user.count({
            where: {
                role: "santri",
                isActive: true,
                kelasId: { in: kelasIds },
            },
        });
    }
    async getTotalKelasByPengajar(pengajarId) {
        return this.prisma.kelas.count({
            where: {
                pengajar: {
                    some: { id: pengajarId },
                },
            },
        });
    }
    async getAbsensiHariIni(kelasIds, date) {
        if (kelasIds.length === 0)
            return [];
        const start = new Date(date);
        start.setHours(0, 0, 0, 0);
        const end = new Date(date);
        end.setHours(23, 59, 59, 999);
        return this.prisma.absensi.groupBy({
            by: ["status"],
            where: {
                user: {
                    role: "santri",
                    isActive: true
                },
                kelasId: { in: kelasIds },
                tanggal: {
                    gte: start,
                    lte: end,
                },
            },
            _count: {
                _all: true,
            },
        });
    }
    async getTugasAktif(kelasIds, today) {
        return this.prisma.tugas.count({
            where: {
                kelasId: { in: kelasIds },
                deadline: { gte: today },
            },
        });
    }
    async getSubmissionMasuk(kelasIds) {
        return this.prisma.submission.count({
            where: {
                user: {
                    role: "santri",
                    isActive: true
                },
                status: StatusSubmission.pending,
                tugas: {
                    kelasId: { in: kelasIds },
                },
            },
        });
    }
    async getIzinPending(kelasIds) {
        return this.prisma.izin.count({
            where: {
                kelasId: { in: kelasIds },
                status: StatusIzin.menunggu,
            },
        });
    }
    async getKelasIdsByPengajar(pengajarId) {
        const kelas = await this.prisma.kelas.findMany({
            where: {
                pengajar: {
                    some: { id: pengajarId },
                },
            },
            select: { id: true },
        });
        return kelas.map((k) => k.id);
    }
}
//# sourceMappingURL=p-dashboard.repository.js.map