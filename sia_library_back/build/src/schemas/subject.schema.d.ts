import { z } from "zod";
export declare const registerSubjectSchema: z.ZodObject<{
    subject_name: z.ZodString;
    subject_acronym: z.ZodEffects<z.ZodString, string, string>;
    syllabus: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    subject_name: string;
    subject_acronym: string;
    syllabus?: string | undefined;
}, {
    subject_name: string;
    subject_acronym: string;
    syllabus?: string | undefined;
}>;
export declare const updateSubjectSchema: z.ZodObject<{
    subject_name: z.ZodOptional<z.ZodString>;
    subject_acronym: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    syllabus: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    subject_name?: string | undefined;
    subject_acronym?: string | undefined;
    syllabus?: string | undefined;
}, {
    subject_name?: string | undefined;
    subject_acronym?: string | undefined;
    syllabus?: string | undefined;
}>;
