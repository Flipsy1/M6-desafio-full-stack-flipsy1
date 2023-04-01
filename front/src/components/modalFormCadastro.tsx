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
import { IUserCreate } from "@/types";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useAuth } from "@/contexts/userContext";

interface IModalCreate {
  variant: string;
}

const ModalFormCreate = ({ variant }: IModalCreate) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { createUser } = useAuth();
  const formschame = yup.object().shape({
    name: yup.string().required("Nome obrigatório"),
    email: yup
      .string()
      .email("deve ser um e-mail válido")
      .required("e-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    phone: yup.string().required("Phone obrigatório").max(15),
  });
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [inputName, setInputName] = useState("");
  const [inputPhone, setInputPhone] = useState("");

  const emailError = inputEmail === "";
  const passwordError = inputPassword === "";
  const nameError = inputName === "";
  const phoneError = inputPhone === "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserCreate>({
    resolver: yupResolver(formschame),
  });

  const onFormSubmit = (formData: IUserCreate) => {
    createUser(formData);
  };

  return (
    <>
      <Button variant={variant} onClick={onOpen}>
        Cadastro
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cadastro</ModalHeader>
          <ModalBody pb={6}>
            <FormControl id="name" isRequired isInvalid={nameError}>
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
            <FormControl id="email" isRequired isInvalid={emailError}>
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
            <FormControl id="password" isRequired isInvalid={passwordError}>
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
            <FormControl id="phone" isRequired isInvalid={phoneError}>
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
              Cadastrar
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

export default ModalFormCreate;
