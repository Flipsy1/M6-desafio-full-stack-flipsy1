import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(4).max(80),
  email: z.string().email().min(4).max(60),
  phone: z.string().min(6).max(15),
});

const updateContactSchema = contactSchema.partial();

const contactReturnSchema = contactSchema.extend({
  id: z.string(),
  createdAt: z.date().nullish(),
  updatedAt: z.date().nullable(),
  deletedAt: z.date().nullable(),
});

const allContactsReturnSchema = contactReturnSchema.array();

export {
  contactSchema,
  updateContactSchema,
  contactReturnSchema,
  allContactsReturnSchema,
};
