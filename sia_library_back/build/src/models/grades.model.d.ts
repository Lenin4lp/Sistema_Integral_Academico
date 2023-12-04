import { Model } from "sequelize-typescript";
import { Student } from "./student.model";
import { Group } from "./group.model";
export declare class Grade extends Model {
    grade_id: string;
    grade_1: number;
    grade_2: number;
    test_1: number;
    exam_1: number;
    prom_1: number;
    grade_3: number;
    grade_4: number;
    test_2: number;
    exam_2: number;
    prom_2: number;
    resit: number;
    final_grade: number;
    status: string;
    student_id: string;
    group_id: string;
    student: Student;
    group: Group;
    static automatizeGradeId(grade: Grade): Promise<void>;
    static updateProm(grade: Grade): Promise<void>;
    static updateFinalGrade(grade: Grade): Promise<void>;
}
