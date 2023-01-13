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
import { ErrorContext } from "@context/errContext";
import { Select } from "@mantine/core";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import DoctorAPI from "resources/doctors/request";
import ScheduleAPI from "resources/schedule/request";
import { defaultHandleErr } from "resources/utils";
import * as Yup from "yup";

const CreateScheduleForm = () => {
  const [doctorList, setDoctorList] = useState([]);
  const router = useRouter();
  const { setMessage } = useContext(ErrorContext);

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
      const rsc = new ScheduleAPI();
      rsc.createSchedule(
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
          <FormLabel>Waktu Berakhir</FormLabel>
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
