import { z } from "zod";
import { DeepPartial } from "typeorm";
import {
  allContactsReturnSchema,
  contactReturnSchema,
  contactSchema,
} from "../schemas/cantacts.schemas";

type IContact = z.infer<typeof contactSchema>;
type IcontactReturn = z.infer<typeof contactReturnSchema>;
type IAllContactsReturn = z.infer<typeof allContactsReturnSchema>;
type IContactUpdate = DeepPartial<IContact>;

export { IContact, IcontactReturn, IAllContactsReturn, IContactUpdate };
