import { Role } from "../../dist/generated";
import bcrypt from "bcrypt";
export class PengajarRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    getUserByEmail = async (email) => {
        return this.prisma.user.findUnique({ where: { email } });
    };
    createUser = async (data) => {
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: data.password,
                role: Role.pengajar,
            },
        });
    };
    hashPassword = async (password) => {
        return bcrypt.hash(password, 10);
    };
}
//# sourceMappingURL=pengajar.repository.js.map