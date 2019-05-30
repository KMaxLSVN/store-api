import CONFIG from "../config/config";
import conn from "../config/db.connection";
import to from "await-to-js";
import * as Sequelize from "sequelize";
import sequelize from "../config/db.connection";

import { books, Book } from "../apiV1/books/books.model";
import errorRegister from "../helpers/errorRegister";

export class BookService {
    public async getBooks(page: number): Promise<Book[]> {
      return await books.findAll({
        limit: 10,
        offset: page
      });
    }
  
    public async getBookByCode(bookCode: string){
      const book = (await books.findOne({
        where: { bookCode: bookCode }
      })) as Book;
      if (book) return book;
    }
  
    public async addBook(book: Book): Promise<Book> {
      let isExist = (await books.findOne({
        where: { bookCode: book.bookCode }
      })) as Book;
      if(!isExist){
        return books.create(book);
      } else {
        throw new errorRegister('Book is existed', 400);
      }
    }
  }