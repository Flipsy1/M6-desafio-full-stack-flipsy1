import api from "@/services/api";
import {
  IContactCreate,
  IContactUpdate,
  IContacts,
  IProviderProps,
} from "@/types";
import { createContext, useContext, useEffect, useState } from "react";
import nookies from "nookies";
import { Box, useToast } from "@chakra-ui/react";

interface IContactProviderData {
  contacts: IContacts[];
  deleteContact(contactId: string): Promise<void>;
  createNewContact(contactData: IContactCreate): Promise<void>;
  updateContact(contactId: string, data: IContactUpdate): Promise<void>;
}

const ContactContext = createContext({} as IContactProviderData);

export const ContactProvider = ({ children }: IProviderProps) => {
  const toast = useToast();
  const cookies = nookies.get();
  const token = cookies["phonetools.token"];
  const userId = cookies["phonetools.userId"];
  const [contacts, setContacts] = useState([] as IContacts[]);

  useEffect(() => {
    const getContacts = async () => {
      await api
        .get(`/contacts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setContacts(response.data.contacts);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getContacts();
  }, [token, userId]);

  const deleteContact = async (contactId: string) => {
    await api
      .delete(`/contacts/${contactId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Contato excluído com sucesso !
            </Box>
          ),
        });
        const removeContact = contacts.filter(
          (contact) => contact.id !== contactId
        );
        setContacts(removeContact);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createNewContact = async (contactData: IContactCreate) => {
    await api
      .post("/contacts", contactData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Contato criado com sucesso !
            </Box>
          ),
        });

        setContacts([...contacts, response.data]);
      })
      .catch((err) => {
        const newErr = err.response.data.message;
        console.error(err);
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              {newErr}
            </Box>
          ),
        });
      });
  };

  const updateContact = async (contactId: string, data: IContactUpdate) => {
    await api
      .patch(`/contacts/${contactId}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        toast({
          title: "sucess",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"green.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              Contato editado com sucesso !
            </Box>
          ),
        });

        const newContacts = contacts.map((contact) => {
          if (contactId === contact.id) {
            return { ...contact, ...response.data };
          } else {
            return contact;
          }
        });

        setContacts(newContacts);
      })
      .catch((err) => {
        const newErr = err.response.data.message;
        console.error(err);
        toast({
          title: "error",
          variant: "solid",
          position: "top-right",
          isClosable: true,
          render: () => (
            <Box
              color={"gray.50"}
              p={3}
              bg={"red.600"}
              fontWeight={"bold"}
              borderRadius={"md"}
            >
              {newErr}
            </Box>
          ),
        });
      });
  };

  return (
    <ContactContext.Provider
      value={{ contacts, deleteContact, createNewContact, updateContact }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export const ContactCont = () => useContext(ContactContext);
