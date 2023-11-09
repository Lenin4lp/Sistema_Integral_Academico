import { Model } from "sequelize-typescript";
import { Teacher } from "./teacher.model";
import { Student } from "./student.model";
export declare class Subject extends Model {
    subject_id: string;
    subject_name: string;
    subject_acronym: string;
    syllabus: string;
    teacher_id: string;
    teacher: Teacher;
    students: Student[];
    static automatizeSubjectId(subject: Subject): Promise<void>;
}
