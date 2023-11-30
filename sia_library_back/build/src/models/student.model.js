"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
const degree_model_1 = require("./degree.model");
const modality_model_1 = require("./modality.model");
const grades_model_1 = require("./grades.model");
const group_model_1 = require("./group.model");
let Student = class Student extends sequelize_typescript_1.Model {
};
exports.Student = Student;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "id_estudiante",
        primaryKey: true,
    })
], Student.prototype, "student_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => user_model_1.User),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "id_usuario",
    })
], Student.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => degree_model_1.Degree),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_carrera",
    })
], Student.prototype, "degree_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => modality_model_1.Modality),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "id_modalidad",
    })
], Student.prototype, "modality_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => group_model_1.Group, {
        through: "grupo_estudiante",
        foreignKey: "id_estudiante",
        otherKey: "id_grupo",
        timestamps: false,
    })
], Student.prototype, "group", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => grades_model_1.Grade)
], Student.prototype, "grades", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => user_model_1.User, { onDelete: "CASCADE" })
], Student.prototype, "user", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => degree_model_1.Degree)
], Student.prototype, "degree", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => modality_model_1.Modality)
], Student.prototype, "modality", void 0);
exports.Student = Student = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "estudiante",
        timestamps: true,
    })
], Student);
