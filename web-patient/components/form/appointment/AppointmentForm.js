import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { ErrorContext } from "@context/errContext";
import { Select } from "@mantine/core";

import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import AppointmentAPI from "resources/appointment/request";
import DoctorAPI from "resources/doctors/request";
import ScheduleAPI from "resources/schedule/request";
import SpecializationAPI from "resources/specialization/request";
import { defaultHandleErr } from "resources/utils";

import * as Yup from "yup";

const toLocaleDate = (date, offset = 0) => {
  let d = new Date(date);

  if (offset != 0) {
    d.setHours(d.getHours() - offset);
  }

  return `${d.toLocaleDateString()} ${d.toLocaleTimeString()}`;
};

const AppointmentForm = () => {
  const [doctorList, setDoctorList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [specializationList, setSpecializationList] = useState([]);
  const router = useRouter();
  const { setMessage } = useContext(ErrorContext);

  useEffect(() => {
    const rscSpecialization = new SpecializationAPI();
    rscSpecialization.getAllSpecialization(
      (data) => {
        setSpecializationList(data.data.data);
      },
      (data) => defaultHandleErr(data, setMessage)
    );

    return () => {};
  }, []);

  const formik = useFormik({
    initialValues: {
      doctor: "",
      specialization: "",
      schedule: "",
      issue: "",
    },
    validationSchema: Yup.object({
      issue: Yup.string().required("Sorry, your issue is required"),
      doctor: Yup.string().required("Sorry, your doctor is required"),
      specialization: Yup.string().required(
        "Sorry, your specialization is required"
      ),
      schedule: Yup.string().required("Sorry, your schedule is required"),
    }),
    onSubmit: (values) => {
      console.log(values);

      const rsc = new AppointmentAPI();
      rsc.createAppointment(values, () => {
        router.push("/appointment/me");
      });
    },
  });

  return (
    <div className=" bg-white p-10 shadow-lg border-slate-500 border-solid rounded-md">
      <form onSubmit={formik.handleSubmit}>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Create an <span className="text-primary-400">appointment</span>
        </Heading>
        <Stack spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
          {/* SPECIALIZE */}

          <FormControl
            id="specialization"
            isRequired
            isInvalid={
              formik.errors.specialization && formik.touched["specialization"]
            }
          >
            <FormLabel>Jenis spesialisasi</FormLabel>
            <Select
              data={specializationList.map((v) => {
                return { value: v._id, label: v.name };
              })}
              onChange={(v) => {
                const rscDoctor = new DoctorAPI();
                rscDoctor.getAllDoctorBySpecializationId(v, (data) => {
                  setDoctorList(data.data.data);
                  setScheduleList([]);
                  formik.setFieldValue("specialization", v);
                  formik.setFieldValue("doctor", "");
                  formik.setFieldValue("schedule", "");
                });
              }}
              searchable
            />
            <FormErrorMessage>{formik.errors.specialization}</FormErrorMessage>
          </FormControl>

          {/* DOCTOR */}

          <FormControl
            id="doctor"
            isRequired
            isInvalid={formik.errors.doctor && formik.touched["doctor"]}
          >
            <FormLabel>Dokter</FormLabel>
            <Select
              data={doctorList.map((v) => {
                return { value: v._id, label: v.name };
              })}
              searchable
              disabled={doctorList.length == 0}
              onChange={(v) => {
                const rscSchedule = new ScheduleAPI();
                rscSchedule.getAllScheduleByDoctorId(v, (data) => {
                  setScheduleList(data.data.data);
                  formik.setFieldValue("doctor", v);
                  formik.setFieldValue("schedule", "");
                });
              }}
            />
            <FormErrorMessage>{formik.errors.doctor}</FormErrorMessage>
          </FormControl>

          {/* SCHEDULE */}

          <FormControl
            id="schedule"
            isRequired
            isInvalid={formik.errors.schedule && formik.touched["schedule"]}
          >
            <FormLabel>Jadwal yang tersedia</FormLabel>
            <Select
              data={scheduleList.map((v) => {
                console.log(v);
                const label = `${toLocaleDate(v.startTime, 7)} - ${toLocaleDate(
                  v.endTime,
                  7
                )} \n Kapasitas tersedia: ${v.totalPatient} `;

                return { value: v._id, label: label };
              })}
              disabled={scheduleList.length == 0}
              onChange={(v) => {
                formik.setFieldValue("schedule", v);
              }}
            />
            <FormErrorMessage>{formik.errors.schedule}</FormErrorMessage>
          </FormControl>

          {/* ISSUE */}

          <FormControl
            id="issue"
            isRequired
            isInvalid={formik.errors.issue && formik.touched["issue"]}
          >
            <FormLabel>Deskripsi permasalahan</FormLabel>
            <Textarea name="issue" {...formik.getFieldProps("issue")} />
            <FormErrorMessage>{formik.errors.issue}</FormErrorMessage>
          </FormControl>

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
              Create Appointment
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default AppointmentForm;
