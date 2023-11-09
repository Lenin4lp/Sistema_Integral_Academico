import { Model } from "sequelize-typescript";
import { Role } from "./role.model";
import { Student } from "./student.model";
import { Teacher } from "./teacher.model";
import { Admin } from "./admin.model";
export declare class User extends Model {
    user_id: string;
    user_name: string;
    user_lastname: string;
    user_email: string;
    user_password: string;
    user_ci: string;
    user_direction: string;
    user_Citizenship: string;
    user_phone: string;
    user_genre: string;
    birth_date: string;
    role_id: number;
    static automatizeCreation(user: User): Promise<void>;
    role: Role;
    student: Student;
    teacher: Teacher;
    admin: Admin;
}
