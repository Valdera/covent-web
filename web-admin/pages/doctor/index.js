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
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { MdPeople } from "react-icons/md";
import DoctorAPI from "resources/doctors/request";
import { isTokenExists } from "resources/utils";

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

  const router = useRouter();

  useEffect(() => {
    if (!isTokenExists()) {
      router.push("/login");
    }

    const rsc = new DoctorAPI();
    rsc.getAllDoctor((data) => {
      setDoctors(data.data.data);
      setFilteredDoctors(data.data.data);
    });

    return () => {};
  }, [router]);

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
