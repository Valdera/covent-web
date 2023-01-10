import {
  Button,
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
  VStack,
} from "@chakra-ui/react";
import FloatingActionButton from "@components/button/floating-action/FloatingActionButton";
import DoctorCard from "@components/card/doctor/DoctorCard";
import CreateDoctorForm from "@components/form/doctor/create/CreateDoctorForm";
import CreateScheduleForm from "@components/form/schedule/create/CreateSchedule";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdPeople } from "react-icons/md";

const mock = [
  {
    _id: "63bb05be2c864ea489620cbc",
    name: "dr. Angelica",
    specialization: {
      _id: "63bb04982c864ea489620cb4",
      name: "Umum",
      id: "63bb04982c864ea489620cb4",
    },
    __v: 0,
  },
  {
    _id: "63bb05d82c864ea489620cc2",
    name: "dr. Ahmad",
    specialization: {
      _id: "63bb04982c864ea489620cb4",
      name: "Umum",
      id: "63bb04982c864ea489620cb4",
    },
    __v: 0,
  },
  {
    _id: "63bb05de2c864ea489620cc4",
    name: "dr. Arigi",
    specialization: {
      _id: "63bb04982c864ea489620cb4",
      name: "Umum",
      id: "63bb04982c864ea489620cb4",
    },
    __v: 0,
  },
  {
    _id: "63bb05f32c864ea489620cc6",
    name: "dr. Aldi",
    specialization: {
      _id: "63bb04942c864ea489620cb2",
      name: "Anak",
      id: "63bb04942c864ea489620cb2",
    },
    __v: 0,
  },
  {
    _id: "63bb06032c864ea489620cc8",
    name: "dr. Anto",
    specialization: {
      _id: "63bb04942c864ea489620cb2",
      name: "Anak",
      id: "63bb04942c864ea489620cb2",
    },
    __v: 0,
  },
  {
    _id: "63bb06162c864ea489620cca",
    name: "dr. Rizki",
    specialization: {
      _id: "63bb04a02c864ea489620cb6",
      name: "THT",
      id: "63bb04a02c864ea489620cb6",
    },
    __v: 0,
  },
  {
    _id: "63bb06372c864ea489620ccc",
    name: "dr. Adela",
    specialization: {
      _id: "63bb048e2c864ea489620cb0",
      name: "Orthopedi",
      id: "63bb048e2c864ea489620cb0",
    },
    __v: 0,
  },
];

const DoctorPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const {
    isOpen: isOpenDoctor,
    onOpen: onOpenDoctor,
    onClose: onCloseDoctor,
  } = useDisclosure();
  const {
    isOpen: isOpenSchedule,
    onOpen: onOpenSchedule,
    onClose: onCloseSchedule,
  } = useDisclosure();

  useEffect(() => {
    setDoctors(mock);
    setFilteredDoctors(mock);

    return () => {};
  }, []);

  const handleChange = (event) => {
    const value = doctors.filter((val) =>
      val.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredDoctors(value);
  };

  return (
    <>
      <div className="m-10">
        <div className="m-10 p-5 bg-white flex gap-4 flex-col items-center shadow-sm rounded-sm">
          <Text className="text-primary-600 font-bold text-lg">
            Daftar Dokter
          </Text>
          <Input
            onChange={handleChange}
            placeholder="Search doctor name"
            focusBorderColor="secondary.500"
            size="md"
          />
        </div>
        <VStack spacing="20px">
          {filteredDoctors.map((v, i) => (
            <DoctorCard key={i} data={v} />
          ))}
        </VStack>
      </div>
      <FloatingActionButton
        actions={[
          {
            label: "Tambahkan jadwal",
            handleClick: onOpenSchedule,
            icon: <IoMdAdd />,
          },
          {
            label: "Tambahkan dokter",
            handleClick: onOpenDoctor,
            icon: <MdPeople />,
          },
        ]}
      />

      <Modal onClose={onCloseDoctor} isOpen={isOpenDoctor} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambahkan Dokter</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateDoctorForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseDoctor}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal onClose={onCloseSchedule} isOpen={isOpenSchedule} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Tambahkan Jadwal</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <CreateScheduleForm />
          </ModalBody>
          <ModalFooter>
            <Button onClick={onCloseSchedule}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DoctorPage;
