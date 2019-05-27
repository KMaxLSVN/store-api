import { users, User } from "../apiV1/users/user.model";
import * as Sequelize from "sequelize";
import sequelize from "../config/db.connection";
import errorRegister from "../helpers/errorRegister";

export class AuthService {
  public async getUserByEmail(email: string) {
    var user = (await users.findOne({
      where: { email: email }
    })) as User;
    if (user) return user;
  }

  public async register(user: User) {
    // await users.create(user);
    let regUser = (await users.findOne({
      where: { email: user.email }
    }))
    if(!regUser){
      users.create(user);
    } else {
      throw new errorRegister('User is already existed', 400);
    }
  }
}
