import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { User } from "../users/user.model";
import { AuthService } from "../../services/authService";
import errorRegister from "../../helpers/errorRegister";
import { sessionHandler } from "../../helpers/sessionHandler";




export default class UserController {
  public authenticate = async (req:  Request, res: Response): Promise<any> => {
    const { email, password } = req.body;
    try {
      const user = await new AuthService().getUserByEmail(email);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "User not found"
        });
      }
      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: "Not authorized"
        });
      }
      const token = await jwt.sign(
        { email, isAdmin: user.isAdmin },
        config.JWT_ENCRYPTION,
        {
          expiresIn: config.JWT_EXPIRATION
        }
      );
      sessionHandler.setSession(req, {user, token} );
      sessionHandler.getCurrentSeesion(req);
      res.status(200).send({
        success: true,
        message: "Token generated Successfully",
        token: token
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  };

  public getSession = async (req: Request, res: Response) => {
    const user = sessionHandler.getCurrentSeesion(req)
    res.status(200).send(user);
  }

  public register = async (req: Request, res: Response): Promise<any> => {
    const user: User = {
      id: null,
      email: req.body.email,
      isAdmin: false,
      password: await bcrypt.hash(req.body.password, config.SALT_ROUNDS),
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    try {
     let newUser = await new AuthService().register(user);
      res.status(200).send({
        success: true,
        message: "User Successfully created",
        data: newUser
      });
    } catch (err) {
      if(err instanceof errorRegister){
        res.status(400).send({
          success: false,
          message: err.message          
        })
      } else {
        res.status(500).send({
          success: false,
          message: err.errors[0].message
        });
      }
    }
  };
}
