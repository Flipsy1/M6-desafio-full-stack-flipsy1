import jwt from "jsonwebtoken";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../erros";
import { User } from "../../entities/user.entity";
import { Repository } from "typeorm";
import { compare } from "bcryptjs";
import { ILogin } from "../../interfaces/login.interfaces";
import "dotenv/config";

const createLoginService = async (loginData: ILogin): Promise<string> => {
  const userRepository: Repository<User> = AppDataSource.getRepository(User);

  const user: User | null = await userRepository.findOneBy({
    email: loginData.email,
  });

  if (!user) {
    throw new AppError("Wrong email or password", 401);
  }

  const passwordMatch = await compare(loginData.password, user.password);

  if (!passwordMatch) {
    throw new AppError("Wrong email or password", 401);
  }

  const token: string = jwt.sign({}, process.env.SECRET_KEY!, {
    subject: user.id,
    expiresIn: "24h",
  });

  return token;
};

export default createLoginService;
