import { PrismaClient, Izin } from "../../dist/generated";

export class IzinRepository {
  constructor(private prisma: PrismaClient) {}

  // GET ALL IZIN
  getAll = async (): Promise<Izin[]> => {
    return this.prisma.izin.findMany({
      where:{
        deletedAt:null
      },
      include: {
        user: true,
        kelas: true,
      },
    });
  };

    getAllByPengajar = async (pengajarId:number): Promise<Izin[]> => {
    return this.prisma.izin.findMany({
      where:{
        deletedAt:null,
        kelas:{
          pengajar:{
            some:{
              id:pengajarId
            }
          }
        }
      },
      include: {
        user: true,
        kelas: true,
      },
    });
  };

    getAllArchived = async (pengajarId:number) => {
  return this.prisma.izin.findMany({
    where: {
      deletedAt: {
        not: null,
      },
      kelas:{
        pengajar:{
          some:{
            id:pengajarId
          }
        }
      }
    },
    include: {
      user: true,
      kelas: true,
    },
    orderBy: {
      deletedAt: "desc",
    },
  });
};

softDelete = async(id: number) =>  {
  const izin = await this.prisma.izin.findUnique({ where: { id } });

  if (izin?.status === "menunggu") {
    throw new Error("Izin belum diproses");
  }

  return this.prisma.izin.update({
    where: { id },
    data: { deletedAt: new Date() },
  });
}

  // GET IZIN BY ID
  getById = async (id: number): Promise<Izin | null> => {
    return this.prisma.izin.findFirst({
      where: { id },
      include: {
        user: true,
        kelas: true,
      },
    });
  };

  // GET IZIN BY USER ID
  getByUserId = async (userId: number): Promise<Izin[]> => {
    return this.prisma.izin.findMany({
      where: { userId },
      include: {
        user: true,
        kelas: true,
      },
    });
  };

  // CREATE IZIN
  create = async (data: {
    userId: number;
    kelasId: number;
    tanggal: Date;
    alasan: string;
    status?: "menunggu" | "disetujui" | "ditolak";
  }): Promise<Izin> => {
    return this.prisma.izin.create({
      data: {
        ...data,
        status: data.status || "menunggu",
      },
      include: {
        user: true,
        kelas: true,
      },
    });
  };

  // UPDATE IZIN
  update = async (id: number, data: Partial<Izin>): Promise<Izin> => {
    return this.prisma.izin.update({
      where: { id },
      data,
      include: {
        user: true,
        kelas: true,
      },
    });
  };

  // DELETE IZIN
  delete = async (id: number): Promise<Izin> => {
    return this.prisma.izin.delete({
      where: { id },
    });
  };

  async findByUserAndDate(
    userId: number,
    kelasId: number,
    tanggal: Date,
    status?: "menunggu" | "disetujui" | "ditolak",
  ): Promise<Izin | null> {
    const query: any = {
      userId,
      kelasId,
      tanggal,
    };
    if (status) query.status = status;

    return this.prisma.izin.findFirst({ where: query });
  }

  async countMonthly(userId: number): Promise<number> {
    const start = new Date();
    start.setDate(1);
    start.setHours(0, 0, 0, 0);

    return this.prisma.izin.count({
      where: {
        userId,
        tanggal: {
          gte: start,
        },
      },
    });
  }

async getIzinByUserAndMonth(
  userId: number,
  start: Date,
  end: Date
): Promise<Izin[]> {
  return this.prisma.izin.findMany({
    where: { 
      userId, 
      tanggal: { gte: start, lte: end },
      status: "disetujui" 
    },
    orderBy: { tanggal: "asc" },
  });
}


}
