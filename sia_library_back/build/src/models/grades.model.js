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
exports.Grade = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const student_model_1 = require("./student.model");
const group_model_1 = require("./group.model");
const uuid_1 = require("uuid");
let Grade = class Grade extends sequelize_typescript_1.Model {
    static automatizeGradeId(grade) {
        return __awaiter(this, void 0, void 0, function* () {
            const uuid = (0, uuid_1.v4)().substring(0, 6);
            grade.grade_id = uuid;
        });
    }
};
exports.Grade = Grade;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(6),
        allowNull: true,
        field: "id_calificacion",
        primaryKey: true,
        unique: true,
    })
], Grade.prototype, "grade_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "grade_1",
    })
], Grade.prototype, "grade_1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "grade_2",
    })
], Grade.prototype, "grade_2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "test_1",
    })
], Grade.prototype, "test_1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "exam_1",
    })
], Grade.prototype, "exam_1", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "grade_3",
    })
], Grade.prototype, "grade_3", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "grade_4",
    })
], Grade.prototype, "grade_4", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "test_2",
    })
], Grade.prototype, "test_2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "exam_2",
    })
], Grade.prototype, "exam_2", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(4, 2),
        allowNull: true,
        field: "final_grade",
    })
], Grade.prototype, "final_grade", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_model_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: false,
        field: "id_estudiante",
    })
], Grade.prototype, "student_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => group_model_1.Group),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(14),
        allowNull: false,
        field: "id_grupo",
    })
], Grade.prototype, "group_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => student_model_1.Student)
], Grade.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => group_model_1.Group)
], Grade.prototype, "group", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], Grade, "automatizeGradeId", null);
exports.Grade = Grade = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "calificaciones",
        timestamps: false,
    })
], Grade);
