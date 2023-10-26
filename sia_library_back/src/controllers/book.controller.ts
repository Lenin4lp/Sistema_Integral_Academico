import { Request, Response } from "express";
import { Book } from "../models/book.model";

// ? Crear libro

export const createBook = async (req: Request, res: Response) => {
  const {
    book_name,
    book_author,
    book_year,
    book_edition,
    book_editorial,
    book_classification,
    book_cover,
    book_url,
    degree_id,
  } = req.body;
  try {
    const bookFound = await Book.findOne({
      where: {
        book_name: book_name,
      },
    });
    if (bookFound) {
      return res.status(409).json(["El libro ya existe"]);
    }

    const newBook = await Book.create({
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
  } catch (error) {
    console.log(error);
    res.status(500).json(["Ha ocurrido un error con el servidor"]);
  }
};

// ? Obtener todos los libros

export const getBooks = async (req: Request, res: Response) => {
  const books = await Book.findAll();
  res.json(books);
};

// ? Obtener un solo libro

export const getBook = async (req: Request, res: Response) => {
  const book = await Book.findByPk(req.params.id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  res.json(book);
};
