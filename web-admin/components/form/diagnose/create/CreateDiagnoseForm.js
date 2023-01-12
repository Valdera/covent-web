import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { ErrorContext } from "@context/errContext";
import { Select } from "@mantine/core";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AppointmentAPI from "resources/appointment/request";
import DiagnoseAPI from "resources/diagnose/request";
import DoctorAPI from "resources/doctors/request";
import { defaultHandleErr } from "resources/utils";
import * as Yup from "yup";

const CreateDiagnoseForm = ({ data, onClose }) => {
  const [doctorList, setDoctorList] = useState([]);
  const router = useRouter();
  const { setMessage } = useContext(ErrorContext);

  useEffect(() => {
    const rsc = new DoctorAPI();
    rsc.getAllDoctor((data) => {
      setDoctorList(
        data.data.data.map((v) => {
          return { label: v.name, value: v._id };
        })
      );
    });

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
      const rscDiagnose = new DiagnoseAPI();
      rscDiagnose.createDiagnose(
        values,
        () => {
          const rscAppointment = new AppointmentAPI();
          rscAppointment.doneAppointment(
            data._id,
            () => {
              onClose();
              router.reload(window.location.pathname);
            },
            (data) => {
              defaultHandleErr(data, setMessage);
            }
          );
        },
        (data) => {
          defaultHandleErr(data, setMessage);
        }
      );
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
