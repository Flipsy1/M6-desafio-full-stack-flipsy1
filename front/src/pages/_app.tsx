import { ContactProvider } from "@/contexts/contactsContext";
import { UserProvider } from "@/contexts/userContext";
import custonTheme from "@/styles/themes";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={custonTheme}>
      <UserProvider>
        <ContactProvider>
          <Component {...pageProps} />
        </ContactProvider>
      </UserProvider>
    </ChakraProvider>
  );
}
