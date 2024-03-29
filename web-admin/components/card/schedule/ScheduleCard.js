import { Grid, Input, Text } from "@chakra-ui/react";

const toLocaleDate = (date, offset = 0) => {
  let d = new Date(date);

  if (offset != 0) {
    d.setHours(d.getHours() - offset);
  }

  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

const ScheduleCard = ({ data }) => {
  return (
    <Grid
      alignItems={"center"}
      templateColumns="minmax(50px, max-content) 1fr"
      gap={4}
      className="m-5 bg-white shadow-md rounded-md p-8"
    >
      {/* TOTAL PATIENT */}
      <Text className="font-bold">Kapasitas Yang Tersedia: </Text>
      <Input value={data.totalPatient} isReadOnly variant={"filled"} />

      {/* START TIME */}
      <Text className="font-bold">Waktu Mulai: </Text>
      <Input
        value={toLocaleDate(data.startTime, 7)}
        isReadOnly
        variant={"filled"}
      />

      {/* END TIME */}
      <Text className="font-bold">Waktu Berakhir: </Text>
      <Input
        value={toLocaleDate(data.endTime, 7)}
        isReadOnly
        variant={"filled"}
      />
    </Grid>
  );
};

export default ScheduleCard;
