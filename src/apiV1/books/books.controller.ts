import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { Book, books } from "./books.model";
import { BookService } from "../../services/booksService";
import conn from "../../config/db.connection";
import sequelize = require("sequelize");

export default class BooksController {
  
    public getBooks = async (req: Request, res: Response): Promise<any> => {
      try {
        const page = req.body.page;
       const books: Book[] = await new BookService().getBooks(page | 0);
        if(!books) {
            return res.status(404).send({
                success: false,
                message: "Books not found",
                data: null
            })
        }
        res.status(200).send({
          success: true,
          data: books
        });
      } catch (err) {
        res.status(500).send({
          success: false,
          message: err.toString(),
          data: null
        });
      }
    };
  
    public getBookByCode = async (req: Request, res: Response): Promise<any> => {       
      try{
        const book: Book = req.params;
       
        const result = await new BookService().getBookByCode(book.bookCode);
        if(!result) {
          return res.status(404).send({
            success: false,
            message: "Book not found",
            data: null
          })
        }
        res.status(200).send({
          success: true,
          data: result
        })
      } catch (err) {
        res.status(500).send({
          success: false,
          message: err.toString(),
          data: null
        })
      }
    };
  
    public addBook = async (req: Request, res: Response): Promise<any> => {
      try {
        const book: Book = req.body;
        const createdBook = await new BookService().addBook(book);
        res.status(200).send({
          success: true,
          message: "Book successfully created",
          data: createdBook
        });
      } catch (err) {
        res.status(500).send({
          success: false,
          message: err.toString(),
          data: null
        });
      }
    };

    public update = async (req: Request, res: Response): Promise<any> => {
        try {
            const bookUpdated = await books.update(req.body, {
                where: {
                    bookCode: req.params.bookCode
                }
            })
            if(!bookUpdated) {
                return res.status(404).send({
                    success: false,
                    message: "Book not found",
                    data: null
                });
            }
            res.status(200).send({
                success: false,
                message: "Book was changed",
                data: bookUpdated
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
            })
        }
    }

    public remove = async (req: Request, res: Response): Promise<any> => {
        try {
          const book = await books.destroy({
            where: {
                bookCode: req.params.bookCode
            }
            }
            );
          if (!book) {
            return res.status(404).send({
              success: false,
              message: 'Book not found',
              data: null
            });
          }
          res.status(204).send({
            success: true,
            message: 'Book was deleted',
            data: book
          });
        } catch (err) {
          res.status(500).send({
            success: false,
            message: err.toString(),
            data: null
          });
        }
      }

    public search = async (req: Request, res: Response): Promise<any> => {
        try {
            const argument = req.params.query;
            const searchResult = await conn.query('SELECT * FROM books WHERE title LIKE $1',
              { bind: [`%${argument}%`], type: sequelize.QueryTypes.SELECT }
              // { replacements: { search_name: `%${argument}%`  }, type: sequelize.QueryTypes.SELECT }
            )
            if(!(searchResult && searchResult.length)) {
                return res.status(404).send({
                    success: false,
                    message: 'Book does not exist in db',
                    data: null
                })
            }
            res.status(200).send({
                success: true,
                message: 'Get it!',
                data: searchResult
            })            
        } catch (err) {
            res.status(500).send({
                success: false,
                message: err.toString(),
                data: null
              })
        }
    }

  }