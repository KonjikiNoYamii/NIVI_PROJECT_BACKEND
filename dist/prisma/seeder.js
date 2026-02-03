import prisma from "../database";
async function resetData() {
    console.log('🧹 Menghapus data lama...');
    // Hapus data tabel yang bergantung dulu (Nilai -> Submission -> Tugas -> User)
    await prisma.absensi.deleteMany({});
    await prisma.izin.deleteMany({});
    await prisma.jadwalAbsensi.deleteMany({});
    // Opsional: hapus User, Kelas, dll jika mau reset total
    // await prisma.user.deleteMany({});
    // await prisma.kelas.deleteMany({});
    console.log('✅ Data berhasil di-reset');
}
resetData()
    .catch(e => console.error(e))
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=seeder.js.map