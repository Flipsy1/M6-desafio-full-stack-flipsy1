import Header from "@/components/header";
import ModalFormCreate from "@/components/modalFormCadastro";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";

const Home = () => {
  return (
    <>
      <Header />
      <Container mt={"10"} maxW={"5xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          borderRadius={"2xl"}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            O melhor lugar para
            <br />
            <Text as={"span"} color={"green.400"}>
              armazenar seus contatos
            </Text>
          </Heading>
          <Text color={"gray.500"} paddingLeft={"10%"} paddingRight={"10%"}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic,
            laudantium. Iusto debitis adipisci officia ab porro praesentium
            suscipit possimus dolor consequuntur, at tempore similique molestias
            delectus. Dolorum magnam at accusamus?
          </Text>
          <Stack
            direction={"column"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <ModalFormCreate variant="principal" />
          </Stack>
        </Stack>
      </Container>
    </>
  );
};

export default Home;
