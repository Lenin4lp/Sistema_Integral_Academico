import { z } from "zod";
export declare const degreeRegisterSchema: z.ZodObject<{
    degree_name: z.ZodString;
    degree_duration: z.ZodNumber;
    degree_acronym: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    degree_name: string;
    degree_duration: number;
    degree_acronym: string;
}, {
    degree_name: string;
    degree_duration: number;
    degree_acronym: string;
}>;
export declare const degreeUpdateSchema: z.ZodObject<{
    degree_name: z.ZodOptional<z.ZodString>;
    degree_duration: z.ZodOptional<z.ZodNumber>;
    degree_acronym: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    degree_name?: string | undefined;
    degree_duration?: number | undefined;
    degree_acronym?: string | undefined;
}, {
    degree_name?: string | undefined;
    degree_duration?: number | undefined;
    degree_acronym?: string | undefined;
}>;
