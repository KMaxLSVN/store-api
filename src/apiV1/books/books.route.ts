import { Router } from "express";
import verifyAdmin from "../../helpers/verifyAdmin";
import Controller from "./books.controller";

const book: Router = Router();
const controller = new Controller();

// Retrieve all books
book.get("/:page", controller.getBooks);

// Retrieve a Specific book
book.get("/:page/:bookCode", controller.getBookByCode);

// Search a Specific book
book.get("/:page/search/:query", controller.search);

// Add a book
book.post("/",verifyAdmin, controller.addBook);

// Update a book with bookCode
book.put('/:bookCode', verifyAdmin, controller.update);

// Delete a book with bookCode
book.delete('/:bookCode', verifyAdmin, controller.remove);


export default book;