import { Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import DiagnoseCard from "@components/card/diagnose/DiagnoseCard";
import DetailProfileForm from "@components/form/profile/detail/DetailProfileForm";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DiagnoseAPI from "resources/diagnose/request";
import PatientAPI from "resources/patient/request";
import { isTokenExists } from "resources/utils";

const PatientDetailPage = () => {
  const [profile, setProfile] = useState(null);
  const [diagnoseList, setDiagnoseList] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isTokenExists()) {
      router.push("/login");
    }

    const { id } = router.query;

    const rscPatient = new PatientAPI();
    rscPatient.getPatientById(id, (data) => {
      setProfile(data.data.data);
    });

    const rscDiagnose = new DiagnoseAPI();
    rscDiagnose.getAllDiagnoseByPatientId(id, (data) => {
      console.log(data.data.data);
      setDiagnoseList(data.data.data);
    });

    return () => {};
  }, [router]);

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
          {diagnoseList != null &&
            diagnoseList.map((v, i) => <DiagnoseCard key={i} data={v} />)}
        </GridItem>
      </Grid>
    </>
  );
};

export function getServerSideProps(context) {
  return {
    props: { params: context.params },
  };
}

export default PatientDetailPage;
