"use strict";
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
exports.deleteBook = exports.getBook = exports.getBooks = exports.updateBook = exports.createBook = void 0;
const book_model_1 = require("../models/book.model");
// ? Crear libro
const createBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book_name, book_author, book_year, book_edition, book_editorial, book_classification, book_cover, book_url, degree_id, } = req.body;
    try {
        const bookFound = yield book_model_1.Book.findOne({
            where: {
                book_name: book_name,
            },
        });
        if (bookFound) {
            return res.status(409).json(["El libro ya existe"]);
        }
        const newBook = yield book_model_1.Book.create({
            book_name,
            book_author,
            book_year,
            book_edition,
            book_editorial,
            book_classification,
            book_cover,
            book_url,
            degree_id,
        });
        res.json(newBook);
    }
    catch (error) {
        console.log(error);
        res.status(500).json(["Ha ocurrido un error con el servidor"]);
    }
});
exports.createBook = createBook;
// ? Actualizar libro
const updateBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { book_name, book_author, book_year, book_edition, book_editorial, book_classification, book_cover, book_url, degree_id, } = req.body;
    const book = yield book_model_1.Book.findByPk(req.params.id);
    if (book) {
        yield book.update({
            book_name,
            book_author,
            book_year,
            book_edition,
            book_editorial,
            book_classification,
            book_cover,
            book_url,
            degree_id,
        });
    }
    else {
        return res.status(404).json({ message: "No se encontró el libro" });
    }
    res.json(book);
});
exports.updateBook = updateBook;
// ? Obtener todos los libros
const getBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield book_model_1.Book.findAll();
    res.json(books);
});
exports.getBooks = getBooks;
// ? Obtener un solo libro
const getBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findByPk(req.params.id);
    if (!book)
        return res.status(404).json({ message: "Book not found" });
    res.json(book);
});
exports.getBook = getBook;
// ? Eliminar libro
const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield book_model_1.Book.findByPk(req.params.id);
    if (book) {
        yield book.destroy();
        return res.sendStatus(204);
    }
    else {
        return res.status(404).json({ message: "No se encontró el libro" });
    }
});
exports.deleteBook = deleteBook;
