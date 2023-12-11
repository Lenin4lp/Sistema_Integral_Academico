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
exports.Degree = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const student_model_1 = require("./student.model");
const uuid_1 = require("uuid");
const book_model_1 = require("./book.model");
let Degree = class Degree extends sequelize_typescript_1.Model {
    static automatizeDegreeId(degree) {
        return __awaiter(this, void 0, void 0, function* () {
            const acronym = degree.degree_acronym;
            const generatedUuid = (0, uuid_1.v4)().substring(0, 6);
            degree.degree_id = `${acronym}-${generatedUuid}`;
        });
    }
};
exports.Degree = Degree;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_carrera",
        primaryKey: true,
        unique: true,
    })
], Degree.prototype, "degree_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
        field: "nombre_carrera",
        unique: true,
    })
], Degree.prototype, "degree_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "n°_semestres",
    })
], Degree.prototype, "degree_duration", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(3),
        allowNull: false,
        field: "acronimo",
    })
], Degree.prototype, "degree_acronym", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_model_1.Student)
], Degree.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => book_model_1.Book)
], Degree.prototype, "book", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], Degree, "automatizeDegreeId", null);
exports.Degree = Degree = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "carrera",
        timestamps: false,
    })
], Degree);
