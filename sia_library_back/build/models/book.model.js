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
exports.Book = void 0;
// @ts-check
const sequelize_typescript_1 = require("sequelize-typescript");
const degree_model_1 = require("./degree.model");
const uuid_1 = require("uuid");
let Book = class Book extends sequelize_typescript_1.Model {
    static automatizeCreation(book) {
        return __awaiter(this, void 0, void 0, function* () {
            const bookIdentificator = "BK";
            const generatedUuid = (0, uuid_1.v4)().substring(0, 6);
            book.book_id = `${bookIdentificator}${generatedUuid}`;
        });
    }
};
exports.Book = Book;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
        allowNull: true,
        field: "id_libro",
        primaryKey: true,
        unique: true,
    })
], Book.prototype, "book_id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
        field: "nombre_libro",
    })
], Book.prototype, "book_name", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(80),
        allowNull: true,
        field: "autor_libro",
    })
], Book.prototype, "book_author", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(4),
        allowNull: true,
        field: "anio_libro",
    })
], Book.prototype, "book_year", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: true,
        field: "edicion_libro",
    })
], Book.prototype, "book_edition", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: true,
        field: "editorial_libro",
    })
], Book.prototype, "book_editorial", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true,
        field: "url_libro",
    })
], Book.prototype, "book_url", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: true,
        field: "clasificacion_libro",
    })
], Book.prototype, "book_classification", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: true,
        field: "portada_libro",
    })
], Book.prototype, "book_cover", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => degree_model_1.Degree),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
        allowNull: true,
        field: "id_carrera",
    })
], Book.prototype, "degree_id", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => degree_model_1.Degree)
], Book.prototype, "degree", void 0);
__decorate([
    sequelize_typescript_1.BeforeCreate
], Book, "automatizeCreation", null);
exports.Book = Book = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "libro",
        timestamps: true,
    })
], Book);
