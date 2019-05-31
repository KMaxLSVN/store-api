import sequelize from "../../config/db.connection";
import * as Sequelize from "sequelize";
import BooksController from "./books.controller";

export const books: any = sequelize.define("book", {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    bookCode: {
      type:Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3,30],
          msg: "Book code must conatain atleast 3 symbols"
        }
      }
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3,30],
          msg: "Title must conatain atleast 3 symbols"
        }
      }
    },
    authors: {
      type: Sequelize.STRING,
      allowNull: false,
    //   validate: {
    //     len: {
    //       args: [2, 30],
    //       msg: "Authors must conatain atleast 2 symbols"
    //     }
    //   }
    },
    price: {
      type: Sequelize.DOUBLE,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Price must be a number"
        }
      }
    },
    amount: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        isNumeric: {
          msg: "Amount must be a number"
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [3, 200],
          msg: "Description must conatain atleast 5 symbols"
        }
      }
    },
  });

  export interface Book {
    id: number;
    bookCode: string;
    title: string;
    authors: string;
    price: number;
    amount: number;
    pages?: number;
    rating?: number;
    image?: string;
    description?: string;
    quantity?: number;
  }