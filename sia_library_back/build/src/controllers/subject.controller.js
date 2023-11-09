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
exports.deleteSubject = exports.updateSubject = exports.createSubject = exports.getSubject = exports.getSubjects = void 0;
const subject_model_1 = require("../models/subject.model");
const teacher_model_1 = require("../models/teacher.model");
const user_model_1 = require("../models/user.model");
const student_model_1 = require("../models/student.model");
// ? Obtener todas las materias
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subjects = yield subject_model_1.Subject.findAll();
    res.json(subjects);
});
exports.getSubjects = getSubjects;
// ? Obtener una sola materia
const getSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subject_model_1.Subject.findByPk(req.params.id, {
        include: [{ model: teacher_model_1.Teacher, include: [{ model: user_model_1.User }] }, { model: student_model_1.Student, include: [{ model: user_model_1.User }] }],
    });
    if (!subject)
        return res.status(404).json({ message: "Subject not found" });
    res.json(subject);
});
exports.getSubject = getSubject;
// ? Crear una materia
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject_name, subject_acronym, syllabus, teacher_id } = req.body;
    try {
        const subjectFound = yield subject_model_1.Subject.findOne({
            where: { subject_name: subject_name },
        });
        if (subjectFound)
            return res.status(400).json({ message: "La materia ya existe" });
        const newSubject = yield subject_model_1.Subject.create({
            subject_name,
            syllabus,
            subject_acronym,
            teacher_id
        });
        res.json(newSubject);
    }
    catch (error) {
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createSubject = createSubject;
//? Actualizar una materia
const updateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { subject_name, syllabus, subject_acronym, teacher_id } = req.body;
    const subject = yield subject_model_1.Subject.findByPk(req.params.id);
    if (subject) {
        yield subject.update({
            subject_name,
            syllabus,
            subject_acronym,
            teacher_id,
        });
    }
    else {
        return res.status(404).json({ message: "No se encontró la materia" });
    }
    res.json(subject);
});
exports.updateSubject = updateSubject;
//? Eliminar una materia
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const subject = yield subject_model_1.Subject.findByPk(req.params.id);
    if (subject) {
        yield subject.destroy();
        return res.sendStatus(204);
    }
    else {
        return res.status(404).json({ message: "No se encontró la materia" });
    }
});
exports.deleteSubject = deleteSubject;
