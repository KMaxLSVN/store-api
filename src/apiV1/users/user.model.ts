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
    allowNull: false,
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [3,3],
        msg: "Password must conatain atleast 3 symbols"
      }
    }
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [2,2],
        msg: 'First Name must be atleast 2 characters in length'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: true,
    validate: {
      len: {
        args: [2,2],
        msg: 'Last Name must be atleast 2 characters in length'
      }
    }
  }
});

export interface User {
  id: number;
  email: string;
  password: string;
  isAdmin: boolean;
  userName?: string;
  firstName?: string;
  lastName?: string;
}
