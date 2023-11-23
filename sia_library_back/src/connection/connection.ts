import { Sequelize } from "sequelize-typescript";
import "dotenv/config";
import { Role } from "../models/role.model";
import { User } from "../models/user.model";
import { Student } from "../models/student.model";
import { Teacher } from "../models/teacher.model";
import { Admin } from "../models/admin.model";
import { Degree } from "../models/degree.model";
import { Subject } from "../models/subject.model";
import { Book } from "../models/book.model";
import { Group } from "../models/group.model";
import { Modality } from "../models/modality.model";
import { Period } from "../models/period.model";

export const connection = new Sequelize({
  dialect: "mysql",
  host: "localhost",
  username: "root",
  password: process.env.DB_PASSWORD || "302816",
  database: "sia_library",
  port: 3306,
  models: [
    Role,
    User,
    Modality,
    Student,
    Teacher,
    Admin,
    Degree,
    Subject,
    Period,
    Group,
    Book,
  ],
  sync: { force: true },
});

export async function connectionDB() {
  try {
    await connection.sync();
    console.log("Si funca");
  } catch (error) {
    console.log(error);
  }
}
