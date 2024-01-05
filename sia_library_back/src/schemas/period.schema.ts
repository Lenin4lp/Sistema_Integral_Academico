import {z} from "zod";

// ? Validacion para periodos

export const registerPeriodSchema = z.object({
    period_name: z.string({required_error:"El nombre del periodo es requerido"}).min(14,{message:"El nombre del periodo debe tener como minimo 14 caracteres"}).max(16, {message:"El nombre del periodo debe tener como maximo 16 caracteres"}).refine((value) => /^\w{3}\d{4}-\w{3}\d{4}$/.test(value), {
        message: "El formato del periodo debe ser OCT2023-FEB2024",
      }),
    period_id: z.string({required_error:"El id del periodo es requerido"}).min(8, {message:"El id del periodo debe tener como minimo 8 caracteres"}).max(10, {message:"El id del periodo debe tener como maximo 10 caracteres"}).refine((value) => /^\d{4}-\d{4}$/.test(value), {
        message: "El formato del id del periodo debe ser 2023-2024",
      })
})

export const updatePeriodSchema = z.object({
    period_name: z.string().min(14,{message:"El nombre del periodo debe tener como minimo 14 caracteres"}).max(16, {message:"El nombre del periodo debe tener como maximo 16 caracteres"}).refine((value) => /^\w{3}\d{4}-\w{3}\d{4}$/.test(value), {
        message: "El formato del periodo debe ser OCT2023-FEB2024",
      }).optional(),
    period_id: z.string().min(8, {message:"El id del periodo debe tener como minimo 8 caracteres"}).max(10, {message:"El id del periodo debe tener como maximo 10 caracteres"}).refine((value) => /^\d{4}-\d{4}$/.test(value), {
        message: "El formato del id del periodo debe ser 2023-2024",
      }).optional()
})