import {
  Badge,
  Box,
  Button,
  Grid,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";
import CreateDiagnoseForm from "@components/form/diagnose/create/CreateDiagnoseForm";
import { ErrorContext } from "@context/errContext";
import { useRouter } from "next/router";
import { useContext } from "react";
import AppointmentAPI from "resources/appointment/request";
import { defaultHandleErr } from "resources/utils";

const statusToBadge = {
  CREATED: "gray",
  ACCEPTED: "green",
  DONE: "green",
  CANCELLED: "red",
};

const toLocaleDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const AppointmentCard = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const { setMessage } = useContext(ErrorContext);

  return (
    <>
      <Grid
        alignItems={"center"}
        templateColumns="minmax(100px, max-content) 1fr"
        gap={4}
        className="w-[80vw] bg-white shadow-md rounded-md p-8"
      >
        {/* PATIENT NAME */}
        <Text className="font-bold">Pasien: </Text>
        <Input value={`${data.patient.name}`} isReadOnly variant={"filled"} />

        {/* DOCTOR NAME */}
        <Text className="font-bold">Dokter: </Text>
        <Input value={data.doctor.name} isReadOnly variant={"filled"} />

        {/* SPECIALIZATION */}
        <Text className="font-bold">Spesialisasi: </Text>
        <Input
          value={data.doctor.specialization.name}
          isReadOnly
          variant={"filled"}
        />

        {/* SCHEDULE */}
        <Text className="font-bold">Jadwal: </Text>
        <Input
          value={`${toLocaleDate(data.schedule.startTime)} - ${toLocaleDate(
            data.schedule.startTime
          )}`}
          isReadOnly
          variant={"filled"}
        />

        {/* ISSUE */}
        <Text className="font-bold">Masalah: </Text>
        <Textarea value={data.issue} variant={"filled"} isReadOnly />

        {/* CREATED AT */}
        <Text className="font-bold">Created At: </Text>
        <Input
          value={toLocaleDate(data.createdAt)}
          isReadOnly
          variant={"filled"}
        />

        {/* STATUS */}
        <Text className="font-bold">Status: </Text>
        <Box>
          <Badge colorScheme={statusToBadge[data.status]} fontSize={"sm"} p={2}>
            {data.status}
          </Badge>
          {data.status == "CREATED" && (
            <>
              <Button
                onClick={() => {
                  const rsc = new AppointmentAPI();
                  rsc.acceptAppointment(
                    data._id,
                    () => {
                      router.reload(window.location.pathname);
                    },
                    (data) => {
                      defaultHandleErr(data, setMessage);
                    }
                  );
                }}
                className="ml-5"
                colorScheme={"green"}
              >
                Accept
              </Button>
              <Button
                onClick={() => {
                  const rsc = new AppointmentAPI();
                  rsc.cancelAppointment(
                    data._id,
                    () => {
                      router.reload(window.location.pathname);
                    },
                    (data) => {
                      defaultHandleErr(data, setMessage);
                    }
                  );
                }}
                className="ml-5"
                colorScheme={"red"}
              >
                Cancel
              </Button>
            </>
          )}
          {data.status == "ACCEPTED" && (
            <Button
              className="ml-5"
              colorScheme={"green"}
              onClick={() => {
                onOpen();
              }}
            >
              Done
            </Button>
          )}
        </Box>
      </Grid>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Buat Diagnosis</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateDiagnoseForm data={data} onClose={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AppointmentCard;
