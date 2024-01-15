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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const admin_model_1 = require("../models/admin.model");
const teacher_model_1 = require("../models/teacher.model");
const subject_model_1 = require("../models/subject.model");
const degree_model_1 = require("../models/degree.model");
const student_model_1 = require("../models/student.model");
const group_model_1 = require("../models/group.model");
const grades_model_1 = require("../models/grades.model");
const period_model_1 = require("../models/period.model");
//? Visualizar usuarios
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_model_1.User.findAll();
    res.json(users);
});
exports.getUsers = getUsers;
//? Obtener un solo usuario
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByPk(req.params.id, {
        include: [
            {
                model: student_model_1.Student,
                include: [
                    { model: degree_model_1.Degree },
                    {
                        model: grades_model_1.Grade,
                        include: [
                            {
                                model: group_model_1.Group,
                                include: [{ model: subject_model_1.Subject }, { model: period_model_1.Period }],
                            },
                        ],
                    },
                    { model: group_model_1.Group, include: [{ model: subject_model_1.Subject }, { model: period_model_1.Period }] },
                ],
            },
            { model: teacher_model_1.Teacher, include: [{ model: group_model_1.Group, include: [subject_model_1.Subject] }] },
            { model: admin_model_1.Admin },
        ],
    });
    if (!user)
        return res.status(404).json({ message: "User not found" });
    let roleTable;
    if (user.role_id === 1) {
        roleTable = yield student_model_1.Student.findOne({
            where: {
                student_id: user.user_id,
            },
            include: [
                { model: degree_model_1.Degree },
                {
                    model: grades_model_1.Grade,
                    include: [
                        { model: group_model_1.Group, include: [{ model: subject_model_1.Subject }, { model: period_model_1.Period }] },
                    ],
                },
                { model: group_model_1.Group, include: [{ model: subject_model_1.Subject }, { model: period_model_1.Period }] },
            ],
        });
    }
    else if (user.role_id === 2) {
        roleTable = yield teacher_model_1.Teacher.findOne({
            where: {
                teacher_id: user.user_id,
            },
            include: [group_model_1.Group],
        });
    }
    else if (user.role_id === 3) {
        roleTable = yield admin_model_1.Admin.findOne({
            where: {
                admin_id: user.user_id,
            },
        });
    }
    res.json({ user, roleTable });
});
exports.getUser = getUser;
//? Modificar usuario
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_name, user_lastname, user_email, user_password: user_password, user_ci, user_direction, user_Citizenship, user_phone, user_status, user_genre: genre, birth_date, } = req.body;
    const user = yield user_model_1.User.findByPk(req.params.id);
    if (user) {
        if (user_password) {
            const salt = yield bcryptjs_1.default.genSalt(10);
            const passwordHash = yield bcryptjs_1.default.hash(user_password, salt);
            yield user.update({
                user_name,
                user_lastname,
                user_email,
                user_password: passwordHash,
                user_ci,
                user_direction,
                user_Citizenship,
                user_phone,
                user_genre: genre,
                birth_date,
                updated_at: new Date(),
                user_status,
            });
        }
        else {
            // El password no se ha modificado, por lo que no es necesario actualizarlo
            yield user.update({
                user_name,
                user_lastname,
                user_email,
                user_ci,
                user_direction,
                user_Citizenship,
                user_phone,
                user_genre: genre,
                birth_date,
                user_status,
                updated_at: new Date(),
            });
        }
    }
    else {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});
exports.updateUser = updateUser;
//? Eliminar usuario
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByPk(req.params.id);
    if (user) {
        yield user.destroy();
        return res.sendStatus(204);
    }
    else {
        return res.status(404).json({ message: "User not found" });
    }
});
exports.deleteUser = deleteUser;
