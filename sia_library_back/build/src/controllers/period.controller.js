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
exports.deletePeriod = exports.updatePeriod = exports.createPeriod = exports.getPeriod = exports.getPeriods = void 0;
const period_model_1 = require("../models/period.model");
const group_model_1 = require("../models/group.model");
// ? Obtener todos los periodos
const getPeriods = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const periods = yield period_model_1.Period.findAll();
    res.json(periods);
});
exports.getPeriods = getPeriods;
// ? Obtener un solo periodo
const getPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const period = yield period_model_1.Period.findByPk(req.params.id, {
        include: [
            { model: group_model_1.Group }
        ]
    });
    if (!period)
        return res.status(404).json({ message: "Period not found" });
    res.json(period);
});
exports.getPeriod = getPeriod;
// ? Crear un nuevo periodo
const createPeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { period_id, period_name } = req.body;
    try {
        const periodFound = yield period_model_1.Period.findOne({
            where: { period_name: period_name },
        });
        if (periodFound)
            return res.status(400).json({ message: "El periodo ya existe" });
        const newPeriod = yield period_model_1.Period.create({
            period_name,
            period_id,
        });
        res.json(newPeriod);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createPeriod = createPeriod;
// ? Actualizar un periodo
const updatePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { period_name } = req.body;
    const period = yield period_model_1.Period.findByPk(req.params.id);
    if (period) {
        yield period.update({
            period_name,
        });
    }
    else {
        return res.status(404).json({ message: "Periodo no encontrado" });
    }
    res.json(period);
});
exports.updatePeriod = updatePeriod;
// ? Eliminar un periodo
const deletePeriod = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const period = yield period_model_1.Period.findByPk(req.params.id);
    if (period) {
        yield period.destroy();
        return res.sendStatus(204);
    }
    else {
        return res.status(404).json({ message: "Periodo no encontrado" });
    }
});
exports.deletePeriod = deletePeriod;
