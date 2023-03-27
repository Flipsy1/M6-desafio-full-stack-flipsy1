import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../erros";
import { IUserUpdate } from "../interfaces/users.interfaces";

const emailAndPhoneUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const data: IUserUpdate = req.body;

  if (data.email) {
    const emailExists = await userRepository.findOne({
      where: {
        email: data.email!,
      },
    });

    if (emailExists) {
      throw new AppError("Email unavailable", 404);
    }
  }

  if (data.phone) {
    const phoneExists = await userRepository.findOne({
      where: {
        phone: data.phone!,
      },
    });

    if (phoneExists) {
      throw new AppError("Phone unavailable", 404);
    }
  }

  return next();
};

export default emailAndPhoneUniqueMiddleware;
