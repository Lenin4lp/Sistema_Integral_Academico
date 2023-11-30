import { Model } from "sequelize-typescript";
import { User } from "./user.model";
import { Group } from "./group.model";
export declare class Teacher extends Model {
    teacher_id: string;
    speciality: string;
    user_id: string;
    group: Group[];
    user: User;
}
