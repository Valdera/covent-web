import { Grid, Input, Text, Textarea } from "@chakra-ui/react";

const toLocaleDate = (date) => {
  const d = new Date(date);
  return d.toLocaleString();
};

const DiagnoseCard = ({ data }) => {
  return (
    <>
      <Grid
        alignItems={"center"}
        templateColumns="minmax(100px, max-content) 1fr"
        gap={4}
        className="w-full bg-white shadow-md rounded-md p-8"
      >
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

        {/* DISEASE */}
        <Text className="font-bold">Dokter: </Text>
        <Input value={data.disease} isReadOnly variant={"filled"} />

        {/* ISSUE */}
        <Text className="font-bold">Masalah: </Text>
        <Textarea value={data.description} variant={"filled"} isReadOnly />

        {/* CREATED AT */}
        <Text className="font-bold">Dibuat pada tanggal: </Text>
        <Input
          value={toLocaleDate(data.createdAt)}
          isReadOnly
          variant={"filled"}
        />
      </Grid>
    </>
  );
};

export default DiagnoseCard;
