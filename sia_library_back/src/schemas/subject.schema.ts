import { z } from "zod";

export const registerSubjectSchema = z.object({
  subject_name: z
    .string({
      required_error: "El nombre de la materia es requerido",
    })
    .min(5, {
      message: "La materia debe tener como mínimo 5 caracteres",
    })
    .max(50, {
      message: "La materia debe tener como máximo 50 caracteres",
    }),
  
  subject_acronym: z
    .string({
      required_error: "El acrónimo es requerido",
    })
    .min(2, {
      message: "El acrónimo debe tener como mínimo 3 caracteres",
    })
    .max(3, {
      message: "El acrónimo debe tener como máximo 3 caracteres",
    })
    .refine((value) => value === value.toUpperCase(), {
      message: "El acrónimo debe estar en mayúscula",
    }),
    syllabus: z.string().min(10,{message:"El syllabus debe tener como mínimo 10 caracteres"}).max(100,{message:"El syllabus debe tener como máximo 100 caracteres"}).optional()
});

export const updateSubjectSchema = z.object({
  subject_name: z
    .string()
    .min(5, {
      message: "La materia debe tener como mínimo 5 caracteres",
    })
    .max(50, {
      message: "La materia debe tener como máximo 50 caracteres",
    })
    .optional(),
  subject_acronym: z
    .string()
    .min(2, {
      message: "El acrónimo debe tener como mínimo 3 caracteres",
    })
    .max(3, {
      message: "El acrónimo debe tener como máximo 3 caracteres",
    })
    .refine((value) => value === value.toUpperCase(), {
      message: "El acrónimo debe estar en mayúscula",
    })
    .optional(),
    syllabus: z.string().min(10,{message:"El syllabus debe tener como mínimo 10 caracteres"}).max(100,{message:"El syllabus debe tener como máximo 100 caracteres"}).optional()
});
