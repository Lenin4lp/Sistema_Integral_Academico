import { z } from "zod";

// ? Validacion para notas

export const updateGradeSchema = z.object({
  grade_1: z.number().optional(),
  grade_2: z.number().optional(),
  test_1: z.number().optional(),
  exam_1: z.number().optional(),
  grade_3: z.number().optional(),
  grade_4: z.number().optional(),
  test_2: z.number().optional(),
  exam_2: z.number().optional(),
  prom_1: z.number().optional(),
  prom_2: z.number().optional(),
  status: z.string().optional(),
  resit: z.number().optional(),
  attendance_1: z.number().optional(),
  attendance_2: z.number().optional(),
  total_attendance: z.number().optional(),
  final_grade: z.number().optional(),
  total_resit: z.number().optional(),
});
