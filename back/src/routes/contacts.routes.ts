import { Router } from "express";
import {
  createContactController,
  deleteContactController,
  listContactsByUserController,
  updateContactController,
} from "../controllers/contacts.controllers";
import contactExistsMiddleware from "../middlewares/contactExists.middleware";
import contactEmailAndPhoneUniqueMiddleware from "../middlewares/contactsEmailAndPhoneUnique.middleware";
import dataIsValidMiddleware from "../middlewares/dataIsValidMiddleware";
import tokenIsValidmiddleware from "../middlewares/tokenIsValidMiddleware";
import userExistsMiddleware from "../middlewares/userExists.middleware";
import {
  contactSchema,
  updateContactSchema,
} from "../schemas/cantacts.schemas";

const contactsRoutes: Router = Router();

contactsRoutes.post(
  "",
  tokenIsValidmiddleware,
  dataIsValidMiddleware(contactSchema),
  contactEmailAndPhoneUniqueMiddleware,
  createContactController
);
contactsRoutes.get(
  "",
  tokenIsValidmiddleware,
  userExistsMiddleware,
  listContactsByUserController
);
contactsRoutes.delete(
  "/:id",
  tokenIsValidmiddleware,
  contactExistsMiddleware,
  deleteContactController
);
contactsRoutes.patch(
  "/:id",
  tokenIsValidmiddleware,
  contactExistsMiddleware,
  dataIsValidMiddleware(updateContactSchema),
  updateContactController
);

export default contactsRoutes;
