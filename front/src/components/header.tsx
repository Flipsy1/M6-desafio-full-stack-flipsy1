import { ReactNode } from "react";
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
  Stack,
  Text,
  background,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { destroyCookie } from "nookies";
import { signOut } from "next-auth/react";
import ModalFormLogin from "./modalFormLogin";
import ModalFormCreate from "./modalFormCadastro";
import ModalFormUserUpdate from "./modalFormUpdateUser";

interface IHeaderProps {
  name?: string;
  isLogged?: boolean;
}

const Header = ({ name, isLogged = false }: IHeaderProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const logout = () => {
    destroyCookie(null, "phonetools.token");
    destroyCookie(null, "phonetools.user");
    destroyCookie(null, "phonetools.userId");
    signOut();
    router.push("/");
  };

  return (
    <>
      <Box bg={"blue.400"} px={4}>
        <Flex
          h={16}
          alignItems={"center"}
          justifyContent={"space-between"}
          gap={"5px"}
        >
          {!isLogged ? (
            <>
              <IconButton
                size={"md"}
                icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                aria-label={"Open Menu"}
                display={{ md: "none" }}
                onClick={isOpen ? onClose : onOpen}
              />
            </>
          ) : null}
          <HStack
            spacing={8}
            alignItems={"center"}
            width={"full"}
            justifyContent={"space-between"}
          >
            <Box>
              <Text fontWeight={"bold"} fontSize={20} color={"white"}>
                PhonesTools
              </Text>
            </Box>
            {!isLogged ? (
              <>
                <HStack
                  color={"white"}
                  as={"nav"}
                  spacing={4}
                  display={{ base: "none", md: "flex" }}
                >
                  <ModalFormCreate variant="default" />
                  <ModalFormLogin />
                </HStack>
              </>
            ) : null}
          </HStack>
          <Flex alignItems={"center"} gap={"10px"}>
            {isLogged ? (
              <>
                <Text color={"white"} paddingRight={2}>
                  {name}
                </Text>
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <SettingsIcon />
                  </MenuButton>
                  <MenuList bg={"blue.600"} p={"12px"} textAlign={"center"}>
                    <ModalFormUserUpdate />
                    <Button
                      color={"black"}
                      variant="updateUser"
                      onClick={() => logout()}
                    >
                      Sair
                    </Button>
                  </MenuList>
                </Menu>
              </>
            ) : null}
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={6} color={"white"}>
              <ModalFormCreate variant="default" />
              <ModalFormLogin />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
