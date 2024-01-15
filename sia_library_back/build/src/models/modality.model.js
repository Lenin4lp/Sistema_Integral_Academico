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
var Modality_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Modality = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const degree_model_1 = require("./degree.model");
const student_model_1 = require("./student.model");
const group_model_1 = require("./group.model");
const classHours_model_1 = require("./classHours.model");
let Modality = Modality_1 = class Modality extends sequelize_typescript_1.Model {
};
exports.Modality = Modality;
Modality.PRESENCIAL_MATUTINO = "presencial matutino";
Modality.PRESENCIAL_VESPERTINO = "presencial vespertino";
Modality.VIRTUAL = "virtual";
Modality.INTENSIVO = "intensivo";
Modality.createDefaultModalities = () => __awaiter(void 0, void 0, void 0, function* () {
    const defaultModalities = [
        {
            modality_name: Modality_1.PRESENCIAL_MATUTINO,
            modality_schedule: "8h00 - 12h30",
            modality_status: true,
        },
        {
            modality_name: Modality_1.VIRTUAL,
            modality_schedule: "18h00 - 21h00",
            modality_status: true,
        },
    ];
    try {
        for (const singleModality of defaultModalities) {
            yield Modality_1.findOrCreate({
                where: {
                    modality_name: singleModality.modality_name,
                },
                defaults: singleModality,
            });
        }
        console.log("Modalidades por defecto creadas exitosamente");
    }
    catch (error) {
        console.log("Oops, algo malio sal: ", error);
    }
});
__decorate([
    sequelize_typescript_1.AutoIncrement,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "id_modalidad",
        primaryKey: true,
        unique: true,
    })
], Modality.prototype, "modality_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
        allowNull: false,
        field: "nombre_modalidad",
        unique: true,
    })
], Modality.prototype, "modality_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
        allowNull: true,
        field: "horario_modalidad",
    })
], Modality.prototype, "modality_schedule", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsToMany)(() => degree_model_1.Degree, {
        through: "carrera_modalidad",
        foreignKey: "id_modalidad",
        otherKey: "id_carrera",
    })
], Modality.prototype, "degree", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => student_model_1.Student)
], Modality.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => group_model_1.Group)
], Modality.prototype, "group", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => classHours_model_1.ClassHours)
], Modality.prototype, "classHours", void 0);
__decorate([
    sequelize_typescript_1.AfterSync
], Modality, "createDefaultModalities", void 0);
exports.Modality = Modality = Modality_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "modalidad",
        timestamps: false,
    })
], Modality);
