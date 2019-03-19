import sequelize from "../../config/db.connection";
import * as Sequelize from "sequelize";

export const users: any = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: { isEmail: { msg: "Invalid email" } }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  }
});

export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
}
