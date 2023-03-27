import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";
import { AppError } from "../erros";

const userExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOne({
    where: {
      id: req.params.id,
    },
    relations: {
      contacts: true,
    },
  });

  if (!findUser) {
    throw new AppError("User not found!", 404);
  }

  req.findUser = findUser;

  return next();
};

export default userExistsMiddleware;
