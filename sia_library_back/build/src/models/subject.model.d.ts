import { Model } from "sequelize-typescript";
import { Group } from "./group.model";
export declare class Subject extends Model {
    subject_id: string;
    subject_name: string;
    subject_acronym: string;
    syllabus: string;
    group: Group[];
    static automatizeSubjectId(subject: Subject): Promise<void>;
}
