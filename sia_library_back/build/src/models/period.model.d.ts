import { Model } from "sequelize-typescript";
import { Group } from "./group.model";
export declare class Period extends Model {
    period_id: string;
    period_name: string;
    group: Group[];
}
