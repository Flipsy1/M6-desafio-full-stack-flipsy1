import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import {
  IcontactReturn,
  IContactUpdate,
} from "../../interfaces/contacts.interfaces";
import { contactReturnSchema } from "../../schemas/cantacts.schemas";

const updateContactService = async (
  contactId: string,
  newData: IContactUpdate
): Promise<IcontactReturn> => {
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const oldContact = await contactRepository.findOne({
    where: {
      id: contactId,
    },
  });

  const newContact = await contactRepository.create({
    ...oldContact,
    ...newData,
  });
  await contactRepository.save(newContact);

  const updatedContact = contactReturnSchema.parse(newContact);

  return updatedContact;
};

export default updateContactService;
