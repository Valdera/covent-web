import { Badge, Box, Grid, Input, Text, Textarea } from "@chakra-ui/react";

const statusToBadge = {
  "waiting for approval": "gray",
  approved: "green",
  declined: "red",
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
      <Input
        value={`${data.patient.firstName} ${data.patient.lastName}`}
        isReadOnly
        variant={"filled"}
      />

      {/* DOCTOR NAME */}
      <Text className="font-bold">Dokter: </Text>
      <Input value={data.doctor.name} isReadOnly variant={"filled"} />

      {/* SPECIALIZATION */}
      <Text className="font-bold">Spesialisasi: </Text>
      <Input value={data.specialization} isReadOnly variant={"filled"} />

      {/* SCHEDULE */}
      <Text className="font-bold">Jadwal: </Text>
      <Input value={data.schedule} isReadOnly variant={"filled"} />

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
    </Grid>
  );
};

export default AppointmentCard;
