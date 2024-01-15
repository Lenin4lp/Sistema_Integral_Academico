import { z } from "zod";
export declare const registerGroupSchema: z.ZodObject<{
    group_name: z.ZodEffects<z.ZodString, string, string>;
    subject_id: z.ZodString;
    modality_id: z.ZodNumber;
    period_id: z.ZodString;
    teacher_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    group_name: string;
    subject_id: string;
    modality_id: number;
    period_id: string;
    teacher_id: string;
}, {
    group_name: string;
    subject_id: string;
    modality_id: number;
    period_id: string;
    teacher_id: string;
}>;
export declare const updateGroupSchema: z.ZodObject<{
    group_name: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    group_status: z.ZodOptional<z.ZodBoolean>;
    teacher_id: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    group_name?: string | undefined;
    group_status?: boolean | undefined;
    teacher_id?: string | undefined;
}, {
    group_name?: string | undefined;
    group_status?: boolean | undefined;
    teacher_id?: string | undefined;
}>;
export declare const assignStudentToSubjectSchema: z.ZodObject<{
    student_id: z.ZodString;
}, "strip", z.ZodTypeAny, {
    student_id: string;
}, {
    student_id: string;
}>;
