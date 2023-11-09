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
exports.connection = new sequelize_typescript_1.Sequelize({
    dialect: "mysql",
    host: "localhost",
    username: "root",
    password: process.env.DB_PASSWORD || "302816",
    database: "sia_library",
    port: 3306,
    models: [role_model_1.Role, user_model_1.User, student_model_1.Student, teacher_model_1.Teacher, admin_model_1.Admin, degree_model_1.Degree, subject_model_1.Subject, book_model_1.Book],
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
