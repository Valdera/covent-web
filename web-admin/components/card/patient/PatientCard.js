import { Button, Grid, Input, Link, Text } from "@chakra-ui/react";

const PatientCard = ({ data }) => {
  return (
    <Grid
      alignItems={"center"}
      templateColumns="minmax(100px, max-content) 1fr"
      gap={4}
      className="w-[80vw] bg-white shadow-md rounded-md p-8"
    >
      {/* NAME */}
      <Text className="font-bold">Nama: </Text>
      <Input value={`${data.name}`} isReadOnly variant={"filled"} />

      {/* EMAIL */}
      <Text className="font-bold">Email: </Text>
      <Input value={data.email} isReadOnly variant={"filled"} />

      {/* AGE */}
      <Text className="font-bold">Umur: </Text>
      <Input value={data.age} isReadOnly variant={"filled"} />

      {/* GENDER */}
      <Text className="font-bold">Jenis Kelamin: </Text>
      <Input
        value={`${data.gender == 0 ? "Pria" : "Wanita"}`}
        isReadOnly
        variant={"filled"}
      />

      {/* PHONE NUMBER */}
      <Text className="font-bold">Nomor Telepon: </Text>
      <Input value={data.phoneNumber} isReadOnly variant={"filled"} />

      {/* KTP NUMBER */}
      <Text className="font-bold">Nomor KTP: </Text>
      <Input value={data.ktpNumber} isReadOnly variant={"filled"} />

      <Link href={`/patient/${data._id}`} style={{ textDecoration: "none" }}>
        <Button>Lihat Detail</Button>
      </Link>
    </Grid>
  );
};

export default PatientCard;
