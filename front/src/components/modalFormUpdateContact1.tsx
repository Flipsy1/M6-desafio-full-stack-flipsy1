import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IContactUpdate } from "@/types";
import { useState } from "react";
import { ContactCont } from "@/contexts/contactsContext";

interface IUpdateModalParam {
  contactId: string;
}

const ModalFormContactUpdate = ({ contactId }: IUpdateModalParam) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateContact } = ContactCont();
  const formschame = yup.object().shape({
    name: yup.string().nullable(),
    email: yup.string().email("deve ser um e-mail válido").nullable(),
    phone: yup.string().max(15).nullable(),
  });
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const emailError = inputEmail === "";
  const nameError = inputName === "";
  const phoneError = inputPhone === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IContactUpdate>({
    resolver: yupResolver(formschame),
    defaultValues: {
      name: null,
      email: null,
      phone: null,
    },
  });

  const filterData = (data: IContactUpdate) => {
    data["email"] === "" || data["email"] === null
      ? delete data["email"]
      : data["email"];
    data["name"] === "" || data["name"] === null
      ? delete data["name"]
      : data["name"];
    data["phone"] === "" || data["phone"] === null
      ? delete data["phone"]
      : data["phone"];

    return data;
  };

  const onFormSubmit = (formData: IContactUpdate) => {
    const data = filterData(formData);
    console.log(data);
    updateContact(contactId, data);
  };

  return (
    <>
      <Button variant="createContact" onClick={onOpen}>
        Editar contato
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar contato</ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="name" isInvalid={nameError}>
              <FormLabel>Nome</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="name"
                {...register("name")}
                onChange={(e) => setInputName(e.target.value)}
              />
              {!nameError ? (
                <FormHelperText>Digite seu nome</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="email" isInvalid={emailError}>
              <FormLabel>E-mail</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="email"
                {...register("email")}
                onChange={(e) => setInputEmail(e.target.value)}
              />
              {!emailError ? (
                <FormHelperText>Digite seu e-mail</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>
            <FormControl id="phone" isInvalid={phoneError}>
              <FormLabel>Phone</FormLabel>
              <Input
                required
                focusBorderColor="blue.300"
                errorBorderColor="red.300"
                type="phone"
                {...register("phone")}
                onChange={(e) => setInputPhone(e.target.value)}
              />
              {!phoneError ? (
                <FormHelperText>Digite seu phone</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              size="lg"
              variant={"default"}
              onClick={handleSubmit(onFormSubmit)}
              _hover={{
                bg: "blue.700",
              }}
            >
              Confirmar
            </Button>
            <Button size="lg" onClick={onClose}>
              Voltar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalFormContactUpdate;
