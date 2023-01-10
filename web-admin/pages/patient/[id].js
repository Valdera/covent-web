import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import DiagnoseCard from "@components/card/diagnose/DiagnoseCard";
import DetailProfileForm from "@components/form/profile/detail/DetailProfileForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const mockDiagnose = [
  {
    _id: "63bdad2cc1ef786cb563fef8",
    patient: {
      _id: "63bb0380080662715abad18c",
      name: "Fauzan Valdera",
    },
    doctor: {
      _id: "63bb06372c864ea489620ccc",
      name: "dr. Adela",
      specialization: {
        _id: "63bb048e2c864ea489620cb0",
        name: "Orthopedi",
        id: "63bb048e2c864ea489620cb0",
      },
    },
    disease: "Sakit Kepala",
    description: "sakit kepala karena kebanyakan main game",
    __v: 0,
  },
  {
    _id: "63bdad2cc1ef786cb563fef8",
    patient: {
      _id: "63bb0380080662715abad18c",
      name: "Fauzan Valdera",
    },
    doctor: {
      _id: "63bb06372c864ea489620ccc",
      name: "dr. Adela",
      specialization: {
        _id: "63bb048e2c864ea489620cb0",
        name: "Orthopedi",
        id: "63bb048e2c864ea489620cb0",
      },
    },
    disease: "Sakit Kepala",
    description: "sakit kepala karena kebanyakan main game",
    __v: 0,
  },
  {
    _id: "63bdad2cc1ef786cb563fef8",
    patient: {
      _id: "63bb0380080662715abad18c",
      name: "Fauzan Valdera",
    },
    doctor: {
      _id: "63bb06372c864ea489620ccc",
      name: "dr. Adela",
      specialization: {
        _id: "63bb048e2c864ea489620cb0",
        name: "Orthopedi",
        id: "63bb048e2c864ea489620cb0",
      },
    },
    disease: "Sakit Kepala",
    description: "sakit kepala karena kebanyakan main game",
    __v: 0,
  },
];

const mockProfile = {
  _id: "63bb0380080662715abad18c",
  email: "admin@gmail.com",
  password: "$2a$12$EKgMSgGSs4h6H7AclDh.xujRfZ5rPstIcrPUxJRM06LtYgh1rqMdG",
  name: "Fauzan Valdera",
  age: 12,
  gender: 1,
  phoneNumber: "087884526580",
  ktpNumber: "12343907012734",
  __v: 0,
};

const PatientDetailPage = () => {
  const [profile, setProfile] = useState(null);
  const [diagnoseList, setDiagnoseList] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setProfile(mockProfile);
    setDiagnoseList(mockDiagnose);

    return () => {};
  }, []);

  return (
    <>
      {profile != null && <DetailProfileForm data={profile} />}
      <Grid
        alignItems={"center"}
        templateColumns={{ base: "1fr", md: "100px 1fr" }}
        gap={10}
        className="m-10 bg-white shadow-md rounded-md p-5"
      >
        <GridItem alignSelf={"start"}>
          <Text className="font-bold">Diagnose History</Text>
        </GridItem>
        <GridItem
          as={Flex}
          justifySelf={"start"}
          gap={2}
          flexDir={"column"}
          width={"full"}
        >
          {diagnoseList.map((v, i) => (
            <DiagnoseCard key={i} data={v} />
          ))}
        </GridItem>
      </Grid>
    </>
  );
};

export default PatientDetailPage;
