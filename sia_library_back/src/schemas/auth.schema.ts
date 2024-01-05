import { z } from "zod";

// ? Validacion de autenticacion

export const registerSchema = z.object({
  user_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(3, {
      message: "Los nombres deben tener como mínimo 3 caracteres",
    })
    .max(40, {
      message: "Los nombres deben tener como máximo 40 caracteres",
    }),
  user_lastname: z
    .string({
      required_error: "El apellido es requerido",
    })
    .min(3, {
      message: "Los apellidos deben tener como mínimo 3 caracteres",
    })
    .max(40, {
      message: "Los apellidos deben tener como máximo 40 caracteres",
    }),
  user_email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .email({
      message: "Correo electrónico inválido",
    })
    .refine((value) => value.endsWith("@istvc.edu.ec"), {
      message: "Solo se permiten correos de tipo institucional",
    }),
  user_password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña de debe tener como mínimo 6 caracteres",
    }),
  user_ci: z
    .string()
    .min(9, {
      message: "La cédula debe tener como mínimo 9 caracteres",
    })
    .max(10, {
      message: "La cédula debe tener como máximo 10 caracteres",
    })
    .optional(),
  user_genre: z.enum(["Masculino", "Femenino", "Otros"]),
  user_direction: z
    .string()
    .max(80, {
      message: "La dirección debe tener como máximo 200 caracteres",
    })
    .min(4, {
      message: "La dirección debe tener como mínimo 4 caracteres",
    })
    .optional(),
  user_Citizenship: z
    .string({
      required_error: "La nacionalidad es requerida",
    })
    .max(50, {
      message: "La nacionalidad debe tener como máximo 50 caracteres",
    }),
  user_phone: z
    .string()
    .min(7, {
      message: "El teléfono debe tener como mínimo 7 caracteres",
    })
    .max(10, {
      message: "El teléfono debe tener como máximo 10 caracteres",
    })
    .optional(),
  birth_date: z
    .string()
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha de nacimiento inválida")
    .optional(),
  role_id: z.number({
    required_error: "El rol es requerido",
  }),
});

export const updateSchema = z.object({
  user_name: z
    .string()
    .min(3, {
      message: "El nombre debe tener como mínimo 3 caracteres",
    })
    .max(20, {
      message: "El nombre debe tener como máximo 20 caracteres",
    })
    .optional(),
  user_lastname: z
    .string()
    .min(3, {
      message: "El apellido debe tener como mínimo 3 caracteres",
    })
    .max(20, {
      message: "El apellido debe tener como máximo 20 caracteres",
    })
    .optional(),
  user_email: z
    .string()
    .email({
      message: "Correo electrónico inválido",
    })
    .refine((value) => value.endsWith("@istvc.edu.ec"), {
      message: "Solo se permiten correos de tipo institucional",
    })
    .optional(),
  user_password: z
    .string()
    .min(6, {
      message: "La contraseña de debe tener como mínimo 6 caracteres",
    })
    .optional(),
  user_ci: z
    .string()
    .min(10, {
      message: "La cédula debe tener como mínimo 10 caracteres",
    })
    .max(10, {
      message: "La cédula debe tener como máximo 10 caracteres",
    })
    .optional(),
  user_genre: z.enum(["Masculino", "Femenino", "Otros"]).optional(),
  user_direction: z
    .string()
    .max(80, {
      message: "La dirección debe tener como máximo 200 caracteres",
    })
    .min(4, {
      message: "La dirección debe tener como mínimo 4 caracteres",
    })
    .optional(),
  user_Citizenship: z
    .string()
    .max(50, {
      message: "La nacionalidad debe tener como máximo 50 caracteres",
    })
    .optional(),
  user_phone: z
    .string()
    .min(7, {
      message: "El teléfono debe tener como mínimo 7 caracteres",
    })
    .max(10, {
      message: "El teléfono debe tener como máximo 10 caracteres",
    })
    .optional(),
  birth_date: z
    .string()
    .refine((value) => {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      return regex.test(value);
    }, "Fecha de nacimiento inválida")
    .optional(),
});

export const loginSchema = z.object({
  user_email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .email({
      message: "Correo electrónico inválido",
    })
    .refine((value) => value.endsWith("@istvc.edu.ec"), {
      message: "Solo se permiten correos de tipo institucional",
    }),
  user_password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener como mínimo 6 caracteres",
    }),
});
