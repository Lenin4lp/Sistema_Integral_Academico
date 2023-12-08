import { z } from "zod";
export declare const updateTeacherSchema: z.ZodObject<{
    speciality: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    speciality?: string | undefined;
}, {
    speciality?: string | undefined;
}>;
