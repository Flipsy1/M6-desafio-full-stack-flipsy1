import { Request, Response, NextFunction } from "express";
import { AppError } from "../erros";
import jwt from "jsonwebtoken";
import "dotenv/config";

const tokenIsValidmiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token is missing", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: decoded.sub as string,
    };

    return next();
  });
};

export default tokenIsValidmiddleware;
