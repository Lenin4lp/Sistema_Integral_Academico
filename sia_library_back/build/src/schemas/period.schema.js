"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePeriodSchema = exports.registerPeriodSchema = void 0;
const zod_1 = require("zod");
exports.registerPeriodSchema = zod_1.z.object({
    period_name: zod_1.z.string({ required_error: "El nombre del periodo es requerido" }).min(14, { message: "El nombre del periodo debe tener como minimo 14 caracteres" }).max(16, { message: "El nombre del periodo debe tener como maximo 16 caracteres" }).refine((value) => /^\w{3}\d{4}-\w{3}\d{4}$/.test(value), {
        message: "El formato del periodo debe ser OCT2023-FEB2024",
    }),
    period_id: zod_1.z.string({ required_error: "El id del periodo es requerido" }).min(8, { message: "El id del periodo debe tener como minimo 8 caracteres" }).max(10, { message: "El id del periodo debe tener como maximo 10 caracteres" }).refine((value) => /^\d{4}-\d{4}$/.test(value), {
        message: "El formato del id del periodo debe ser 2023-2024",
    })
});
exports.updatePeriodSchema = zod_1.z.object({
    period_name: zod_1.z.string().min(14, { message: "El nombre del periodo debe tener como minimo 14 caracteres" }).max(16, { message: "El nombre del periodo debe tener como maximo 16 caracteres" }).refine((value) => /^\w{3}\d{4}-\w{3}\d{4}$/.test(value), {
        message: "El formato del periodo debe ser OCT2023-FEB2024",
    }).optional(),
    period_id: zod_1.z.string().min(8, { message: "El id del periodo debe tener como minimo 8 caracteres" }).max(10, { message: "El id del periodo debe tener como maximo 10 caracteres" }).refine((value) => /^\d{4}-\d{4}$/.test(value), {
        message: "El formato del id del periodo debe ser 2023-2024",
    }).optional()
});
