import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contacts.entity";
import { AppError } from "../erros";
import { IContactUpdate } from "../interfaces/contacts.interfaces";

const contactEmailAndPhoneUniqueMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const data: IContactUpdate = req.body;

  if (data.email) {
    const emailExists = await contactRepository.findOne({
      where: {
        email: data.email!,
      },
    });

    if (emailExists) {
      throw new AppError("Email unavailable", 404);
    }
  }

  if (data.phone) {
    const phoneExists = await contactRepository.findOne({
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

export default contactEmailAndPhoneUniqueMiddleware;
