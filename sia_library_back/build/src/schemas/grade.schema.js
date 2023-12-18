"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateGradeSchema = void 0;
const zod_1 = require("zod");
exports.updateGradeSchema = zod_1.z.object({
    grade_1: zod_1.z.number().optional(),
    grade_2: zod_1.z.number().optional(),
    test_1: zod_1.z.number().optional(),
    exam_1: zod_1.z.number().optional(),
    grade_3: zod_1.z.number().optional(),
    grade_4: zod_1.z.number().optional(),
    test_2: zod_1.z.number().optional(),
    exam_2: zod_1.z.number().optional(),
    prom_1: zod_1.z.number().optional(),
    prom_2: zod_1.z.number().optional(),
    status: zod_1.z.string().optional(),
    resit: zod_1.z.number().optional(),
    final_grade: zod_1.z.number().optional(),
});
