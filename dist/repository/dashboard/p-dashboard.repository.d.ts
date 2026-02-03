import { PrismaClient } from "../../../dist/generated";
export declare class DashboardRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    getTotalSantriByPengajar(kelasIds: number[]): Promise<number>;
    getTotalKelasByPengajar(pengajarId: number): Promise<number>;
    getAbsensiHariIni(kelasIds: number[], date: Date): Promise<(import("../../../dist/generated").Prisma.PickEnumerable<import("../../../dist/generated").Prisma.AbsensiGroupByOutputType, "status"[]> & {
        _count: {
            _all: number;
        };
    })[]>;
    getTugasAktif(kelasIds: number[], today: Date): Promise<number>;
    getSubmissionMasuk(kelasIds: number[]): Promise<number>;
    getIzinPending(kelasIds: number[]): Promise<number>;
    getKelasIdsByPengajar(pengajarId: number): Promise<number[]>;
}
//# sourceMappingURL=p-dashboard.repository.d.ts.map