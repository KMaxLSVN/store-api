import * as bcrypt from "bcrypt";
import CONFIG from "./config";
import * as Sequelize from "sequelize";
import to from "await-to-js";

import conn from "./db.connection";

import { AuthService } from "../services/authService";
import { User, users } from "../apiV1/users/user.model";

import { ProductService } from "../services/productsService";
import { Product, products } from "../apiV1/products/products.model";
import { books, Book } from "../apiV1/books/books.model";
import { BookService } from "../services/booksService";

export default (async () => {
  try {
    await conn.authenticate();

    users.sync({ force: true }).then(async () => {
      const user: User = {
        id: null,
        email: "admin@shop.com",
        password: await bcrypt.hash("password", CONFIG.SALT_ROUNDS),
        isAdmin: true
      };
      await new AuthService().register(user);
    });

    await products.sync();

    // const product: Product = {
    //   id: null,
    //   name: "CPU1",
    //   price: 55.99
    // };

    // await new ProductService().addProduct(product);
    
    await books.sync( {force: true});

    const book: Book = {
      id: null,
      bookCode: "test",
      title: "test",
      authors: "test1,test2",
      price: 99.99,
      quantity: 7,
      description: "test-test-test test-test-test"
    }
    await new BookService().addBook(book);

  } catch (err) {
    console.log(err);
    console.log(`${err} Could not Connect to the Database. Exiting Now...`);
    process.exit();
  }
})();
