import { Sequelize } from "sequelize-typescript";
import "dotenv/config";
export declare const connection: Sequelize;
export declare function connectionDB(): Promise<void>;
