import { z } from "zod";
import { allContactsReturnSchema } from "./cantacts.schemas";

const userSchema = z.object({
  name: z.string().min(3).max(80),
  email: z.string().email().min(10).max(60),
  password: z.string().min(4).max(30),
  phone: z.string().min(6).max(15),
});

const userUpdateSchema = userSchema.partial();

const returnUserContactSchema = userSchema
  .extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    deletedAt: z.date().nullable(),
  })
  .omit({ password: true });

const returnUserSchema = userSchema
  .extend({
    id: z.string(),
    createdAt: z.date(),
    updatedAt: z.date().nullable(),
    deletedAt: z.date().nullable(),
    contacts: allContactsReturnSchema.nullish(),
  })
  .omit({ password: true });

const returnAllUsersSchema = returnUserSchema.array();

export {
  userSchema,
  userUpdateSchema,
  returnUserSchema,
  returnUserContactSchema,
  returnAllUsersSchema,
};
