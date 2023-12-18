import { Model } from "sequelize-typescript";
import { Student } from "./student.model";
import { Subject } from "./subject.model";
import { Modality } from "./modality.model";
import { Period } from "./period.model";
import { Grade } from "./grades.model";
import { Teacher } from "./teacher.model";
export declare class Group extends Model {
    group_id: string;
    group_name: string;
    group_status: boolean;
    subject_id: string;
    modality_id: number;
    period_id: string;
    teacher_id: string;
    student: Student[];
    modality: Modality;
    subject: Subject;
    period: Period;
    grades: Grade[];
    teacher: Teacher;
    static createGroupUUID(group: Group): Promise<void>;
}
