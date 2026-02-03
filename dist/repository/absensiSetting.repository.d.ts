import { PrismaClient, AbsensiSetting } from "../../dist/generated";
export declare class AbsensiSettingRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    getByKelas(kelasId: number): Promise<AbsensiSetting | null>;
    create(kelasId: number, maxAbsen: number): Promise<AbsensiSetting>;
    updateByKelas(kelasId: number, maxAbsen: number): Promise<AbsensiSetting>;
    updateById(id: number, maxAbsen: number): Promise<AbsensiSetting>;
    getAll(): Promise<AbsensiSetting[]>;
}
//# sourceMappingURL=absensiSetting.repository.d.ts.map