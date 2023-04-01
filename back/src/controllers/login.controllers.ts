import { Request, Response } from "express";
import { ILogin } from "../interfaces/login.interfaces";
import createLoginService from "../services/login/createLogin.service";

export const createLoginController = async (req: Request, res: Response) => {
  const loginData: ILogin = req.body;

  const login = await createLoginService(loginData);

  return res.status(200).json(login);
};
