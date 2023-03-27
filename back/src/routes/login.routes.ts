import { Router } from "express";
import { createLoginController } from "../controllers/login.controllers";
import dataIsValidMiddleware from "../middlewares/dataIsValidMiddleware";
import { createLoginSchema } from "../schemas/login.schemas";

const loginRoutes: Router = Router();

loginRoutes.post(
  "",
  dataIsValidMiddleware(createLoginSchema),
  createLoginController
);

export default loginRoutes;
