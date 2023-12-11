import { Model } from "sequelize-typescript";
import { User } from "./user.model";
export declare class Role extends Model {
    static STUDENT_ROLE: string;
    static TEACHER_ROLE: string;
    static ADMIN_ROLE: string;
    static SUPERADMIN_ROLE: string;
    role_id: number;
    role_name: string;
    role_description: string;
    static createDefaultRoles: () => Promise<void>;
    user: User[];
}
