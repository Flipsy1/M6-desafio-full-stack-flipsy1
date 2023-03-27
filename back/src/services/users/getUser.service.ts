import { User } from "../../entities/user.entity";
import { IUserReturn } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../schemas/user.schemas";

const getUserService = async (findUser: User): Promise<IUserReturn> => {
  const user = returnUserSchema.parse(findUser);

  return user;
};

export default getUserService;
