import {
  Button,
  Grid,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import ScheduleCard from "../schedule/ScheduleCard";

const mock = [
  {
    _id: "63bb438ab99d80e393cdf025",
    totalPatient: 5,
    doctor: "63bb05be2c864ea489620cbc",
    startTime: "2023-01-20T10:20:00.000Z",
    endTime: "2023-01-20T10:20:00.000Z",
    __v: 0,
    id: "63bb438ab99d80e393cdf025",
  },
  {
    _id: "63bb438ab99d80e393cdf025",
    totalPatient: 5,
    doctor: "63bb05be2c864ea489620cbc",
    startTime: "2023-01-20T10:20:00.000Z",
    endTime: "2023-01-20T10:20:00.000Z",
    __v: 0,
    id: "63bb438ab99d80e393cdf025",
  },
  {
    _id: "63bb438ab99d80e393cdf025",
    totalPatient: 5,
    doctor: "63bb05be2c864ea489620cbc",
    startTime: "2023-01-20T10:20:00.000Z",
    endTime: "2023-01-20T10:20:00.000Z",
    __v: 0,
    id: "63bb438ab99d80e393cdf025",
  },
  {
    _id: "63bb438ab99d80e393cdf025",
    totalPatient: 5,
    doctor: "63bb05be2c864ea489620cbc",
    startTime: "2023-01-20T10:20:00.000Z",
    endTime: "2023-01-20T10:20:00.000Z",
    __v: 0,
    id: "63bb438ab99d80e393cdf025",
  },
];

const DoctorCard = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scheduleList, setScheduleList] = useState([]);

  const handleOpen = () => {
    setScheduleList(mock);
    onOpen();
  };

  return (
    <>
      <Grid
        alignItems={"center"}
        templateColumns="minmax(100px, max-content) 1fr"
        gap={4}
        className="w-[80vw] bg-white shadow-md rounded-md p-8"
      >
        {/* DOCTOR NAME */}
        <Text className="font-bold">Dokter: </Text>
        <Input value={data.name} isReadOnly variant={"filled"} />

        {/* SPECIALIZATION */}
        <Text className="font-bold">Spesialisasi: </Text>
        <Input value={data.specialization.name} isReadOnly variant={"filled"} />

        <HStack className="mt-2" gridColumn={"1 / span 2"}>
          <Button onClick={handleOpen}>Lihat Jadwal</Button>
          {/* <Button colorScheme={"red"}>Delete</Button> */}
        </HStack>
      </Grid>
      <Modal
        scrollBehavior={"inside"}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Daftar Jadwal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {scheduleList.map((v) => (
              <ScheduleCard key={data.id} data={v} />
            ))}
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DoctorCard;
