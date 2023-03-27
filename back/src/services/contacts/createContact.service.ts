import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Contact } from "../../entities/contacts.entity";
import { User } from "../../entities/user.entity";
import { IContact, IcontactReturn } from "../../interfaces/contacts.interfaces";
import { contactReturnSchema } from "../../schemas/cantacts.schemas";

const createContactService = async (
  userId: string,
  contactData: IContact
): Promise<IcontactReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);
  const contactRepository: Repository<Contact> =
    AppDataSource.getRepository(Contact);

  const user: User | null = await userRepository.findOneBy({
    id: userId,
  });

  const newContact: Contact = contactRepository.create({
    ...contactData,
    user: user!,
  });
  await contactRepository.save(newContact);

  const returnContact = contactReturnSchema.parse(newContact);

  return returnContact;
};

export default createContactService;
