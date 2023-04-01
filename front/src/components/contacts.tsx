import { ContactCont } from "@/contexts/contactsContext";
import {
  Box,
  Center,
  chakra,
  ListItem,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import ContactCard from "./contactCard";
import ModalFormContactCreate from "./modalFormCreateContact.tsx";

export default function CardList() {
  const { contacts } = ContactCont();

  return (
    <>
      <Box maxW="7xl" mx={"auto"} pt={5} px={{ base: 2, sm: 12, md: 17 }}>
        <chakra.h1
          textAlign={"center"}
          fontSize={"4xl"}
          py={5}
          fontWeight={"bold"}
        >
          Contatos
        </chakra.h1>
        <ModalFormContactCreate />
        {contacts.length ? (
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
            {contacts.map((contact, index) => {
              return (
                <ContactCard
                  key={index}
                  id={contact.id}
                  name={contact.name}
                  email={contact.email}
                  phone={contact.phone}
                />
              );
            })}
          </SimpleGrid>
        ) : (
          <Center>Sem contatos...</Center>
        )}
      </Box>
    </>
  );
}
