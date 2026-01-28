import {
  PrismaClient,
  Absensi,
  StatusAbsensi,
  User,
} from "../../dist/generated";

export class AbsensiRepository {
  constructor(private prisma: PrismaClient) {}

  getAll(): Promise<Absensi[]> {
    return this.prisma.absensi.findMany({ include: { jadwal: true } });
  }

  getById(id: number): Promise<Absensi | null> {
    return this.prisma.absensi.findUnique({
      where: { id },
      include: { jadwal: true },
    });
  }

  getByUserId(userId: number): Promise<Absensi[]> {
    return this.prisma.absensi.findMany({
      where: { userId },
      include: { jadwal: true },
    });
  }

  getTodayByUser(userId: number): Promise<Absensi[]> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return this.prisma.absensi.findMany({
      where: { userId, tanggal: { gte: start, lte: end } },
      include: { jadwal: true },
    });
  }

  countTodayByUser(userId: number): Promise<number> {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    return this.prisma.absensi.count({
      where: { userId, tanggal: { gte: start, lte: end } },
    });
  }

  create(data: {
    userId: number;
    kelasId: number;
    jadwalId?: number;
    status: StatusAbsensi;
    tanggal: Date;
  }): Promise<Absensi> {
    return this.prisma.absensi.create({
      data: {
        ...data,
        jadwalId: data.jadwalId ?? null, // ganti undefined jadi null
      },
      include: { jadwal: true },
    });
  }

  update(id: number, data: Partial<Absensi>): Promise<Absensi> {
    return this.prisma.absensi.update({
      where: { id },
      data,
      include: { jadwal: true },
    });
  }

  delete(id: number): Promise<Absensi> {
    return this.prisma.absensi.delete({
      where: { id },
      include: { jadwal: true },
    });
  }

  findByUserAndTanggal(userId: number, tanggal: Date) {
    return this.prisma.absensi.findFirst({
      where: { userId, tanggal },
    });
  }

  createIzinAbsensi(userId: number, kelasId: number, tanggal: Date) {
    return this.prisma.absensi.create({
      data: {
        userId,
        kelasId, // ✅ INI YANG HILANG
        tanggal,
        status: "izin",
      },
    });
  }

  countTodayByKelas(kelasId: number, tanggal: Date) {
    return this.prisma.absensi.count({
      where: {
        kelasId,
        tanggal,
      },
    });
  }
  async countByKelasAndTanggal(
    kelasId: number,
    tanggal: Date,
  ): Promise<number> {
    const start = new Date(tanggal);
    start.setHours(0, 0, 0, 0);

    const end = new Date(tanggal);
    end.setHours(23, 59, 59, 999);

    return this.prisma.absensi.count({
      where: {
        kelasId,
        tanggal: {
          gte: start,
          lte: end,
        },
      },
    });
  }

  findByKelasPaginated = async ({
    kelasId,
    skip,
    take,
    sort,
  }: {
    kelasId: number;
    skip: number;
    take: number;
    sort: "asc" | "desc";
  }) => {
    return this.prisma.absensi.findMany({
      where: { kelasId },
      orderBy: { tanggal: sort },
      skip,
      take,
    });
  };

  countByKelas = async (kelasId: number) => {
    return this.prisma.absensi.count({
      where: { kelasId },
    });
  };

  async countUserAbsensiByTanggal(
    userId: number,
    tanggal: Date,
  ): Promise<number> {
    const start = new Date(tanggal);
    start.setHours(0, 0, 0, 0);
    const end = new Date(tanggal);
    end.setHours(23, 59, 59, 999);

    return this.prisma.absensi.count({
      where: {
        userId,
        tanggal: { gte: start, lte: end },
      },
    });
  }

  async countNonIzinAbsensiByTanggal(
    userId: number,
    tanggal: Date,
  ): Promise<number> {
    const start = new Date(tanggal);
    start.setHours(0, 0, 0, 0);
    const end = new Date(tanggal);
    end.setHours(23, 59, 59, 999);

    return this.prisma.absensi.count({
      where: {
        userId,
        status: { not: "izin" }, // Hitung hanya hadir/telat/dll
        tanggal: { gte: start, lte: end },
      },
    });
  }

  async getUsersByKelas(kelasId: number): Promise<User[]> {
    return this.prisma.user.findMany({
      where: {
        kelasId,
        role: "santri",
        isActive: true,
      },
    });
  }

  getByIdWithUser(id: number) {
    return this.prisma.absensi.findUnique({
      where: { id },
      include: { user: true },
    });
  }

  countMonthly(userId: number, month: number, year: number) {
    return this.prisma.absensi.count({
      where: {
        userId,
        status: "alpha",
        tanggal: {
          gte: new Date(year, month, 1),
          lt: new Date(year, month + 1, 1),
        },
      },
    });
  }

    async findLastByUser(userId: number) {
    return this.prisma.absensi.findFirst({
      where: { userId },
      orderBy: { tanggal: "desc" }, // ambil absensi terbaru
    });
  }
  

  updateAI(id: number, data: {
    aiComment: string;
    aiTone: string;
    aiConfidence: number;
  }) {
    return this.prisma.absensi.update({
      where: { id },
      data,
    });
  }
getAbsensiByUserAndMonth(
  userId: number,
  start: Date,
  end: Date
) {
  return this.prisma.absensi.findMany({
    where: {
      userId,
      tanggal: {
        gte: start,
        lte: end,
      },
    },
  });
}
getAbsensiByUserAndWeek (
  userId: number,
  start: Date,
  end: Date
){
  return this.prisma.absensi.findMany({
    where: {
      userId,
      tanggal: {
        gte: start,
        lte: end,
      },
    },
  });
}
}
