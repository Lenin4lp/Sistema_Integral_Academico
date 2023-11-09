import { z } from "zod";
export declare const registerSchema: z.ZodObject<{
    user_name: z.ZodString;
    user_lastname: z.ZodString;
    user_email: z.ZodEffects<z.ZodString, string, string>;
    user_password: z.ZodString;
    user_ci: z.ZodOptional<z.ZodString>;
    user_genre: z.ZodEnum<["Masculino", "Femenino", "Otros"]>;
    user_direction: z.ZodOptional<z.ZodString>;
    user_Citizenship: z.ZodString;
    user_phone: z.ZodOptional<z.ZodString>;
    birth_date: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    role_id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    user_name: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
    user_Citizenship: string;
    user_genre: "Masculino" | "Femenino" | "Otros";
    role_id: number;
    user_ci?: string | undefined;
    user_direction?: string | undefined;
    user_phone?: string | undefined;
    birth_date?: string | undefined;
}, {
    user_name: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
    user_Citizenship: string;
    user_genre: "Masculino" | "Femenino" | "Otros";
    role_id: number;
    user_ci?: string | undefined;
    user_direction?: string | undefined;
    user_phone?: string | undefined;
    birth_date?: string | undefined;
}>;
export declare const updateSchema: z.ZodObject<{
    user_name: z.ZodOptional<z.ZodString>;
    user_lastname: z.ZodOptional<z.ZodString>;
    user_email: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    user_password: z.ZodOptional<z.ZodString>;
    user_ci: z.ZodOptional<z.ZodString>;
    user_genre: z.ZodOptional<z.ZodEnum<["Masculino", "Femenino", "Otros"]>>;
    user_direction: z.ZodOptional<z.ZodString>;
    user_Citizenship: z.ZodOptional<z.ZodString>;
    user_phone: z.ZodOptional<z.ZodString>;
    birth_date: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    user_name?: string | undefined;
    user_lastname?: string | undefined;
    user_email?: string | undefined;
    user_password?: string | undefined;
    user_ci?: string | undefined;
    user_genre?: "Masculino" | "Femenino" | "Otros" | undefined;
    user_direction?: string | undefined;
    user_Citizenship?: string | undefined;
    user_phone?: string | undefined;
    birth_date?: string | undefined;
}, {
    user_name?: string | undefined;
    user_lastname?: string | undefined;
    user_email?: string | undefined;
    user_password?: string | undefined;
    user_ci?: string | undefined;
    user_genre?: "Masculino" | "Femenino" | "Otros" | undefined;
    user_direction?: string | undefined;
    user_Citizenship?: string | undefined;
    user_phone?: string | undefined;
    birth_date?: string | undefined;
}>;
export declare const loginSchema: z.ZodObject<{
    user_email: z.ZodEffects<z.ZodString, string, string>;
    user_password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    user_email: string;
    user_password: string;
}, {
    user_email: string;
    user_password: string;
}>;
