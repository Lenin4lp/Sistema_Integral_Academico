"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Teacher = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const group_model_1 = require("./group.model");
let Teacher = class Teacher extends sequelize_typescript_1.Model {
};
exports.Teacher = Teacher;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_docente",
        primaryKey: true,
    })
], Teacher.prototype, "teacher_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: true,
        field: "espacialidad_docente",
    })
], Teacher.prototype, "speciality", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "id_usuario",
    })
], Teacher.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => group_model_1.Group)
], Teacher.prototype, "group", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, { onDelete: "CASCADE" })
], Teacher.prototype, "user", void 0);
exports.Teacher = Teacher = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "docente",
        timestamps: true,
    })
], Teacher);
