import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
} from "@chakra-ui/react";
import { Select } from "@mantine/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const mock = [
  {
    _id: "63bb05be2c864ea489620cbc",
    name: "dr. Angelica",
    specialization: {
      _id: "63bb04982c864ea489620cb4",
      name: "Umum",
      id: "63bb04982c864ea489620cb4",
    },
    __v: 0,
  },
  {
    _id: "63bb05d82c864ea489620cc2",
    name: "dr. Ahmad",
    specialization: {
      _id: "63bb04982c864ea489620cb4",
      name: "Umum",
      id: "63bb04982c864ea489620cb4",
    },
    __v: 0,
  },
  {
    _id: "63bb05de2c864ea489620cc4",
    name: "dr. Arigi",
    specialization: {
      _id: "63bb04982c864ea489620cb4",
      name: "Umum",
      id: "63bb04982c864ea489620cb4",
    },
    __v: 0,
  },
  {
    _id: "63bb05f32c864ea489620cc6",
    name: "dr. Aldi",
    specialization: {
      _id: "63bb04942c864ea489620cb2",
      name: "Anak",
      id: "63bb04942c864ea489620cb2",
    },
    __v: 0,
  },
  {
    _id: "63bb06032c864ea489620cc8",
    name: "dr. Anto",
    specialization: {
      _id: "63bb04942c864ea489620cb2",
      name: "Anak",
      id: "63bb04942c864ea489620cb2",
    },
    __v: 0,
  },
  {
    _id: "63bb06162c864ea489620cca",
    name: "dr. Rizki",
    specialization: {
      _id: "63bb04a02c864ea489620cb6",
      name: "THT",
      id: "63bb04a02c864ea489620cb6",
    },
    __v: 0,
  },
  {
    _id: "63bb06372c864ea489620ccc",
    name: "dr. Adela",
    specialization: {
      _id: "63bb048e2c864ea489620cb0",
      name: "Orthopedi",
      id: "63bb048e2c864ea489620cb0",
    },
    __v: 0,
  },
];

const CreateScheduleForm = () => {
  const [doctorList, setDoctorList] = useState([]);

  const formik = useFormik({
    initialValues: {
      doctor: "",
      totalPatient: 1,
      startTime: "",
      endTime: "",
    },
    validationSchema: Yup.object({
      doctor: Yup.string().required("Sorry, doctor is required"),
      totalPatient: Yup.number().required("Sorry, total patien is required"),
      startTime: Yup.string().required("Sorry, start time is required"),
      endTime: Yup.string().required("Sorry, end time is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    setDoctorList(
      mock.map((v) => {
        return { label: v.name, value: v._id };
      })
    );

    return () => {};
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={6} mx={"auto"} py={3}>
        {/* DOCTOR */}
        <FormControl id="doctor" isRequired isInvalid={formik.errors.doctor}>
          <FormLabel>Dokter</FormLabel>
          <Select
            placeholder="Pilih dokter"
            data={doctorList}
            onChange={(v) => {
              formik.setFieldValue("doctor", v);
            }}
            nothingFound="No options"
            searchable
          />
          <FormErrorMessage>{formik.errors.doctor}</FormErrorMessage>
        </FormControl>

        {/* TOTAL PATIENT */}
        <FormControl
          id="totalPatient"
          isRequired
          isInvalid={
            formik.errors.totalPatient && formik.touched["totalPatient"]
          }
        >
          <FormLabel>Kapasitas Pasien</FormLabel>
          <NumberInput
            max={100}
            min={1}
            name="totalPatient"
            onChange={(v) => {
              formik.setFieldValue("totalPatient", v);
            }}
            value={formik.values.totalPatient}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <FormErrorMessage>{formik.errors.totalPatient}</FormErrorMessage>
        </FormControl>

        {/* START TIME */}
        <FormControl
          id="startTime"
          isRequired
          isInvalid={formik.errors.startTime && formik.touched["startTime"]}
        >
          <FormLabel>Waktu Mulai</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            {...formik.getFieldProps("startTime")}
          />
          <FormErrorMessage>{formik.errors.startTime}</FormErrorMessage>
        </FormControl>

        {/* END TIME */}
        <FormControl
          id="endTime"
          isRequired
          isInvalid={formik.errors.endTime && formik.touched["endTime"]}
        >
          <FormLabel>Waktu Mulai</FormLabel>
          <Input
            placeholder="Select Date and Time"
            size="md"
            type="datetime-local"
            {...formik.getFieldProps("endTime")}
          />
          <FormErrorMessage>{formik.errors.endTime}</FormErrorMessage>
        </FormControl>
      </Stack>
      <Stack spacing={10} pt={2}>
        <Button
          loadingText="Submitting"
          size="lg"
          bg={"green.400"}
          color={"white"}
          _hover={{
            bg: "green.500",
          }}
          type="submit"
        >
          Create
        </Button>
      </Stack>
    </form>
  );
};

export default CreateScheduleForm;
