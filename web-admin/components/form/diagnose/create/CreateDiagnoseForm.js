import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
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

const CreateDiagnoseForm = ({ data }) => {
  const [doctorList, setDoctorList] = useState([]);

  useEffect(() => {
    setDoctorList(
      mock.map((v) => {
        return { label: v.name, value: v._id };
      })
    );

    return () => {};
  }, []);

  const formik = useFormik({
    initialValues: {
      patient: data.patient._id,
      doctor: "",
      disease: "",
      description: "",
    },
    validationSchema: Yup.object({
      doctor: Yup.string().required("Sorry, doctor is required"),
      disease: Yup.string().required("Sorry, disease is required"),
      description: Yup.string().required("Sorry, description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
            creatable
            getCreateLabel={(query) => `+ Create ${query}`}
            onCreate={(query) => {
              console.log(query);
            }}
          />
        </FormControl>
        <FormErrorMessage>{formik.errors.doctor}</FormErrorMessage>

        {/* DISEASE */}

        <FormControl
          id="disease"
          isRequired
          isInvalid={formik.errors.disease && formik.touched["disease"]}
        >
          <FormLabel>Penyakit</FormLabel>
          <Input name="disease" {...formik.getFieldProps("disease")} />
          <FormErrorMessage>{formik.errors.disease}</FormErrorMessage>
        </FormControl>

        {/* DESCRIPTION */}

        <FormControl
          id="description"
          isRequired
          isInvalid={formik.errors.description && formik.touched["description"]}
        >
          <FormLabel>Keterangan</FormLabel>
          <Textarea
            name="description"
            {...formik.getFieldProps("description")}
          />
          <FormErrorMessage>{formik.errors.description}</FormErrorMessage>
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

export default CreateDiagnoseForm;
