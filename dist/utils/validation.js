import { validationResult } from "express-validator";
import { errorResponse } from "../utils/response";
export const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map((v) => v.run(req)));
        const errors = validationResult(req);
        if (errors.isEmpty())
            return next();
        const errorList = errors.array().map((err) => ({
            field: err.type === "field" ? err.path : "unknown",
            message: err.msg,
        }));
        return errorResponse(res, "Validasi gagal", 400, errorList);
    };
};
//# sourceMappingURL=validation.js.map