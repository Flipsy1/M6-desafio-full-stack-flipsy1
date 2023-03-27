import { Request, Response } from "express";
import { IContact } from "../interfaces/contacts.interfaces";
import createContactService from "../services/contacts/createContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import listContactsByUserService from "../services/contacts/listContactsByUser.service";
import updateContactService from "../services/contacts/updateContact.service";

const createContactController = async (req: Request, res: Response) => {
  const userId = req.user.id;
  const contactData: IContact = req.body;

  const newContact = await createContactService(userId, contactData);

  return res.status(201).json(newContact);
};

const listContactsByUserController = async (req: Request, res: Response) => {
  const userId: string = req.user.id;

  const userContacts = await listContactsByUserService(userId);

  return res.status(200).json(userContacts);
};

const deleteContactController = async (req: Request, res: Response) => {
  const contactId: string = req.params.id;

  await deleteContactService(contactId);

  return res.status(204).send();
};

const updateContactController = async (req: Request, res: Response) => {
  const contactId = req.params.id;
  const updateData = req.body;

  const updatedContact = await updateContactService(contactId, updateData);

  return res.status(200).json(updatedContact);
};

export {
  createContactController,
  listContactsByUserController,
  deleteContactController,
  updateContactController,
};
