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
exports.deleteGrade = exports.updateGrade = exports.createGrade = exports.getGrade = exports.getGrades = void 0;
const grades_model_1 = require("../models/grades.model");
const student_model_1 = require("../models/student.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const group_model_1 = require("../models/group.model");
const subject_model_1 = require("../models/subject.model");
// ? Obtener todas las notas
const getGrades = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grades = yield grades_model_1.Grade.findAll();
    res.json(grades);
});
exports.getGrades = getGrades;
// ? Obtener una sola nota
const getGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grade = yield grades_model_1.Grade.findByPk(req.params.id, {
        include: [
            { model: student_model_1.Student, include: [{ model: user_model_1.default }] },
            { model: group_model_1.Group, include: [{ model: subject_model_1.Subject }] },
        ],
    });
    if (!grade)
        return res.status(404).json({ message: "Grade not found" });
    res.json(grade);
});
exports.getGrade = getGrade;
// ? Crear una nota
const createGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { student_id, group_id } = req.body;
    try {
        const newGrade = yield grades_model_1.Grade.create({
            grade_1: 0,
            grade_2: 0,
            test_1: 0,
            exam_1: 0,
            grade_3: 0,
            grade_4: 0,
            test_2: 0,
            exam_2: 0,
            final_grade: 0,
            student_id,
            group_id,
        });
        res.json(newGrade);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createGrade = createGrade;
// ? Actualizar una nota
const updateGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { grade_1, grade_2, test_1, exam_1, grade_3, grade_4, test_2, exam_2, final_grade, } = req.body;
    const grade = yield grades_model_1.Grade.findByPk(req.params.id);
    if (grade) {
        yield grade.update({
            grade_1,
            grade_2,
            test_1,
            exam_1,
            grade_3,
            grade_4,
            test_2,
            exam_2,
            final_grade,
        });
    }
    else {
        return res
            .status(404)
            .json({ message: "No se encontró el reporte de notas" });
    }
    res.json(grade);
});
exports.updateGrade = updateGrade;
// ? Eliminar una nota
const deleteGrade = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const grade = yield grades_model_1.Grade.findByPk(req.params.id);
    if (grade) {
        yield grade.destroy();
        return res.sendStatus(204);
    }
    else {
        return res
            .status(404)
            .json({ message: "No se encontró el reporte de notas" });
    }
});
exports.deleteGrade = deleteGrade;
