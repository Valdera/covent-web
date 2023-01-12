import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { ErrorContext } from "@context/errContext";
import { Select } from "@mantine/core";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DoctorAPI from "resources/doctors/request";
import SpecializationAPI from "resources/specialization/request";
import { defaultHandleErr } from "resources/utils";
import * as Yup from "yup";

const CreateDoctorForm = () => {
  const [specializationList, setSpecializationList] = useState([]);
  const router = useRouter();
  const { setMessage } = useContext(ErrorContext);

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
      const rsc = new DoctorAPI();
      rsc.createDoctor(
        values,
        () => {
          router.reload(window.location.pathname);
        },
        (data) => {
          defaultHandleErr(data, setMessage);
        }
      );
    },
  });

  useEffect(() => {
    const rsc = new SpecializationAPI();
    rsc.getAllSpecialization((data) => {
      setSpecializationList(
        data.data.data.map((v) => {
          return { label: v.name, value: v.id };
        })
      );
    });

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
              const rsc = new SpecializationAPI();
              rsc.createSpecialization(
                { name: query },
                () => {
                  rsc.getAllSpecialization((data) => {
                    setSpecializationList(
                      data.data.data.map((v) => {
                        return { label: v.name, value: v.id };
                      })
                    );
                  });
                },
                (data) => {
                  defaultHandleErr(data, setMessage);
                }
              );
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
