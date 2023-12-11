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
exports.removeStudentFromSubject = exports.assignStudentToSubject = exports.updateStudent = exports.getStudent = exports.getStudents = void 0;
const student_model_1 = require("../models/student.model");
const degree_model_1 = require("../models/degree.model");
const subject_model_1 = require("../models/subject.model");
const user_model_1 = require("../models/user.model");
const connection_1 = require("../connection/connection");
const group_model_1 = require("../models/group.model");
const grades_model_1 = require("../models/grades.model");
//? Obtener todos los estudiantes
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const students = yield student_model_1.Student.findAll();
    res.json(students);
});
exports.getStudents = getStudents;
//? Obtener un estudiante
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const student = yield student_model_1.Student.findByPk(req.params.id, {
        include: [
            { model: degree_model_1.Degree },
            { model: group_model_1.Group, include: [{ model: subject_model_1.Subject }] },
            { model: user_model_1.User },
            {
                model: grades_model_1.Grade,
                include: [{ model: group_model_1.Group, include: [{ model: subject_model_1.Subject }] }],
            },
        ],
    });
    if (!student)
        return res.status(404).json(["No se encontró el estudiante"]);
    res.json(student);
});
exports.getStudent = getStudent;
//? Actualizar un estudiante
const updateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { degree_id } = req.body;
    const student = yield student_model_1.Student.findByPk(req.params.id);
    if (student) {
        yield student.update({
            degree_id,
        });
    }
    else {
        return res.status(404).json({ message: "No se encontró el estudiante" });
    }
    res.json(student);
});
exports.updateStudent = updateStudent;
//? Asignar estudiante a materia
const assignStudentToSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: student_id } = req.params;
    const { subject_id } = req.body;
    try {
        const query = `INSERT INTO estudiante_materia (id_materia, id_estudiante) VALUES (?,?)`;
        yield connection_1.connection.query(query, { replacements: [subject_id, student_id] });
        res.status(200).json({ message: "Estudiante asignado a materia" });
    }
    catch (error) {
        console.log("Algo malio sal: ", error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.assignStudentToSubject = assignStudentToSubject;
//? Eliminar estudiante de materia
const removeStudentFromSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: student_id } = req.params;
    const { subject_id } = req.body;
    try {
        const query = `DELETE FROM estudiante_materia WHERE id_materia = ? AND id_estudiante = ?`;
        yield connection_1.connection.query(query, { replacements: [subject_id, student_id] });
        res.status(200).json({ message: "Estudiante eliminado de materia" });
    }
    catch (error) {
        console.log("Algo malio sal: ", error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.removeStudentFromSubject = removeStudentFromSubject;
