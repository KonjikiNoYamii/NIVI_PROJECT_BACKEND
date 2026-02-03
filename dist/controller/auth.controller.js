import { successResponse } from "../utils/response";
export class AuthController {
    service;
    constructor(service) {
        this.service = service;
    }
    login = async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const result = await this.service.login(email, password);
            return successResponse(res, "Login berhasil", result);
        }
        catch (err) {
            next(err);
        }
    };
    requestActivationOtp = async (req, res, next) => {
        try {
            const { email } = req.body;
            const result = await this.service.requestActivationOtp(email);
            return successResponse(res, "OTP aktivasi terkirim", result);
        }
        catch (err) {
            next(err);
        }
    };
    activateWithOtp = async (req, res, next) => {
        try {
            const { email, otp, password } = req.body;
            const user = await this.service.activateWithOtp(email, otp, password);
            return successResponse(res, "Akun berhasil diaktivasi", { id: user.id, email: user.email });
        }
        catch (err) {
            next(err);
        }
    };
    forgotPassword = async (req, res, next) => {
        try {
            const { email } = req.body;
            const result = await this.service.forgotPassword(email);
            return successResponse(res, "OTP reset password dikirim", result);
        }
        catch (err) {
            next(err);
        }
    };
    resetPassword = async (req, res, next) => {
        try {
            const { email, otp, newPassword } = req.body;
            const result = await this.service.resetPassword(email, otp, newPassword);
            return successResponse(res, "Password berhasil direset", result);
        }
        catch (err) {
            next(err);
        }
    };
}
//# sourceMappingURL=auth.controller.js.map