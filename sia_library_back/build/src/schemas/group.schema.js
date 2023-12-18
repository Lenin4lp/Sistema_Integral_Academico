"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignStudentToSubjectSchema = exports.updateGroupSchema = exports.registerGroupSchema = void 0;
const zod_1 = require("zod");
const grupoPattern = /^Grupo \d+$/;
exports.registerGroupSchema = zod_1.z.object({
    group_name: zod_1.z
        .string({
        required_error: "El nombre del grupo es requerido",
    })
        .min(5, {
        message: "El nombre del grupo debe tener como mínimo 5 caracteres",
    })
        .max(10, {
        message: "El nombre del grupo debe tener como máximo 10 caracteres",
    })
        .refine((value) => grupoPattern.test(value), {
        message: "El nombre del grupo debe tener el formato 'Grupo X'",
    }),
    subject_id: zod_1.z.string({
        required_error: "La materia es requerida",
    }),
    modality_id: zod_1.z.number({
        required_error: "La modalidad es requerida",
    }),
    period_id: zod_1.z.string({
        required_error: "El periodo es requerido",
    }),
    teacher_id: zod_1.z.string({
        required_error: "El docente es requerido",
    }),
});
exports.updateGroupSchema = zod_1.z.object({
    group_name: zod_1.z
        .string()
        .min(5, {
        message: "El nombre del grupo debe tener como mínimo 5 caracteres",
    })
        .max(10, {
        message: "El nombre del grupo debe tener como máximo 10 caracteres",
    })
        .refine((value) => grupoPattern.test(value), {
        message: "El nombre del grupo debe tener el formato 'Grupo X'",
    })
        .optional(),
    group_status: zod_1.z.boolean().optional(),
    teacher_id: zod_1.z.string().optional(),
});
exports.assignStudentToSubjectSchema = zod_1.z.object({
    student_id: zod_1.z.string({ required_error: "El estudiante es requerido" }),
});
