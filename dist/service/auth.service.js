import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomInt } from "crypto";
import sgMail from "@sendgrid/mail";
import config from "../utils/env";
export class AuthService {
    repo;
    constructor(repo) {
        this.repo = repo;
        sgMail.setApiKey(config.SENDGRID_API_KEY);
    }
    // LOGIN biasa
    async login(email, password) {
        const user = await this.repo.findByEmail(email);
        if (!user)
            throw new Error("User tidak ditemukan");
        if (user.password === "INACTIVE")
            return { status: "NEED_ACTIVATION", user };
        if (user.isActive === false) {
            throw new Error("Akun anda sudah tidak aktif!!");
        }
        const valid = await bcrypt.compare(password, user.password);
        if (!valid)
            throw new Error("Password salah");
        const token = jwt.sign({
            id: user.id,
            role: user.role,
            kelasId: user.kelasId ?? null,
        }, config.JWT_SECRET, { expiresIn: "7d" });
        return { status: "SUCCESS", token, user };
    }
    // Kirim OTP via SendGrid
    async sendEmailOtp(email, otp, purpose) {
        try {
            await sgMail.send({
                to: email,
                from: {
                    email: config.FROM_EMAIL, // contoh: no-reply@domainmu.com
                    name: "Sistem Autentikasi"
                },
                subject: "Kode Verifikasi Akun Anda",
                text: `
Kode OTP Anda: ${otp}

Gunakan kode ini untuk ${purpose}.
Kode berlaku selama 5 menit.

Jika Anda tidak merasa melakukan permintaan ini, abaikan email ini.
      `.trim(),
                html: `
<!DOCTYPE html>
<html>
  <body style="font-family: Arial, sans-serif; color: #333;">
    <h3>Kode Verifikasi Akun</h3>

    <p>Gunakan kode berikut untuk <b>${purpose}</b>:</p>

    <div style="
      font-size: 24px;
      font-weight: bold;
      letter-spacing: 4px;
      margin: 16px 0;
    ">
      ${otp}
    </div>

    <p>
      Kode ini berlaku selama <b>5 menit</b>.
    </p>

    <p style="font-size: 12px; color: #777;">
      Jika Anda tidak merasa melakukan permintaan ini, silakan abaikan email ini.
    </p>
  </body>
</html>
      `,
            });
        }
        catch (err) {
            console.error("SendGrid Error:", err);
            throw err;
        }
    }
    // REQUEST OTP AKTIVASI
    async requestActivationOtp(email) {
        const user = await this.repo.findByEmail(email);
        if (!user)
            throw new Error("User tidak ditemukan");
        if (user.password !== "INACTIVE")
            throw new Error("Akun sudah aktif");
        const otp = randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 menit
        await this.repo.setOtp(email, otp, otpExpires);
        await this.sendEmailOtp(email, otp, "aktivasi");
        return { message: "OTP dikirim ke email" };
    }
    async activateWithOtp(email, otp, password) {
        const user = await this.repo.findByEmail(email);
        if (!user)
            throw new Error("User tidak ditemukan");
        if (user.password !== "INACTIVE")
            throw new Error("Akun sudah aktif");
        if (user.otp !== otp)
            throw new Error("OTP salah");
        if (!user.otpExpiresAt || new Date() > user.otpExpiresAt)
            throw new Error("OTP sudah kadaluarsa");
        const hashed = await bcrypt.hash(password, 10);
        return this.repo.updatePassword(user.id, hashed);
    }
    // REQUEST OTP RESET PASSWORD
    async forgotPassword(email) {
        const user = await this.repo.findByEmail(email);
        if (!user)
            throw new Error("User tidak ditemukan");
        const otp = randomInt(100000, 999999).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000);
        await this.repo.setOtp(email, otp, otpExpires);
        await this.sendEmailOtp(email, otp, "reset-password");
        return { message: "OTP reset password dikirim ke email" };
    }
    async resetPassword(email, otp, newPassword) {
        const user = await this.repo.findByEmail(email);
        if (!user)
            throw new Error("User tidak ditemukan");
        if (user.otp !== otp)
            throw new Error("OTP salah");
        if (!user.otpExpiresAt || new Date() > user.otpExpiresAt)
            throw new Error("OTP sudah kadaluarsa");
        const hashed = await bcrypt.hash(newPassword, 10);
        return this.repo.updatePassword(user.id, hashed);
    }
}
//# sourceMappingURL=auth.service.js.map