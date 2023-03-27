import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";

const deleteContactService = async (contactId: string): Promise<void> => {
  const contactsRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const contact = await contactsRepository.findOne({
    where: {
      id: contactId,
    },
  });

  await contactsRepository.softRemove(contact!);

  return;
};

export default deleteContactService;
