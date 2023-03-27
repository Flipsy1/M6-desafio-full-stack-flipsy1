import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";
import { IAllUsersReturn } from "../../interfaces/users.interfaces";
import { returnAllUsersSchema } from "../../schemas/user.schemas";

const listAllUsersService = async (): Promise<IAllUsersReturn> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const allUsers: Array<User> = await userRepository.find({
    relations: {
      contacts: true,
    },
  });

  const users = returnAllUsersSchema.parse(allUsers);

  return users;
};

export default listAllUsersService;
