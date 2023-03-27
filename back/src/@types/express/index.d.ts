import * as express from "express";
import { User } from "../../entities/user.entity";
import { IUserReturn } from "../../interfaces/users.interfaces";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
      };
      findUser: User;
    }
  }
}
