import {Sequelize} from "sequelize-typescript";
import "dotenv/config";

export const connection = new Sequelize({
    dialect:"mysql",
    host:"localhost",
    username:"root",
    password:process.env.DB_PASSWORD || "302816_istvc",
    database:"sia_library",
    port:3306,
    models:[],
    sync: {alter: true}
})

export async function connectionDB(){
    try{
        await connection.sync();
        console.log("Si funca");
    } catch(error){
        console.log(error);
    }
}