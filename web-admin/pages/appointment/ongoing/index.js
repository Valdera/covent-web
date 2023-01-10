import { Heading, Stack, VStack } from "@chakra-ui/react";
import AppointmentCard from "@components/card/appointment/AppointmentCard";
import { useEffect, useState } from "react";

const mock = [
  {
    _id: "63bb0dc409b2c618819a8177",
    patient: {
      _id: "63bb0380080662715abad18c",
      name: "Ahmad Valdera",
    },
    doctor: {
      _id: "63bb05be2c864ea489620cbc",
      name: "dr. Medica",
      specialization: {
        _id: "63bb04982c864ea489620cb4",
        name: "Umum",
        id: "63bb04982c864ea489620cb4",
      },
    },
    schedule: {
      _id: "63bb438ab99d80e393cdf025",
      startTime: "2023-01-20T10:20:00.000Z",
      endTime: "2023-01-20T10:20:00.000Z",
      id: "63bb438ab99d80e393cdf025",
    },
    status: "ONGOING",
    issue: "Sakit Kepala",
    __v: 0,
  },
  {
    _id: "63bb0dc409b2c618819a8177",
    patient: {
      _id: "63bb0380080662715abad18c",
      name: "Fauzan Valdera",
    },
    doctor: {
      _id: "63bb05be2c864ea489620cbc",
      name: "dr. Angelica",
      specialization: {
        _id: "63bb04982c864ea489620cb4",
        name: "Umum",
        id: "63bb04982c864ea489620cb4",
      },
    },
    schedule: {
      _id: "63bb438ab99d80e393cdf025",
      startTime: "2023-01-20T10:20:00.000Z",
      endTime: "2023-01-20T10:20:00.000Z",
      id: "63bb438ab99d80e393cdf025",
    },
    status: "ACCEPTED",
    issue: "Sakit Kepala",
    __v: 0,
  },
  {
    _id: "63bb0dc409b2c618819a8177",
    patient: {
      _id: "63bb0380080662715abad18c",
      name: "Fauzan Valdera",
    },
    doctor: {
      _id: "63bb05be2c864ea489620cbc",
      name: "dr. Angelica",
      specialization: {
        _id: "63bb04982c864ea489620cb4",
        name: "Umum",
        id: "63bb04982c864ea489620cb4",
      },
    },
    schedule: {
      _id: "63bb438ab99d80e393cdf025",
      startTime: "2023-01-20T10:20:00.000Z",
      endTime: "2023-01-20T10:20:00.000Z",
      id: "63bb438ab99d80e393cdf025",
    },
    status: "ACCEPTED",
    issue: "Sakit Kepala",
    __v: 0,
  },
];

const AppointmentOngoingPage = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setAppointments(mock);
    return () => {};
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col m-10">
        <Stack align={"center"} marginBottom={"10"}>
          <Heading fontSize={"4xl"} fontFamily={"heading"}>
            <span className="text-primary-400">Appointment Ongoing</span>
          </Heading>
        </Stack>

        <VStack spacing="20px">
          {appointments
            .filter((v) => v.status == "ACCEPTED")
            .map((v, i) => (
              <AppointmentCard key={i} data={v} />
            ))}
        </VStack>
      </div>
    </>
  );
};

export default AppointmentOngoingPage;
