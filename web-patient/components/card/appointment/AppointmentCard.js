import { Badge, Box, Grid, Input, Text, Textarea } from "@chakra-ui/react";

const statusToBadge = {
  CREATED: "gray",
  ACCEPTED: "green",
  DONE: "green",
  CANCELLED: "red",
};

const toLocaleDate = (date, offset = 0) => {
  let d = new Date(date);

  if (offset != 0) {
    d.setHours(d.getHours() - offset);
  }

  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
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
      <Input value={data.patient.name} isReadOnly variant={"filled"} />

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
      <Text className="font-bold">Jadwal mulai: </Text>
      <Input
        value={`${toLocaleDate(data.schedule.startTime, 7)} - ${toLocaleDate(
          data.schedule.endTime,
          7
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
      </Box>

      {/* SCHEDULE */}
      <Text className="font-bold">Created At: </Text>
      <Input
        value={toLocaleDate(data.createdAt)}
        isReadOnly
        variant={"filled"}
      />
    </Grid>
  );
};

export default AppointmentCard;
