import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { Degree } from "./degree.model";
import { Modality } from "./modality.model";
import { Grade } from "./grades.model";
import { Group } from "./group.model";
export declare class Student extends Model {
    student_id: string;
    user_id: string;
    degree_id: string;
    modality_id: number;
    group: Group[];
    grades: Grade[];
    user: User;
    degree: Degree;
    modality: Modality;
}
