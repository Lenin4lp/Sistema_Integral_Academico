"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.Schedule = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
const classHours_model_1 = require("./classHours.model");
let Schedule = class Schedule extends sequelize_typescript_1.Model {
    static automatizeScheduleId(schedule) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = (0, uuid_1.v4)().substring(0, 6);
            const identificator = "SC";
            schedule.schedule_id = `${identificator}${uuid}`;
        });
    }
};
exports.Schedule = Schedule;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(8),
        allowNull: true,
        field: "id_horario",
        primaryKey: true,
        unique: true,
    })
], Schedule.prototype, "schedule_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.JSON,
        allowNull: true,
        field: "dias_semana",
        defaultValue: ["Lu", "Ma", "Mi", "Ju", "Vi"],
    })
], Schedule.prototype, "days", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => classHours_model_1.ClassHours),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "id_hora_clase",
    })
], Schedule.prototype, "classHours_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => classHours_model_1.ClassHours)
], Schedule.prototype, "classHours", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], Schedule, "automatizeScheduleId", null);
exports.Schedule = Schedule = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "horario",
        timestamps: false,
    })
], Schedule);
