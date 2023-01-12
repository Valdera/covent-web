import { Heading, Stack, VStack } from "@chakra-ui/react";
import AppointmentCard from "@components/card/appointment/AppointmentCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AppointmentAPI from "resources/appointment/request";
import { isTokenExists } from "resources/utils";

const AppointmentOngoingPage = () => {
  const [appointments, setAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isTokenExists()) {
      router.push("/login");
    }

    const rsc = new AppointmentAPI();
    rsc.getAllAppointment((data) => {
      setAppointments(data.data.data);
    });

    return () => {};
  }, [router]);

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
