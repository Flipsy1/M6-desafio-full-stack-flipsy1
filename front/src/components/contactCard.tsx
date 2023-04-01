import { ContactCont } from "@/contexts/contactsContext";
import { IContacts } from "@/types";
import {
  Button,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
} from "@chakra-ui/react";
import ModalFormContactUpdate from "./modalFormUpdateContact1";

function ContactCard({ name, email, phone, id }: IContacts) {
  const { deleteContact } = ContactCont();
  return (
    <>
      <Stat
        px={{ base: 4, md: 8 }}
        py={"5"}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
        id={id}
      >
        <StatLabel fontWeight={"medium"} isTruncated>
          {name}
        </StatLabel>
        <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
          {email}
        </StatNumber>
        <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
          {phone}
        </StatNumber>
        <Center alignItems={"baseline"} pt={"10px"}>
          <ModalFormContactUpdate contactId={id} />
          <Button onClick={() => deleteContact(id)}>Excluir</Button>
        </Center>
      </Stat>
    </>
  );
}

export default ContactCard;
