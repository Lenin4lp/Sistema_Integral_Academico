import { Model } from "sequelize-typescript";
import { Degree } from "./degree.model";
export declare class Book extends Model {
    book_id: string;
    book_name: string;
    book_author: string;
    book_year: string;
    book_edition: string;
    book_editorial: string;
    book_url: string;
    book_classification: number;
    book_cover: string;
    degree_id: string;
    degree: Degree;
    static automatizeCreation(book: Book): Promise<void>;
}
