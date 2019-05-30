import sequelize from "../../config/db.connection";
import * as Sequelize from "sequelize";

export const products: any = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  bookCode: {
    type:Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3,30],
        msg: "Book code must conatain atleast 3 symbols"
      }
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [3,30],
        msg: "Name must conatain atleast 3 symbols"
      }
    }
  },
  authors: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [2, 30],
        msg: "Authors must conatain atleast 2 symbols"
      }
    }
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
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      isNumeric: {
        msg: "Quantity must be a number"
      }
    }
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      len: {
        args: [5, 200],
        msg: "Description must conatain atleast 5 symbols"
      }
    }
  },
});

export interface Product {
  id: number;
  bookCode: string;
  name: string;
  authors: string[];
  price: number;
  quantity: number;
  pages?: number;
  rating?: number;
  image?: string;
  description?: string;
}
