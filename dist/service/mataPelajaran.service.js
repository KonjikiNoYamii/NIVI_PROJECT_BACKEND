import { Prisma } from "../../dist/generated";
export class MataPelajaranService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    getAll = () => this.repo.getAll();
    getById = (id) => this.repo.getById(id);
    create = async (data) => {
        if (!data.nama) {
            throw new Error("Nama mata pelajaran wajib diisi");
        }
        if (!data.kode) {
            throw new Error("Kode mata pelajaran wajib diisi");
        }
        return this.repo.create(data);
    };
    update = async (id, data) => {
        return this.repo.update(id, data);
    };
    delete = async (id) => {
        try {
            return await this.repo.delete(id);
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === "P2003") {
                throw new Error("Mata pelajaran tidak dapat dihapus karena masih digunakan oleh tugas");
            }
            throw error;
        }
    };
}
//# sourceMappingURL=mataPelajaran.service.js.map