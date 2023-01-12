import { ChakraProvider } from "@chakra-ui/react";
import Footer from "@components/footer/Footer";
import ErrorModal from "@components/modal/error/ErrorModal";
import Navbar from "@components/navbar/Navbar";
import "@styles/globals.css";
import theme from "../chakra.config";
import { ErrorContextProvider } from "../context/errContext";

function App({ Component, pageProps }) {
  return (
    <ErrorContextProvider>
      <ChakraProvider theme={theme}>
        <>
          <ErrorModal />
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </>
      </ChakraProvider>
    </ErrorContextProvider>
  );
}

export default App;
