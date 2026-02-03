import { AbsensiSettingRepository } from "../repository/absensiSetting.repository";
export declare class AbsensiSettingService {
    private repo;
    constructor(repo: AbsensiSettingRepository);
    getAll(): Promise<{
        id: number;
        kelasId: number;
        createdAt: Date;
        maxAbsen: number;
        updatedAt: Date;
    }[]>;
    getByKelas(kelasId: number): Promise<{
        id: number;
        kelasId: number;
        createdAt: Date;
        maxAbsen: number;
        updatedAt: Date;
    } | null>;
    createOrUpdate(kelasId: number, maxAbsen: number): Promise<{
        id: number;
        kelasId: number;
        createdAt: Date;
        maxAbsen: number;
        updatedAt: Date;
    }>;
    updateById(id: number, maxAbsen: number): Promise<{
        id: number;
        kelasId: number;
        createdAt: Date;
        maxAbsen: number;
        updatedAt: Date;
    }>;
}
//# sourceMappingURL=absensiSetting.service.d.ts.map