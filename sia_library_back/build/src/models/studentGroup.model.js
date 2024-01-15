"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentGroup = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_model_1 = require("./student.model");
const group_model_1 = require("./group.model");
let StudentGroup = class StudentGroup extends sequelize_typescript_1.Model {
};
exports.StudentGroup = StudentGroup;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => student_model_1.Student),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(11),
        allowNull: false,
        field: "id_estudiante",
    })
], StudentGroup.prototype, "student_id", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => group_model_1.Group),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(14),
        allowNull: false,
        field: "id_grupo",
    })
], StudentGroup.prototype, "group_id", void 0);
exports.StudentGroup = StudentGroup = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "grupo_estudiante",
        timestamps: false,
    })
], StudentGroup);
