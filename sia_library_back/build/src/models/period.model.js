"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Period = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const group_model_1 = require("./group.model");
let Period = class Period extends sequelize_typescript_1.Model {
};
exports.Period = Period;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "id_periodo",
        primaryKey: true,
        unique: true,
    })
], Period.prototype, "period_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
        field: "nombre_periodo",
        unique: true,
    })
], Period.prototype, "period_name", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => group_model_1.Group)
], Period.prototype, "group", void 0);
exports.Period = Period = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "periodo_academico",
        timestamps: false,
    })
], Period);
