import { ReactNode } from "react";

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserCreate {
  name: string;
  email: string;
  password: string;
  phone: string;
}

export interface IContactCreate {
  name: string;
  email: string;
  phone: string;
}

export interface IContactUpdate {
  name?: string | null;
  email?: string | null;
  phone?: string | null;
}

export interface IUserUpdate {
  name?: string | null;
  email?: string | null;
  password?: string | null;
  phone?: string | null;
}

export interface IProviderProps {
  children: ReactNode;
}

export interface IContact {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export interface IContacts {
  id: string;
  name: string;
  email: string;
  phone: string;
}
