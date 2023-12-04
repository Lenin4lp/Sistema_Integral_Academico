import { Model } from "sequelize-typescript";
import { User } from "./user.model";
export declare class Admin extends Model {
    admin_id: string;
    user_id: string;
    user: User;
}
