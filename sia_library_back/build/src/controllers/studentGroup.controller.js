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
exports.removeStudentFromGroup = exports.addStudentToGroup = void 0;
const studentGroup_model_1 = require("../models/studentGroup.model");
const grades_model_1 = require("../models/grades.model");
// ? Agregar estudiante a grupo
const addStudentToGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: group_id } = req.params;
    const { student_id } = req.body;
    try {
        const studentFound = yield studentGroup_model_1.StudentGroup.findOne({
            where: { student_id: student_id, group_id: group_id },
        });
        if (studentFound)
            return res
                .status(400)
                .json({ message: "El estudiante ya se encuentra en el grupo" });
        const studentGroup = yield studentGroup_model_1.StudentGroup.create({
            group_id,
            student_id,
        });
        res.json(studentGroup);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.addStudentToGroup = addStudentToGroup;
// ? Retirar estudiante de grupo
const removeStudentFromGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id: group_id, studentId: student_id } = req.params;
    console.log(student_id);
    try {
        const studentFound = yield studentGroup_model_1.StudentGroup.findOne({
            where: { group_id: group_id, student_id: student_id },
        });
        if (!studentFound)
            return res
                .status(400)
                .json({ message: "El estudiante no se encuentra en el grupo" });
        yield studentFound.destroy();
        yield grades_model_1.Grade.destroy({
            where: { group_id: group_id, student_id: student_id },
        });
        res.status(204).json({ message: "Estudiante eliminado del grupo" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.removeStudentFromGroup = removeStudentFromGroup;
