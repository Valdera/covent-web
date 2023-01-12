import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { ErrorContext } from "@context/errContext";
import { useContext } from "react";

const ErrorModal = () => {
  const { message, setMessage } = useContext(ErrorContext);

  return (
    <>
      <Modal isOpen={message != null} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Error</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{message}</ModalBody>
          <ModalFooter>
            <Button
              onClick={() => {
                setMessage(null);
              }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ErrorModal;
