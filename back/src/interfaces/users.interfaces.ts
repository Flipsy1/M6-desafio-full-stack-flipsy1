import {
  userSchema,
  returnUserSchema,
  returnAllUsersSchema,
} from "../schemas/user.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type IUser = z.infer<typeof userSchema>;
type IUserReturn = z.infer<typeof returnUserSchema>;
type IAllUsersReturn = z.infer<typeof returnAllUsersSchema>;
type IUserUpdate = DeepPartial<IUser>;

export { IUser, IUserReturn, IAllUsersReturn, IUserUpdate };
