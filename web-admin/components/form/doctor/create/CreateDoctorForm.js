import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { Select } from "@mantine/core";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

const mock = [
  {
    _id: "63bb048e2c864ea489620cb0",
    name: "Orthopedi",
    __v: 0,
    id: "63bb048e2c864ea489620cb0",
  },
  {
    _id: "63bb04942c864ea489620cb2",
    name: "Anak",
    __v: 0,
    id: "63bb04942c864ea489620cb2",
  },
  {
    _id: "63bb04982c864ea489620cb4",
    name: "Umum",
    __v: 0,
    id: "63bb04982c864ea489620cb4",
  },
  {
    _id: "63bb04a02c864ea489620cb6",
    name: "THT",
    __v: 0,
    id: "63bb04a02c864ea489620cb6",
  },
];

const CreateDoctorForm = () => {
  const [specializationList, setSpecializationList] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      specialization: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, name is required"),
      specialization: Yup.string().required(
        "Sorry, specialization is required"
      ),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    setSpecializationList(
      mock.map((v) => {
        return { label: v.name, value: v.id };
      })
    );

    return () => {};
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={6} mx={"auto"} py={3}>
        {/* NAME */}

        <FormControl
          id="name"
          isRequired
          isInvalid={formik.errors.name && formik.touched["name"]}
        >
          <FormLabel>Nama</FormLabel>
          <Input name="name" {...formik.getFieldProps("name")} />
          <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
        </FormControl>

        {/* SPECIALIZATION */}

        <FormControl
          id="specialization"
          isRequired
          isInvalid={formik.errors.specialization}
        >
          <FormLabel>Spesialisasi</FormLabel>
          <Select
            placeholder="Pilih spesialisasi"
            data={specializationList}
            onChange={(v) => {
              formik.setFieldValue("specialization", v);
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
        <FormErrorMessage>{formik.errors.specialization}</FormErrorMessage>
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

export default CreateDoctorForm;
