"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.degreeUpdateSchema = exports.degreeRegisterSchema = void 0;
const zod_1 = require("zod");
exports.degreeRegisterSchema = zod_1.z.object({
    degree_name: zod_1.z
        .string({
        required_error: "El nombre es requerido",
    })
        .min(5, {
        message: "El nombre de la carrera debe tener como mínimo 5 caracteres",
    })
        .max(30, {
        message: "El nombre de la carrera debe tener como máximo 30 caracteres",
    }),
    degree_duration: zod_1.z.number({
        required_error: "El número de semestres es requerido",
    }),
    degree_acronym: zod_1.z
        .string({
        required_error: "El acrónimo es requerido",
    })
        .max(3, {
        message: "El acrónimo debe tener como máximo 3 caracteres",
    })
        .min(2, {
        message: "El acrónimo debe tener como mínimo 2 caracteres",
    })
        .refine((value) => value === value.toUpperCase(), {
        message: "El acrónimo debe estar en mayúscula",
    }),
});
exports.degreeUpdateSchema = zod_1.z.object({
    degree_name: zod_1.z
        .string()
        .min(5, {
        message: "El nombre de la carrera debe tener como mínimo 5 caracteres",
    })
        .max(30, {
        message: "El nombre de la carrera debe tener como máximo 30 caracteres",
    })
        .optional(),
    degree_duration: zod_1.z.number().optional(),
    degree_acronym: zod_1.z
        .string()
        .max(3, {
        message: "El acrónimo debe tener como máximo 3 caracteres",
    })
        .min(2, {
        message: "El acrónimo debe tener como mínimo 2 caracteres",
    })
        .refine((value) => value === value.toUpperCase(), {
        message: "El acrónimo debe estar en mayúscula",
    })
        .optional(),
});
