import { Router } from "express";
import { createBook, getBooks, getBook } from "../controllers/book.controller";

const router = Router();

router.post("/book", createBook);
router.get("/books", getBooks);
router.get("/book/:id", getBook);

export default router;
