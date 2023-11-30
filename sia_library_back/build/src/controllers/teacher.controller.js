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
exports.updateTeacher = exports.getTeacher = exports.getTeachers = void 0;
const teacher_model_1 = require("../models/teacher.model");
const subject_model_1 = require("../models/subject.model");
const user_model_1 = require("../models/user.model");
const group_model_1 = require("../models/group.model");
//? Obtener todos los docentes
const getTeachers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teachers = yield teacher_model_1.Teacher.findAll();
    res.json(teachers);
});
exports.getTeachers = getTeachers;
//? Obtener un docente
const getTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const teacher = yield teacher_model_1.Teacher.findByPk(req.params.id, {
        include: [{ model: group_model_1.Group, include: [{ model: subject_model_1.Subject }] }, { model: user_model_1.User }],
    });
    if (!teacher)
        return res.status(404).json(["No se encontró el docente"]);
    res.json(teacher);
});
exports.getTeacher = getTeacher;
//? Actualizar un docente
const updateTeacher = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { speciality } = req.body;
    const teacher = yield teacher_model_1.Teacher.findByPk(req.params.id);
    if (teacher) {
        yield teacher.update({
            speciality: speciality !== null && speciality !== void 0 ? speciality : "Pendiente",
        });
    }
    else {
        return res.status(404).json({ message: "No se encontró el docente" });
    }
    res.json(teacher);
});
exports.updateTeacher = updateTeacher;
