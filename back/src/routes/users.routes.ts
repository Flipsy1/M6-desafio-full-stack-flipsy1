import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  getUserController,
  listAllUsersController,
  updateUserController,
} from "../controllers/users.controllers";
import dataIsValidMiddleware from "../middlewares/dataIsValidMiddleware";
import emailAndPhoneUniqueMiddleware from "../middlewares/emailAndPhoneUnique.middleware";
import tokenIsValidmiddleware from "../middlewares/tokenIsValidMiddleware";
import userExistsMiddleware from "../middlewares/userExists.middleware";
import { userSchema, userUpdateSchema } from "../schemas/user.schemas";

const usersRoutes: Router = Router();

usersRoutes.post(
  "",
  dataIsValidMiddleware(userSchema),
  emailAndPhoneUniqueMiddleware,
  createUserController
);
usersRoutes.get("", tokenIsValidmiddleware, listAllUsersController);
usersRoutes.get(
  "/:id",
  tokenIsValidmiddleware,
  userExistsMiddleware,
  getUserController
);
usersRoutes.patch(
  "/:id",
  dataIsValidMiddleware(userUpdateSchema),
  userExistsMiddleware,
  emailAndPhoneUniqueMiddleware,
  updateUserController
);
usersRoutes.delete(
  "/:id",
  tokenIsValidmiddleware,
  userExistsMiddleware,
  deleteUserController
);

export default usersRoutes;
