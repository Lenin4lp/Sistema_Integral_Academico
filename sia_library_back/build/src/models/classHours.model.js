"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassHours = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const modality_model_1 = require("./modality.model");
const schedule_model_1 = require("./schedule.model");
let ClassHours = class ClassHours extends sequelize_typescript_1.Model {
};
exports.ClassHours = ClassHours;
__decorate([
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "id_hora_clase",
        primaryKey: true,
        unique: true,
    })
], ClassHours.prototype, "classHours_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(6),
        allowNull: true,
        field: "hora",
    })
], ClassHours.prototype, "hour", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => modality_model_1.Modality),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "id_modalidad",
    })
], ClassHours.prototype, "modality_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => modality_model_1.Modality)
], ClassHours.prototype, "modality", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => schedule_model_1.Schedule)
], ClassHours.prototype, "schedule", void 0);
exports.ClassHours = ClassHours = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "horas_clase",
        timestamps: false,
    })
], ClassHours);
