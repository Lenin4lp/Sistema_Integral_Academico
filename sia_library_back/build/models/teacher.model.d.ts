import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { Subject } from "./subject.model";
export declare class Teacher extends Model {
    teacher_id: string;
    speciality: string;
    user_id: string;
    subject: Subject[];
    user: User;
}
