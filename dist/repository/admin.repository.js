import { Role } from "../../dist/generated";
export class AdminRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    // CREATE SANTRI
    createSantriByAdmin = async (data) => {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: Role.santri,
                kelasId: data.kelasId,
                password: "INACTIVE", // harus aktivasi
                activatedAt: null,
                isActive: true,
            },
        });
    };
    // CREATE PENGAJAR
    createPengajarByAdmin = async (data) => {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                role: Role.pengajar,
                password: "INACTIVE",
                activatedAt: null,
                isActive: true,
            },
        });
    };
    // FIND USER BY EMAIL
    findByEmail = async (email) => {
        return this.prisma.user.findUnique({ where: { email } });
    };
    // UPDATE PASSWORD (AKTIVASI PERTAMA)
    updatePassword = async (id, hashedPassword) => {
        return this.prisma.user.update({
            where: { id },
            data: {
                password: hashedPassword,
                activatedAt: new Date(),
            },
        });
    };
    // PENGAJAR / KELAS
    assignPengajar(kelasId, pengajarId) {
        return this.prisma.kelas.update({
            where: { id: kelasId },
            data: {
                pengajar: { connect: { id: pengajarId } },
            },
        });
    }
    removePengajar(kelasId, pengajarId) {
        return this.prisma.kelas.update({
            where: { id: kelasId },
            data: { pengajar: { disconnect: { id: pengajarId } } },
        });
    }
    getPengajarByKelas(kelasId) {
        return this.prisma.kelas.findUnique({
            where: { id: kelasId },
            select: {
                id: true,
                namaKelas: true,
                pengajar: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        profile: {
                            select: {
                                namaLengkap: true,
                                fotoUrl: true,
                            },
                        },
                    },
                },
            },
        });
    }
    createAdmin = async (data) => {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password, // sudah hashed di service
                role: Role.admin,
                isActive: true,
                activatedAt: new Date(),
            },
        });
    };
    getAllAdmins = async () => {
        return this.prisma.user.findMany({ where: { role: Role.admin } });
    };
    getAdminById = async (id) => {
        return this.prisma.user.findUnique({ where: { id } });
    };
    updateAdmin = async (id, data) => {
        return this.prisma.user.update({ where: { id }, data });
    };
    deleteAdmin = async (id) => {
        return this.prisma.user.delete({ where: { id } });
    };
}
//# sourceMappingURL=admin.repository.js.map