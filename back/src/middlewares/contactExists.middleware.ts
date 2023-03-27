import { Response, Request, NextFunction } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Contact } from "../entities/contacts.entity";
import { AppError } from "../erros";

const contactExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const findContact = await contactRepository.findOne({
    where: {
      id: req.params.id,
    },
  });

  if (!findContact) {
    throw new AppError("Contact not found!", 404);
  }

  return next();
};

export default contactExistsMiddleware;
