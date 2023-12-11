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
exports.Group = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const student_model_1 = require("./student.model");
const subject_model_1 = require("./subject.model");
const modality_model_1 = require("./modality.model");
const period_model_1 = require("./period.model");
const grades_model_1 = require("./grades.model");
const teacher_model_1 = require("./teacher.model");
let Group = class Group extends sequelize_typescript_1.Model {
    static createGroupUUID(group) {
        return __awaiter(this, void 0, void 0, function* () {
            const subjectID = group.subject_id;
            const subjectAbreviation = subjectID.substring(2, 5);
            const groupName = group.group_name
                .substring(0, 7)
                .toUpperCase()
                .replace(" ", "");
            group.group_id = `${subjectAbreviation}-${groupName}`;
        });
    }
};
exports.Group = Group;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(14),
        allowNull: true,
        field: "id_grupo",
        primaryKey: true,
        unique: true,
    })
], Group.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "nombre_grupo",
    })
], Group.prototype, "group_name", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => subject_model_1.Subject),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(12),
        allowNull: false,
        field: "id_materia",
    })
], Group.prototype, "subject_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => modality_model_1.Modality),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "id_modalidad",
    })
], Group.prototype, "modality_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => period_model_1.Period),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_periodo",
    })
], Group.prototype, "period_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => teacher_model_1.Teacher),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_docente",
    })
], Group.prototype, "teacher_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => student_model_1.Student, {
        through: "grupo_estudiante",
        foreignKey: "id_grupo",
        otherKey: "id_estudiante",
        timestamps: false,
    })
], Group.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => modality_model_1.Modality)
], Group.prototype, "modality", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => subject_model_1.Subject)
], Group.prototype, "subject", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => period_model_1.Period)
], Group.prototype, "period", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => grades_model_1.Grade)
], Group.prototype, "grades", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => teacher_model_1.Teacher)
], Group.prototype, "teacher", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], Group, "createGroupUUID", null);
exports.Group = Group = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "grupo",
        timestamps: false,
    })
], Group);
