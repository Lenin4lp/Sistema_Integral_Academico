import { z } from "zod";

// ? Validacion para carreras

export const degreeRegisterSchema = z.object({
  degree_name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .min(5, {
      message: "El nombre de la carrera debe tener como mínimo 5 caracteres",
    })
    .max(30, {
      message: "El nombre de la carrera debe tener como máximo 30 caracteres",
    }),
  degree_duration: z.number({
    required_error: "El número de semestres es requerido",
  }),

  degree_acronym: z
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

export const degreeUpdateSchema = z.object({
  degree_name: z
    .string()
    .min(5, {
      message: "El nombre de la carrera debe tener como mínimo 5 caracteres",
    })
    .max(30, {
      message: "El nombre de la carrera debe tener como máximo 30 caracteres",
    })
    .optional(),
  degree_duration: z.number().optional(),

  degree_acronym: z
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
