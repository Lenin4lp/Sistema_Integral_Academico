import { Model } from "sequelize-typescript";
import { ClassHours } from "./classHours.model";
export declare class Schedule extends Model {
    schedule_id: string;
    days: string[];
    classHours_id: number;
    classHours: ClassHours[];
    static automatizeScheduleId(schedule: Schedule): Promise<void>;
}
