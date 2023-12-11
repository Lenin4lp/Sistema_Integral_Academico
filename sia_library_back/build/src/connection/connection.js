"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionDB = exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
require("dotenv/config");
const role_model_1 = require("../models/role.model");
const user_model_1 = require("../models/user.model");
const student_model_1 = require("../models/student.model");
const teacher_model_1 = require("../models/teacher.model");
const admin_model_1 = require("../models/admin.model");
const degree_model_1 = require("../models/degree.model");
const subject_model_1 = require("../models/subject.model");
const book_model_1 = require("../models/book.model");
const group_model_1 = require("../models/group.model");
const modality_model_1 = require("../models/modality.model");
const period_model_1 = require("../models/period.model");
const grades_model_1 = require("../models/grades.model");
exports.connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "istvcedu_siav1",
    password: process.env.DB_PASSWORD,
    database: "istvcedu_siav1",
    port: 3306,
    models: [
        role_model_1.Role,
        user_model_1.User,
        modality_model_1.Modality,
        student_model_1.Student,
        teacher_model_1.Teacher,
        admin_model_1.Admin,
        degree_model_1.Degree,
        subject_model_1.Subject,
        period_model_1.Period,
        group_model_1.Group,
        grades_model_1.Grade,
        book_model_1.Book,
    ],
    sync: { alter: true },
});
function connectionDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.connection.sync();
            console.log("Si funca");
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.connectionDB = connectionDB;
