import { z } from "zod";
export declare const registerPeriodSchema: z.ZodObject<{
    period_name: z.ZodEffects<z.ZodString, string, string>;
    period_id: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    period_id: string;
    period_name: string;
}, {
    period_id: string;
    period_name: string;
}>;
export declare const updatePeriodSchema: z.ZodObject<{
    period_name: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    period_id: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
}, "strip", z.ZodTypeAny, {
    period_name?: string | undefined;
    period_id?: string | undefined;
}, {
    period_name?: string | undefined;
    period_id?: string | undefined;
}>;
