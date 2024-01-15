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
exports.deleteDegree = exports.updateDegree = exports.createDegree = exports.getDegree = exports.getDegrees = void 0;
const degree_model_1 = require("../models/degree.model");
const student_model_1 = require("../models/student.model");
const user_model_1 = require("../models/user.model");
const modality_model_1 = require("../models/modality.model");
const group_model_1 = require("../models/group.model");
//? Obtener todas las Carreras
const getDegrees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const degrees = yield degree_model_1.Degree.findAll({
        include: [
            { model: student_model_1.Student, include: [{ model: user_model_1.User }, { model: group_model_1.Group }] },
            { model: modality_model_1.Modality },
        ],
    });
    res.json(degrees);
});
exports.getDegrees = getDegrees;
//? Obtener una sola Carrera
const getDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const degree = yield degree_model_1.Degree.findByPk(req.params.id, {
        include: [{ model: student_model_1.Student, include: [{ model: user_model_1.User }] }],
    });
    if (!degree)
        return res.status(404).json({ message: "Degree not found" });
    res.json({ degree });
});
exports.getDegree = getDegree;
//? Crear una Carrera
const createDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { degree_name, degree_duration, degree_acronym } = req.body;
    try {
        const degreeFound = yield degree_model_1.Degree.findOne({
            where: {
                degree_name: degree_name,
            },
        });
        if (degreeFound) {
            return res.status(409).json(["La carrera ya existe"]);
        }
        const newDegree = yield degree_model_1.Degree.create({
            degree_name,
            degree_duration: degree_duration !== null && degree_duration !== void 0 ? degree_duration : 4,
            degree_acronym,
            degree_status: true,
        });
        res.json(newDegree);
    }
    catch (error) {
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createDegree = createDegree;
//? Actualizar una Carrera
const updateDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { degree_name, degree_duration, degree_status } = req.body;
    const degree = yield degree_model_1.Degree.findByPk(req.params.id);
    if (degree) {
        yield degree.update({
            degree_name,
            degree_duration,
            degree_status,
        });
    }
    else {
        return res.status(404).json({ message: "No se encontró la carrera" });
    }
    res.json(degree);
});
exports.updateDegree = updateDegree;
//? Eliminar una Carrera
const deleteDegree = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const degree = yield degree_model_1.Degree.findByPk(req.params.id);
    if (degree) {
        yield degree.destroy();
        return res.sendStatus(204);
    }
    else {
        return res.status(404).json({ message: "No se encontró la carrera" });
    }
});
exports.deleteDegree = deleteDegree;
