import CONFIG from "../config/config";
import { Product } from "../apiV1/products/products.model";
import conn from "../config/db.connection";
import to from "await-to-js";
import * as Sequelize from "sequelize";
import sequelize from "../config/db.connection";

import { products } from "../apiV1/products/products.model";
import errorRegister from "../helpers/errorRegister";

export class ProductService {
  public async getProducts(page: number): Promise<Product[]> {
    return await products.findAll({
      limit: 10,
      offset: page
    });
  }

  public async getProductByCode(bookCode: string){
    const product = (await products.findOne({
      where: { bookCode: bookCode }
    })) as Product;
    if (product) return product;
  }

  public async addProduct(product: Product): Promise<Product> {
    let isExist = (await products.findOne({
      where: { bookCode: product.bookCode }
    })) as Product;
    if(!isExist){
      return products.create(product);
    } else {
      throw new errorRegister('Product is existed', 400)
    }
  }
}
