import jwt from "jsonwebtoken";
import { errorResponse } from "../utils/response";
import config from "../utils/env";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return errorResponse(res, "Token tidak ditemukan!", 401);
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return errorResponse(res, "Token tidak valid!", 401);
    }
    try {
        const payload = jwt.verify(token, config.JWT_SECRET);
        req.user = payload;
        next();
    }
    catch (error) {
        return errorResponse(res, "Token tidak valid!", 401);
    }
};
//# sourceMappingURL=auth.middleware.js.map