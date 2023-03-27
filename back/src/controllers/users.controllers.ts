import { Request, Response } from "express";
import { User } from "../entities/user.entity";
import { IUser, IUserUpdate } from "../interfaces/users.interfaces";
import createUserService from "../services/users/createUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import getUserService from "../services/users/getUser.service";
import listAllUsersService from "../services/users/listAllUsers.Service";
import updateUserService from "../services/users/updateUser.service";

const createUserController = async (req: Request, res: Response) => {
  const userData: IUser = req.body;

  const newUser = await createUserService(userData);

  return res.status(201).json(newUser);
};

const listAllUsersController = async (req: Request, res: Response) => {
  const allUsers = await listAllUsersService();

  return res.status(200).json(allUsers);
};

const getUserController = async (req: Request, res: Response) => {
  const findUser: User = req.findUser;

  const user = await getUserService(findUser);

  return res.status(200).json(user);
};

const updateUserController = async (req: Request, res: Response) => {
  const oldUser: User = req.findUser;
  const updateUserData: IUserUpdate = req.body;

  const updatedUser = await updateUserService(oldUser, updateUserData);

  return res.status(200).json(updatedUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const findUser = req.findUser;

  await deleteUserService(findUser);

  return res.status(204).send();
};

export {
  createUserController,
  listAllUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
};
