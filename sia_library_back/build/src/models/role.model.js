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
var Role_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const user_model_1 = require("./user.model");
let Role = Role_1 = class Role extends sequelize_typescript_1.Model {
};
exports.Role = Role;
// Roles predefinidos (Siempre van a estar por defecto en la db)
Role.STUDENT_ROLE = "estudiante";
Role.TEACHER_ROLE = "docente";
Role.ADMIN_ROLE = "administrador";
Role.SUPERADMIN_ROLE = "superadministrador";
//   Metodo para crear roles por defecto
Role.createDefaultRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const defaultRoles = [
        {
            role_name: Role_1.STUDENT_ROLE,
            role_description: "Accede a recursos, calificaciones, y cumple actividades academicas",
        },
        {
            role_name: Role_1.TEACHER_ROLE,
            role_description: "Crea, modifica y elimina recursos, asigna tareas y administra notas de estudiantes",
        },
        {
            role_name: Role_1.ADMIN_ROLE,
            role_description: "Crea, modifica y elimina recursos, estudiantes y docentes. Accede y administra cursos, carreras y calificaciones",
        },
        {
            role_name: Role_1.SUPERADMIN_ROLE,
            role_description: "Administra toda la plataforma: Creacion, eliminacion y modificacion de recursos, estudiantes, docentes y administradores.",
        },
    ];
    try {
        for (const singleRole of defaultRoles) {
            yield Role_1.findOrCreate({
                where: {
                    role_name: singleRole.role_name,
                },
                defaults: singleRole,
            });
        }
        console.log("Roles por defecto creados exitosamente");
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
        field: "id_rol",
        primaryKey: true,
        unique: true,
    })
], Role.prototype, "role_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(25),
        allowNull: false,
        field: "nombre_rol",
        unique: true,
    })
], Role.prototype, "role_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(200),
        allowNull: true,
        field: "descripcion",
    })
], Role.prototype, "role_description", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => user_model_1.User)
], Role.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.AfterSync
], Role, "createDefaultRoles", void 0);
exports.Role = Role = Role_1 = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "rol",
        timestamps: false,
    })
], Role);
