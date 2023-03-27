import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user.entity";

const deleteUserService = async (findUser: User): Promise<void> => {
  const userRepository = AppDataSource.getRepository(User);

  await userRepository.softRemove(findUser);

  return;
};

export default deleteUserService;
