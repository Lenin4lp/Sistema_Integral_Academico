import { Model } from "sequelize-typescript";
import { Student } from "./student.model";
import { Book } from "./book.model";
import { Modality } from "./modality.model";
export declare class Degree extends Model {
    degree_id: string;
    degree_name: string;
    degree_duration: number;
    degree_acronym: string;
    student: Student[];
    modality: Modality[];
    book: Book[];
    static automatizeDegreeId(degree: Degree): Promise<void>;
}
