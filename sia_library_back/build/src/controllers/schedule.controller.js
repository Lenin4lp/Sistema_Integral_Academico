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
exports.createSchedule = exports.getSchedule = exports.getSchedules = void 0;
const schedule_model_1 = require("../models/schedule.model");
// ? Obtener todos los horarios
const getSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schedules = yield schedule_model_1.Schedule.findAll();
    res.json(schedules);
});
exports.getSchedules = getSchedules;
//? Obtener un horario
const getSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const schedule = yield schedule_model_1.Schedule.findByPk(req.params.id);
    if (!schedule)
        return res.status(404).json({ message: "Schedule not found" });
    res.json(schedule);
});
exports.getSchedule = getSchedule;
//? Crear un horario
const createSchedule = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { monday, tuesday, wednesday, thursday, friday } = req.body;
    try {
        const newSchedule = yield schedule_model_1.Schedule.create({
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
        });
        res.json(newSchedule);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createSchedule = createSchedule;
