"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.updateSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
// ? Validacion de autenticacion
exports.registerSchema = zod_1.z.object({
    user_name: zod_1.z
        .string({
        required_error: "El nombre es requerido",
    })
        .min(3, {
        message: "Los nombres deben tener como mínimo 3 caracteres",
    })
        .max(40, {
        message: "Los nombres deben tener como máximo 40 caracteres",
    }),
    user_lastname: zod_1.z
        .string({
        required_error: "El apellido es requerido",
    })
        .min(3, {
        message: "Los apellidos deben tener como mínimo 3 caracteres",
    })
        .max(40, {
        message: "Los apellidos deben tener como máximo 40 caracteres",
    }),
    user_email: zod_1.z
        .string({
        required_error: "El correo electrónico es requerido",
    })
        .email({
        message: "Correo electrónico inválido",
    })
        .refine((value) => value.endsWith("@istvc.edu.ec"), {
        message: "Solo se permiten correos de tipo institucional",
    }),
    user_password: zod_1.z
        .string({
        required_error: "La contraseña es requerida",
    })
        .min(6, {
        message: "La contraseña de debe tener como mínimo 6 caracteres",
    }),
    user_ci: zod_1.z
        .string()
        .min(9, {
        message: "La cédula debe tener como mínimo 9 caracteres",
    })
        .max(10, {
        message: "La cédula debe tener como máximo 10 caracteres",
    })
        .optional(),
    user_genre: zod_1.z.enum(["Masculino", "Femenino", "Otros"]),
    user_direction: zod_1.z
        .string()
        .max(80, {
        message: "La dirección debe tener como máximo 200 caracteres",
    })
        .min(4, {
        message: "La dirección debe tener como mínimo 4 caracteres",
    })
        .optional(),
    user_Citizenship: zod_1.z
        .string({
        required_error: "La nacionalidad es requerida",
    })
        .max(50, {
        message: "La nacionalidad debe tener como máximo 50 caracteres",
    }),
    user_phone: zod_1.z
        .string()
        .min(7, {
        message: "El teléfono debe tener como mínimo 7 caracteres",
    })
        .max(10, {
        message: "El teléfono debe tener como máximo 10 caracteres",
    })
        .optional(),
    birth_date: zod_1.z
        .string()
        .refine((value) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(value);
    }, "Fecha de nacimiento inválida")
        .optional(),
    role_id: zod_1.z.number({
        required_error: "El rol es requerido",
    }),
});
exports.updateSchema = zod_1.z.object({
    user_name: zod_1.z
        .string()
        .min(3, {
        message: "El nombre debe tener como mínimo 3 caracteres",
    })
        .max(20, {
        message: "El nombre debe tener como máximo 20 caracteres",
    })
        .optional(),
    user_lastname: zod_1.z
        .string()
        .min(3, {
        message: "El apellido debe tener como mínimo 3 caracteres",
    })
        .max(20, {
        message: "El apellido debe tener como máximo 20 caracteres",
    })
        .optional(),
    user_email: zod_1.z
        .string()
        .email({
        message: "Correo electrónico inválido",
    })
        .refine((value) => value.endsWith("@istvc.edu.ec"), {
        message: "Solo se permiten correos de tipo institucional",
    })
        .optional(),
    user_password: zod_1.z
        .string()
        .min(6, {
        message: "La contraseña de debe tener como mínimo 6 caracteres",
    })
        .optional(),
    user_ci: zod_1.z
        .string()
        .min(10, {
        message: "La cédula debe tener como mínimo 10 caracteres",
    })
        .max(10, {
        message: "La cédula debe tener como máximo 10 caracteres",
    })
        .optional(),
    user_genre: zod_1.z.enum(["Masculino", "Femenino", "Otros"]).optional(),
    user_direction: zod_1.z
        .string()
        .max(80, {
        message: "La dirección debe tener como máximo 200 caracteres",
    })
        .min(4, {
        message: "La dirección debe tener como mínimo 4 caracteres",
    })
        .optional(),
    user_Citizenship: zod_1.z
        .string()
        .max(50, {
        message: "La nacionalidad debe tener como máximo 50 caracteres",
    })
        .optional(),
    user_phone: zod_1.z
        .string()
        .min(7, {
        message: "El teléfono debe tener como mínimo 7 caracteres",
    })
        .max(10, {
        message: "El teléfono debe tener como máximo 10 caracteres",
    })
        .optional(),
    birth_date: zod_1.z
        .string()
        .refine((value) => {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(value);
    }, "Fecha de nacimiento inválida")
        .optional(),
});
exports.loginSchema = zod_1.z.object({
    user_email: zod_1.z
        .string({
        required_error: "El correo electrónico es requerido",
    })
        .email({
        message: "Correo electrónico inválido",
    })
        .refine((value) => value.endsWith("@istvc.edu.ec"), {
        message: "Solo se permiten correos de tipo institucional",
    }),
    user_password: zod_1.z
        .string({
        required_error: "La contraseña es requerida",
    })
        .min(6, {
        message: "La contraseña debe tener como mínimo 6 caracteres",
    }),
});
