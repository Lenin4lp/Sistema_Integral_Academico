import { Router } from "express";
import {
  createBook,
  getBooks,
  getBook,
  updateBook,
} from "../controllers/book.controller";

const router = Router();

router.post("/book", createBook);
router.put("/book/:id", updateBook);
router.get("/books", getBooks);
router.get("/book/:id", getBook);

export default router;
