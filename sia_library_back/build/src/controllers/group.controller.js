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
exports.deleteStudentFromGroup = exports.addStudentToGroup = exports.deleteGroup = exports.updateGroup = exports.createGroup = exports.getGroup = exports.getGroups = void 0;
const group_model_1 = require("../models/group.model");
const student_model_1 = require("../models/student.model");
const user_model_1 = __importDefault(require("../models/user.model"));
const subject_model_1 = require("../models/subject.model");
const period_model_1 = require("../models/period.model");
const connection_1 = require("../connection/connection");
const grades_model_1 = require("../models/grades.model");
const teacher_model_1 = require("../models/teacher.model");
// ? Obtener todos los grupos
const getGroups = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groups = yield group_model_1.Group.findAll({
        include: [
            { model: student_model_1.Student, include: [{ model: user_model_1.default }] },
            { model: teacher_model_1.Teacher, include: [{ model: user_model_1.default }] },
            { model: subject_model_1.Subject },
            { model: period_model_1.Period },
            {
                model: grades_model_1.Grade,
                include: [{ model: student_model_1.Student, include: [{ model: user_model_1.default }] }],
            },
        ],
    });
    res.json(groups);
});
exports.getGroups = getGroups;
// ? Obtener un grupo
const getGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield group_model_1.Group.findByPk(req.params.id, {
        include: [
            { model: student_model_1.Student, include: [{ model: user_model_1.default }] },
            { model: teacher_model_1.Teacher, include: [{ model: user_model_1.default }] },
            { model: subject_model_1.Subject },
            { model: period_model_1.Period },
            {
                model: grades_model_1.Grade,
                include: [{ model: student_model_1.Student, include: [{ model: user_model_1.default }] }],
            },
        ],
    });
    if (!group)
        return res.status(404).json({ message: "Group not found" });
    res.json(group);
});
exports.getGroup = getGroup;
// ? Crear un grupo
const createGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { group_name, subject_id, modality_id, period_id, teacher_id } = req.body;
    try {
        const newGroup = yield group_model_1.Group.create({
            group_name,
            subject_id,
            modality_id,
            period_id,
            teacher_id,
            group_status: true,
        });
        res.json(newGroup);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createGroup = createGroup;
// ? Actualizar un grupo
const updateGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { group_name, teacher_id, group_status, modality_id } = req.body;
    const group = yield group_model_1.Group.findByPk(req.params.id);
    if (group) {
        yield group.update({
            group_name,
            teacher_id,
            group_status,
            modality_id,
        });
    }
    else {
        return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.json(group);
});
exports.updateGroup = updateGroup;
// ? Eliminar un grupo
const deleteGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const group = yield group_model_1.Group.findByPk(req.params.id);
    if (group) {
        yield group.destroy();
        return res.sendStatus(204);
    }
    else {
        return res.status(404).json({ message: "Grupo no encontrado" });
    }
});
exports.deleteGroup = deleteGroup;
//? Agregar estudiantes a grupo
const addStudentToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: group_id } = req.params;
    const { student_id } = req.body;
    try {
        const query = `INSERT INTO grupo_estudiante (id_grupo, id_estudiante) VALUES (?, ?)`;
        yield connection_1.connection.query(query, { replacements: [group_id, student_id] });
        res.status(200).json({ message: "Estudiante agregado al grupo" });
        if (res.statusCode === 200) {
            yield grades_model_1.Grade.create({
                grade_1: 0,
                grade_2: 0,
                test_1: 0,
                exam_1: 0,
                grade_3: 0,
                grade_4: 0,
                test_2: 0,
                exam_2: 0,
                final_grade: 0,
                student_id: student_id,
                group_id: group_id,
            });
        }
    }
    catch (error) {
        console.log("Algo malio sal: ", error);
        res.status(500).json({ message: "Error al agregar estudiante al grupo" });
    }
});
exports.addStudentToGroup = addStudentToGroup;
//? Eliminar estudiantes de grupo
const deleteStudentFromGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: group_id } = req.params;
    const { student_id } = req.body;
    try {
        const query = `DELETE FROM grupo_estudiante WHERE id_grupo = ? AND id_estudiante = ?`;
        yield connection_1.connection.query(query, { replacements: [group_id, student_id] });
        res.status(200).json({ message: "Estudiante eliminado del grupo" });
    }
    catch (error) {
        console.log("Algo malio sal: ", error);
        res.status(500).json({ message: "Error al eliminar estudiante del grupo" });
    }
});
exports.deleteStudentFromGroup = deleteStudentFromGroup;
