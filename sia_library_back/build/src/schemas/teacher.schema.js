"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTeacherSchema = void 0;
const zod_1 = require("zod");
exports.updateTeacherSchema = zod_1.z.object({
    speciality: zod_1.z
        .string()
        .min(5, {
        message: "La especialidad debe tener como mínimo 5 caracteres",
    })
        .max(30, {
        message: "La especialidad debe tener como máximo 30 caracteres",
    })
        .optional(),
});
