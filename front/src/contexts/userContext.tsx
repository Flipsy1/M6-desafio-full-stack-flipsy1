import api from "@/services/api";
import { IProviderProps, IUserCreate, IUserLogin, IUserUpdate } from "@/types";
import { useToast, Box } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { destroyCookie, setCookie } from "nookies";
import { createContext, useContext } from "react";
import nookies from "nookies";

interface UserProviderData {
  login: (userData: IUserLogin) => void;
  createUser(dataCreate: IUserCreate): Promise<void>;
  updateUser(data: IUserUpdate): Promise<void>;
}

const UserContext = createContext<UserProviderData>({} as UserProviderData);

export const UserProvider = ({ children }: IProviderProps) => {
  const toast = useToast();
  const router = useRouter();

  const createUser = async (userData: IUserCreate): Promise<void> => {
    await api
      .post("/users", userData)
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
              Usuario criado com sucesso !
            </Box>
          ),
        });
      })
      .catch((err) => {
        const newErr = err.response.data.message;
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

  const login = async (loginData: IUserLogin) => {
    await api
      .post("/login", loginData)
      .then((response) => {
        setCookie(null, "phonetools.token", response.data.token, {
          maxAge: 60 * 30,
          path: "/",
        });
        setCookie(null, "phonetools.userId", response.data.id, {
          maxAge: 60 * 30,
          path: "/",
        });
        setCookie(null, "phonetools.user", response.data.name, {
          maxAge: 60 * 30,
          path: "/",
        });
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
              Login realizado com sucesso !
            </Box>
          ),
        });
        router.push("/dashboard");
      })
      .catch((err) => {
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
              Erro ao logar, verifique se o e-mail e senha estão corretos
            </Box>
          ),
        });
      });
  };

  const updateUser = async (data: IUserUpdate) => {
    const cookies = nookies.get();
    const token = cookies["phonetools.token"];
    const userId = cookies["phonetools.userId"];

    await api
      .patch(`/users/${userId}`, data, {
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
              Usuario editado com sucesso !
            </Box>
          ),
        });

        destroyCookie(null, "phonetools.user");

        setCookie(null, "phonetools.user", response.data.name, {
          maxAge: 60 * 30,
          path: "/",
        });
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
    <UserContext.Provider value={{ login, createUser, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
