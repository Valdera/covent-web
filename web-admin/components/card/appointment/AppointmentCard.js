import {
  Badge,
  Box,
  Button,
  Grid,
  Input,
  Text,
  Textarea,
} from "@chakra-ui/react";

const statusToBadge = {
  "waiting for approval": "gray",
  approved: "green",
  declined: "red",
};

const toLocaleDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const AppointmentCard = ({ data }) => {
  return (
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

      {/* STATUS */}
      <Text className="font-bold">Status: </Text>
      <Box>
        <Badge colorScheme={statusToBadge[data.status]} fontSize={"sm"} p={2}>
          {data.status}
        </Badge>
        {data.status == "CREATED" && (
          <>
            {" "}
            <Button className="ml-5" colorScheme={"green"}>
              Accept
            </Button>
            <Button className="ml-5" colorScheme={"red"}>
              Cancel
            </Button>
          </>
        )}
        {data.status == "ACCEPTED" && (
          <Button className="ml-5" colorScheme={"green"}>
            Done
          </Button>
        )}
      </Box>
    </Grid>
  );
};

export default AppointmentCard;
