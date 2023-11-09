import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { Degree } from "./degree.model";
import { Subject } from "./subject.model";
export declare class Student extends Model {
    student_id: string;
    user_id: string;
    degree_id: string;
    user: User;
    degree: Degree;
    subjects: Subject[];
}
