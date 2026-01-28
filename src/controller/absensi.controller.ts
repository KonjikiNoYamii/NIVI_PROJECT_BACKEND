import { Request, Response } from "express";
import { AbsensiService } from "../service/absensi.service";
import { StatusAbsensi } from "../../dist/generated";
import { successResponse, errorResponse } from "../utils/response";
import { io } from "../socket";
import { UserService } from "../service/user.service";

export class AbsensiController {
  constructor(
    private service: AbsensiService,
    private userService: UserService,
  ) {}

  // Tambahkan di AbsensiController.ts
  getAll = async (_req: Request, res: Response) => {
    try {
      const data = await this.service.getAll();
      successResponse(res, "Semua absensi", data);
    } catch (err: any) {
      errorResponse(res, err.message);
    }
  };

  getByUserId = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.id);
      const data = await this.service.getByUserId(userId);
      successResponse(res, `Absensi user ${userId}`, data);
    } catch (err: any) {
      errorResponse(res, err.message);
    }
  };

absen = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.user!.id);
    const { status, jadwalId } = req.body;

    // 1️⃣ Validasi status
    if (!Object.values(StatusAbsensi).includes(status as StatusAbsensi)) {
      throw new Error("Status tidak valid");
    }

    // 2️⃣ Ambil user
    const user = await this.userService.getById(userId);
    if (!user?.kelasId) {
      throw new Error("User belum punya kelas");
    }

    // 3️⃣ Pastikan kelasId selalu array
    const kelasIds: number[] = Array.isArray(user.kelasId)
      ? user.kelasId
      : [user.kelasId];

    if (kelasIds.length === 0) {
      throw new Error("User belum punya kelas");
    }

    // 4️⃣ Loop absen untuk semua kelas
    const dataResults = [];
    for (const kelasId of kelasIds) {
      // Absen hadir
      const data = await this.service.absenHadir(
        userId,
        kelasId,
        status as StatusAbsensi,
        jadwalId
      );
      dataResults.push(data);

      // Emit realtime update ke kelas
      const realtimeData = await this.service.getByKelas({
        kelasId,
        page: 1,
        limit: 100,
        sort: "desc",
      });
      io.to(`kelas-${kelasId}`).emit("absensi-update", realtimeData.data);

      // Emit ke user-specific room
      io.to(`user-${userId}`).emit("absensi-update", data);
    }

    successResponse(res, "Absen berhasil", dataResults, null, 201);
  } catch (err: any) {
    errorResponse(res, err.message);
  }
};



  getMyTodayAbsensi = async (req: Request, res: Response) => {
    try {
      const userId = Number(req.user!.id);
      const data = await this.service.getTodayByUser(userId);
      successResponse(res, "Absensi hari ini", data);
    } catch (err: any) {
      errorResponse(res, err.message);
    }
  };

  update = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      const data = await this.service.updateAbsensi(id, {
        status: status as StatusAbsensi,
      });

      successResponse(res, "Absensi diperbarui", data);
    } catch (err: any) {
      errorResponse(res, err.message);
    }
  };

  delete = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const data = await this.service.deleteAbsensi(id);
      successResponse(res, "Absensi dihapus", data);
    } catch (err: any) {
      errorResponse(res, err.message);
    }
  };

  getByKelas = async (req: Request, res: Response) => {
    try {
      const kelasId = Number(req.params.kelasId);
      const page = Number(req.query.page ?? 1);
      const limit = Number(req.query.limit ?? 20);
      const sort = req.query.sort === "asc" ? "asc" : "desc";

      const result = await this.service.getByKelas({
        kelasId,
        page,
        limit,
        sort,
      });

      res.json({
        success: true,
        ...result,
      });
    } catch (err: any) {
      res.status(400).json({
        success: false,
        message: err.message,
      });
    }
  };
  rekapBulananPerSantri = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { bulan } = req.query;

    if (!bulan) {
      throw new Error("Query bulan wajib (YYYY-MM)");
    }

    const data =
      await this.service.rekapBulananPerSantri(
        userId,
        String(bulan)
      );

    res.json({
      success: true,
      message: "Rekap bulanan santri berhasil",
      data,
    });
  } catch (err: any) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


}
