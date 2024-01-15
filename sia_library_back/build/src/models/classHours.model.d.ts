import { Model } from "sequelize-typescript";
import { Modality } from "./modality.model";
import { Schedule } from "./schedule.model";
export declare class ClassHours extends Model {
    classHours_id: number;
    hour: string;
    modality_id: number;
    modality: Modality;
    schedule: Schedule;
}
