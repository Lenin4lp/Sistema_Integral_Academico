import { z } from "zod";

// ? Validacion para docentes

export const updateTeacherSchema = z.object({
  speciality: z
    .string()
    .min(5, {
      message: "La especialidad debe tener como mínimo 5 caracteres",
    })
    .max(30, {
      message: "La especialidad debe tener como máximo 30 caracteres",
    })
    .optional(),
});
