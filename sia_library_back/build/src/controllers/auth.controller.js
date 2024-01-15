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
exports.verifyToken = exports.logout = exports.login = exports.register = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../libs/jwt");
const student_model_1 = require("../models/student.model");
const teacher_model_1 = require("../models/teacher.model");
const admin_model_1 = require("../models/admin.model");
const config_1 = require("../config/config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const degree_model_1 = require("../models/degree.model");
const group_model_1 = require("../models/group.model");
const subject_model_1 = require("../models/subject.model");
const period_model_1 = require("../models/period.model");
const grades_model_1 = require("../models/grades.model");
// ? Registro de usuario
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_id, user_name, user_lastname, user_email, user_password, user_ci, user_direction, user_Citizenship, user_phone, user_status, user_genre: genre, birth_date, role_id, } = req.body;
    try {
        const userFound = yield user_model_1.User.findOne({
            where: {
                user_email: user_email,
            },
        });
        if (userFound)
            return res.status(400).json(["El usuario ya existe"]);
        const passwordHash = yield bcryptjs_1.default.hash(user_password, 10);
        const newUser = yield user_model_1.User.create({
            user_name,
            user_lastname,
            user_email,
            user_password: passwordHash,
            user_ci,
            user_status: true,
            user_direction: user_direction !== null && user_direction !== void 0 ? user_direction : "Pendiente",
            user_Citizenship,
            user_phone: user_phone !== null && user_phone !== void 0 ? user_phone : "Pendiente",
            user_genre: genre,
            birth_date: birth_date !== null && birth_date !== void 0 ? birth_date : "Pendiente",
            role_id,
        });
        if (newUser.role_id === 1) {
            // ! Ahorita no le voy a pedir un request pero lo voy a necesitar despues para la carrera y el grupo PILOTO!!!
            yield student_model_1.Student.create({
                user_id: newUser.user_id,
                student_id: newUser.user_id,
            });
        }
        else if (newUser.role_id === 2) {
            yield teacher_model_1.Teacher.create({
                user_id: newUser.user_id,
                teacher_id: newUser.user_id,
            });
        }
        else if (newUser.role_id === 3) {
            yield admin_model_1.Admin.create({
                user_id: newUser.user_id,
                admin_id: newUser.user_id,
            });
        }
        res.json({
            message: "Usuario registrado con exito",
            id: newUser.user_id,
            user_name: newUser.user_name,
            user_email: newUser.user_email,
            role_id: newUser.role_id,
            user_lastname: newUser.user_lastname,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.register = register;
// ? Login de usuario
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user_email, user_password } = req.body;
    try {
        const userFound = yield user_model_1.User.findOne({
            where: {
                user_email: user_email,
            },
        });
        if (!userFound)
            return res.status(400).json(["El usuario no existe"]);
        const isMatch = yield bcryptjs_1.default.compare(user_password, userFound.user_password);
        if (!isMatch)
            return res.status(400).json(["Contraseña incorrecta"]);
        if (userFound.user_status == false || userFound.user_status == null) {
            return res.status(400).json(["El usuario se encuentra inactivo"]);
        }
        const token = yield (0, jwt_1.createAccesToken)({
            id: userFound.user_id,
        });
        res.cookie("token", token);
        let roleTable;
        if (userFound.role_id === 1) {
            roleTable = yield student_model_1.Student.findOne({
                where: {
                    user_id: userFound.user_id,
                },
                include: [
                    { model: degree_model_1.Degree },
                    { model: grades_model_1.Grade },
                    {
                        model: group_model_1.Group,
                        include: [{ model: subject_model_1.Subject }, { model: period_model_1.Period }, { model: grades_model_1.Grade }],
                    },
                ],
            });
        }
        else if (userFound.role_id === 2) {
            roleTable = yield teacher_model_1.Teacher.findOne({
                where: {
                    user_id: userFound.user_id,
                },
                include: [
                    {
                        model: group_model_1.Group,
                        include: [
                            { model: subject_model_1.Subject },
                            { model: period_model_1.Period },
                            { model: teacher_model_1.Teacher, include: [{ model: user_model_1.User }] },
                            { model: student_model_1.Student, include: [{ model: user_model_1.User }, { model: degree_model_1.Degree }] },
                            {
                                model: grades_model_1.Grade,
                                include: [{ model: student_model_1.Student, include: [{ model: user_model_1.User }] }],
                            },
                            { model: student_model_1.Student, include: [{ model: user_model_1.User }] },
                        ],
                    },
                ],
            });
        }
        else if (userFound.role_id === 3) {
            roleTable = yield admin_model_1.Admin.findOne({
                where: {
                    user_id: userFound.user_id,
                },
            });
        }
        res.json({
            message: "Ingreso Exitoso",
            id: userFound.user_id,
            user_name: userFound.user_name,
            user_email: userFound.user_email,
            role_id: userFound.role_id,
            user_lastname: userFound.user_lastname,
            user_status: userFound.user_status,
            token,
            roleTable,
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.login = login;
// ? Logout
const logout = (req, res) => {
    if (!req.cookies.token)
        return res.status(401).json({ message: "No token" });
    res.cookie("token", "", {
        expires: new Date(0),
    });
    res.redirect("/");
    return res.sendStatus(200);
};
exports.logout = logout;
// ? Verificar Token
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { token } = req.cookies;
    if (!token)
        return res.status(401).json({ message: "Unauthorized" });
    jsonwebtoken_1.default.verify(token, config_1.TOKEN_SECRET, (error, user) => __awaiter(void 0, void 0, void 0, function* () {
        if (error)
            return res.status(401).json({ message: "Unauthorized" });
        const userFound = yield user_model_1.User.findByPk(user.id);
        if (!userFound)
            return res.status(401).json({ message: "Unauthorized" });
        let roleTable;
        if (userFound.role_id === 1) {
            roleTable = yield student_model_1.Student.findOne({
                where: {
                    user_id: userFound.user_id,
                },
                include: [
                    {
                        model: grades_model_1.Grade,
                        include: [
                            {
                                model: group_model_1.Group,
                                include: [{ model: subject_model_1.Subject }, { model: period_model_1.Period }],
                            },
                        ],
                    },
                    { model: degree_model_1.Degree },
                    {
                        model: group_model_1.Group,
                        include: [{ model: subject_model_1.Subject }, { model: period_model_1.Period }, { model: grades_model_1.Grade }],
                    },
                ],
            });
        }
        else if (userFound.role_id === 2) {
            roleTable = yield teacher_model_1.Teacher.findOne({
                where: {
                    user_id: userFound.user_id,
                },
                include: [
                    {
                        model: group_model_1.Group,
                        include: [
                            { model: subject_model_1.Subject },
                            { model: period_model_1.Period },
                            { model: teacher_model_1.Teacher, include: [{ model: user_model_1.User }] },
                            {
                                model: grades_model_1.Grade,
                                include: [
                                    {
                                        model: student_model_1.Student,
                                        include: [{ model: user_model_1.User }, { model: degree_model_1.Degree }],
                                    },
                                ],
                            },
                            { model: student_model_1.Student, include: [{ model: user_model_1.User }, { model: degree_model_1.Degree }] },
                        ],
                    },
                ],
            });
        }
        else if (userFound.role_id === 3) {
            roleTable = yield admin_model_1.Admin.findOne({
                where: {
                    user_id: userFound.user_id,
                },
            });
        }
        return res.json({
            user_id: userFound.user_id,
            user_name: userFound.user_name,
            user_lastname: userFound.user_lastname,
            role_id: userFound.role_id,
            user_email: userFound.user_email,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt,
            roleTable,
        });
    }));
});
exports.verifyToken = verifyToken;
