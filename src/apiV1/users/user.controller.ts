import * as bcrypt from "bcrypt";
import { Request, Response } from "express";
import * as jwt from "jwt-then";
import config from "../../config/config";
import { User, users } from "./user.model";


export default class UserController {
  public findAll = async (req: Request, res: Response): Promise<any> => {
    try {
      const result: User[] = await users.findAll();
      if (!result) {
        return res.status(404).send({
          success: false,
          message: 'Users not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: result
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public findOne = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await users.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(200).send({
        success: true,
        data: user
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
    const { userName, firstName, lastName, email, password } = req.body;
    try {
      const userUpdated = await users.update(
        // {
        //   $set: {
        //     userName,
        //     firstName,
        //     lastName,
        //     email,
        //     password
        //   }
        // },
        req.body,
        { where: {id: req.params.id}, returning: true}
      );
      if (!userUpdated) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      const returnUserUpdated = await users.findByPk(req.params.id);
      if(!returnUserUpdated) throw ('Error while Fetching Data')
      res.status(200).send({
        success: true,
        data: returnUserUpdated
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };

  public remove = async (req: Request, res: Response): Promise<any> => {
    try {
      const user = await users.destroy(
        {where: {id: req.params.id}}
        );
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found',
          data: null
        });
      }
      res.status(204).send({
        success: true,
        message: 'User was deleted',
        data: user
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString(),
        data: null
      });
    }
  };
}
