import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/user.schemas";

const listContactsByUserService = async (
  userId: string
): Promise<IUserReturn> => {
  const usersRepository: Repository<User> = AppDataSource.getRepository(User);

  const user = await usersRepository.findOne({
    where: {
      id: userId,
    },
    relations: {
      contacts: true,
    },
  });

  const returnUser = returnUserSchema.parse(user!);

  return returnUser;
};

export default listContactsByUserService;
