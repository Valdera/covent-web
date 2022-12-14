import { Heading, Stack, VStack } from "@chakra-ui/react";
import AppointmentCard from "@components/card/appointment/AppointmentCard";

const mock = [
  {
    patient: {
      firstName: "Fauzan",
      lastName: "Valdera",
    },
    doctor: {
      name: "Dr. test",
    },
    specialization: "Orthopedi",
    schedule: "10 Oktober 10:00",
    issue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "waiting for approval",
  },
  {
    patient: {
      firstName: "Fauzan",
      lastName: "Valdera",
    },
    doctor: {
      name: "Dr. test",
    },
    specialization: "Orthopedi",
    schedule: "10 Oktober 10:00",
    issue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "declined",
  },
  {
    patient: {
      firstName: "Fauzan",
      lastName: "Valdera",
    },
    doctor: {
      name: "Dr. test",
    },
    specialization: "Orthopedi",
    schedule: "10 Oktober 10:00",
    issue:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    status: "approved",
  },
];

const AppointmentMePage = () => {
  return (
    <>
      <div className="flex justify-center items-center flex-col m-10">
        <Stack align={"center"} marginBottom={"10"}>
          <Heading fontSize={"4xl"} fontFamily={"heading"}>
            <span className="text-primary-400">Appointment</span> Detail
          </Heading>
          {/* <Text fontSize={"lg"} color={"gray.600"}>
            silahkan klik loker yang available untuk dapat menggunakan loker
          </Text> */}
        </Stack>

        <VStack spacing="20px">
          {mock.map((v, i) => (
            <AppointmentCard key={i} data={v} />
          ))}
        </VStack>
      </div>
    </>
  );
};

export default AppointmentMePage;
