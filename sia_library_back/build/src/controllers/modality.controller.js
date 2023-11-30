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
exports.deleteModality = exports.updateModality = exports.createModality = exports.getModality = exports.getModalities = void 0;
const modality_model_1 = require("../models/modality.model");
// ? Obtener todas las modalidades
const getModalities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modalities = yield modality_model_1.Modality.findAll();
    res.json(modalities);
});
exports.getModalities = getModalities;
// ? Obtener una sola modalidad
const getModality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modality = yield modality_model_1.Modality.findByPk(req.params.id);
    if (!modality)
        return res.status(404).json({ message: "Modality not found" });
    res.json(modality);
});
exports.getModality = getModality;
//? Crear una modalidad
const createModality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { modality_name, modality_schedule } = req.body;
    try {
        const modalityFound = yield modality_model_1.Modality.findOne({
            where: { modality_name: modality_name },
        });
        if (modalityFound)
            return res.status(400).json({ message: "La modalidad ya existe" });
        const newModality = yield modality_model_1.Modality.create({
            modality_name,
            modality_schedule,
        });
        res.json(newModality);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createModality = createModality;
// ? Actualizar una modalidad
const updateModality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { modality_name, modality_schedule } = req.body;
    const modality = yield modality_model_1.Modality.findByPk(req.params.id);
    if (modality) {
        yield modality.update({
            modality_name,
            modality_schedule,
        });
    }
    else {
        return res.status(404).json({ message: "Modalidad no encontrada" });
    }
    res.json(modality);
});
exports.updateModality = updateModality;
// ? Eliminar una modalidad
const deleteModality = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const modality = yield modality_model_1.Modality.findByPk(req.params.id);
    if (modality) {
        yield modality.destroy();
        return res.sendStatus(204);
    }
    else {
        return res.status(404).json({ message: "Modalidad no encontrada" });
    }
});
exports.deleteModality = deleteModality;
