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
exports.User = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const uuid_1 = require("uuid");
const role_model_1 = require("./role.model");
const student_model_1 = require("./student.model");
const teacher_model_1 = require("./teacher.model");
const admin_model_1 = require("./admin.model");
let User = class User extends sequelize_typescript_1.Model {
    // Metodo que crea un id personalizado segun el rol que cumple el usuario
    static automatizeCreation(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const studentIdentificator = "ES";
            const teacherIdentificator = "DO";
            const adminIdentificator = "AD";
            const superAdminIdentificator = "SA";
            if (user.role_id === 1) {
                const generatedUuid = (0, uuid_1.v4)().substring(0, 6);
                user.user_id = `${studentIdentificator}-${generatedUuid}`;
            }
            else if (user.role_id === 2) {
                const generatedUuid = (0, uuid_1.v4)().substring(0, 6);
                user.user_id = `${teacherIdentificator}-${generatedUuid}`;
            }
            else if (user.role_id === 3) {
                const generatedUuid = (0, uuid_1.v4)().substring(0, 6);
                user.user_id = `${adminIdentificator}-${generatedUuid}`;
            }
            else if (user.role_id === 4) {
                const generatedUuid = (0, uuid_1.v4)().substring(0, 6);
                user.user_id = `${superAdminIdentificator}-${generatedUuid}`;
            }
        });
    }
};
exports.User = User;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_usuario",
        primaryKey: true,
        unique: true,
    })
], User.prototype, "user_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
        allowNull: false,
        field: "nombres_usuario",
    })
], User.prototype, "user_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
        allowNull: false,
        field: "apellidos_usuario",
    })
], User.prototype, "user_lastname", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
        allowNull: false,
        field: "correo_usuario",
        unique: true,
    })
], User.prototype, "user_email", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        field: "contrasena_usuario",
    })
], User.prototype, "user_password", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "cedula_identidad",
    })
], User.prototype, "user_ci", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: true,
        field: "direccion",
    })
], User.prototype, "user_direction", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
        field: "nacionalidad",
    })
], User.prototype, "user_Citizenship", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
        allowNull: true,
        field: "telefono",
    })
], User.prototype, "user_phone", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
        allowNull: false,
        field: "sexo",
    })
], User.prototype, "user_genre", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(11),
        allowNull: true,
        field: "fecha_nacimiento",
    })
], User.prototype, "birth_date", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => role_model_1.Role),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
        field: "id_rol",
    })
], User.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => role_model_1.Role)
], User.prototype, "role", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => student_model_1.Student, { onDelete: "CASCADE" })
], User.prototype, "student", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => teacher_model_1.Teacher, { onDelete: "CASCADE" })
], User.prototype, "teacher", void 0);
__decorate([
    (0, sequelize_typescript_1.HasOne)(() => admin_model_1.Admin, { onDelete: "CASCADE" })
], User.prototype, "admin", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], User, "automatizeCreation", null);
exports.User = User = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "usuario",
        timestamps: true,
    })
], User);
exports.default = User;
