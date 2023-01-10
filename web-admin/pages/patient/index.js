import { Input, Text, VStack } from "@chakra-ui/react";

import PatientCard from "@components/card/patient/PatientCard";
import { useEffect, useState } from "react";

const mock = [
  {
    _id: "63bb0380080662715abad18c",
    email: "admin@gmail.com",
    password: "$2a$12$EKgMSgGSs4h6H7AclDh.xujRfZ5rPstIcrPUxJRM06LtYgh1rqMdG",
    name: "Fauzan Eldera",
    age: 12,
    gender: 1,
    phoneNumber: "087884526580",
    ktpNumber: "12343907012734",
    __v: 0,
  },
  {
    _id: "63bb0380080662715abad18c",
    email: "admin@gmail.com",
    password: "$2a$12$EKgMSgGSs4h6H7AclDh.xujRfZ5rPstIcrPUxJRM06LtYgh1rqMdG",
    name: "Fauzan Valdera",
    age: 12,
    gender: 1,
    phoneNumber: "087884526580",
    ktpNumber: "12343907012734",
    __v: 0,
  },
  {
    _id: "63bb0380080662715abad18c",
    email: "valdera@gmail.com",
    password: "$2a$12$EKgMSgGSs4h6H7AclDh.xujRfZ5rPstIcrPUxJRM06LtYgh1rqMdG",
    name: "Helkia Yeremia",
    age: 12,
    gender: 1,
    phoneNumber: "087884526580",
    ktpNumber: "12343907012734",
    __v: 0,
  },
];

const PatientPage = () => {
  const [patients, setPatients] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  useEffect(() => {
    setPatients(mock);
    setFilteredPatients(mock);

    return () => {};
  }, []);

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
