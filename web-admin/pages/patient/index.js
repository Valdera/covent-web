import { Input, Text, VStack } from "@chakra-ui/react";

import PatientCard from "@components/card/patient/PatientCard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import PatientAPI from "resources/patient/request";
import { isTokenExists } from "resources/utils";

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (!isTokenExists()) {
      router.push("/login");
    }

    const rsc = new PatientAPI();
    rsc.getAllPatient((data) => {
      setPatients(data.data.data);
      setFilteredPatients(data.data.data);
    });

    return () => {};
  });

  const handleChange = (event) => {
    const value = patients.filter((val) =>
      val.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredPatients(value);
  };

  return (
    <div className="m-10">
      <div className="m-10 p-5 bg-white flex gap-4 flex-col items-center shadow-sm rounded-sm">
        <Text className="text-primary-600 font-bold text-lg">
          Daftar Pasien
        </Text>
        <Input
          onChange={handleChange}
          placeholder="Search patient name"
          focusBorderColor="secondary.500"
          size="md"
        />
      </div>
      <VStack spacing="20px">
        {filteredPatients.map((v, i) => (
          <PatientCard key={i} data={v} />
        ))}
      </VStack>
    </div>
  );
};

export default PatientPage;
