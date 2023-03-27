import "express-async-errors";
import express, { Application } from "express";
import { handleError } from "./erros";
import loginRoutes from "./routes/login.routes";
import usersRoutes from "./routes/users.routes";
import contactsRoutes from "./routes/contacts.routes";

const app: Application = express();
app.use(express.json());

app.use("/users", usersRoutes);
app.use("/login", loginRoutes);
app.use("/contacts", contactsRoutes);

app.use(handleError);

export default app;
