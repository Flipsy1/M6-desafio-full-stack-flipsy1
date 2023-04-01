import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import { IUserUpdate } from "@/types";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/userContext";

const ModalFormUserUpdate = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { updateUser } = useAuth();
  const formschame = yup.object().shape({
    name: yup.string().nullable(),
    email: yup.string().email("deve ser um e-mail válido").nullable(),
    password: yup.string().nullable(),
    phone: yup.string().max(15).nullable(),
  });
  const [inputEmail, setInputEmail] = useState("");
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const emailError = inputEmail === "";
  const nameError = inputName === "";
  const phoneError = inputPhone === "";
  const passwordError = inputPassword === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdate>({
    resolver: yupResolver(formschame),
    defaultValues: {
      name: null,
      email: null,
      phone: null,
    },
  });

  const filterData = (data: IUserUpdate) => {
    data["email"] === "" || data["email"] === null
      ? delete data["email"]
      : data["email"];

    data["name"] === "" || data["name"] === null
      ? delete data["name"]
      : data["name"];

    data["password"] === "" || data["password"] === null
      ? delete data["password"]
      : data["password"];

    data["phone"] === "" || data["phone"] === null
      ? delete data["phone"]
      : data["phone"];

    return data;
  };

  const onFormSubmit = (formData: IUserUpdate) => {
    const data = filterData(formData);
    console.log(data);
    updateUser(data);
  };

  return (
    <>
      <Button color={"black"} variant="updateUser" onClick={onOpen}>
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
            <FormControl id="password" isInvalid={passwordError}>
              <FormLabel>Senha</FormLabel>
              <InputGroup>
                <Input
                  required
                  focusBorderColor="blue.300"
                  errorBorderColor="red.300"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onChange={(e) => setInputPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!passwordError ? (
                <FormHelperText>digite sua senha</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
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

export default ModalFormUserUpdate;
