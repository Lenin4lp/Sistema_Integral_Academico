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
exports.Subject = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const teacher_model_1 = require("./teacher.model");
const uuid_1 = require("uuid");
const student_model_1 = require("./student.model");
// TODO Tengo que pedir una lista de todas las materias de las carreras existentes para crearlas por defecto
let Subject = class Subject extends sequelize_typescript_1.Model {
    static automatizeSubjectId(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const acronym = subject.subject_acronym;
            const generatedUuid = (0, uuid_1.v4)().substring(0, 5);
            subject.subject_id = `M-${acronym}-${generatedUuid}`;
        });
    }
};
exports.Subject = Subject;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(12),
        allowNull: true,
        field: "id_materia",
        primaryKey: true,
        unique: true,
    })
], Subject.prototype, "subject_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: "nombre_materia",
        unique: true,
    })
], Subject.prototype, "subject_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(3),
        allowNull: false,
        field: "acronimo",
    })
], Subject.prototype, "subject_acronym", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true,
        field: "syllabus",
    })
], Subject.prototype, "syllabus", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => teacher_model_1.Teacher),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_docente",
    })
], Subject.prototype, "teacher_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => teacher_model_1.Teacher)
], Subject.prototype, "teacher", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => student_model_1.Student, {
        through: "estudiante_materia",
        foreignKey: "id_materia",
        otherKey: "id_estudiante",
        timestamps: false,
    })
], Subject.prototype, "students", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], Subject, "automatizeSubjectId", null);
exports.Subject = Subject = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "materia",
        timestamps: false,
    })
], Subject);
