import { Model } from "sequelize-typescript";
import { Degree } from "./degree.model";
import { Student } from "./student.model";
import { Group } from "./group.model";
import { ClassHours } from "./classHours.model";
export declare class Modality extends Model {
    static PRESENCIAL_MATUTINO: string;
    static PRESENCIAL_VESPERTINO: string;
    static VIRTUAL: string;
    static INTENSIVO: string;
    modality_id: number;
    modality_name: string;
    modality_schedule: string;
    degree: Degree[];
    student: Student[];
    group: Group[];
    classHours: ClassHours[];
    static createDefaultModalities: () => Promise<void>;
}
