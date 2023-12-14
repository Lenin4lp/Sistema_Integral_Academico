import { z } from "zod";

const grupoPattern = /^Grupo \d+$/;

export const registerGroupSchema = z.object({
  group_name: z
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
    subject_id: z.string({
        required_error: "La materia es requerida",
    }),
    modality_id: z.number({
        required_error: "La modalidad es requerida",
    }),
    period_id: z.string({
        required_error: "El periodo es requerido",
    }),
    teacher_id: z.string({
        required_error: "El docente es requerido",
    })
    
    
});

export const updateGroupSchema = z.object({
  group_name: z
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
    group_status: z.boolean().optional(),
    teacher_id: z.string().optional(),
});
