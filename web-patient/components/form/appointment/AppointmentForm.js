import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { Select } from "@mantine/core";
import { DatePicker } from "@mantine/dates";

import { useFormik } from "formik";
import * as Yup from "yup";

const AppointmentForm = () => {
  const formik = useFormik({
    initialValues: {
      date: "",
      issue: "",
    },
    validationSchema: Yup.object({
      issue: Yup.string().required("Sorry, your issue is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className=" bg-white p-10 shadow-lg border-slate-500 border-solid rounded-md">
      <form>
        <Heading fontSize={"4xl"} textAlign={"center"}>
          Create an <span className="text-primary-400">appointment</span>
        </Heading>
        <Stack spacing={6} mx={"auto"} maxW={"lg"} py={12} px={6}>
          {/* DATE */}

          <FormControl id="date" isRequired>
            <FormLabel>Appointment Date</FormLabel>
            <DatePicker
              name="date"
              dropdownType="modal"
              placeholder="Pick date"
              variant="filled"
              className="font-body"
              radius="md"
            />
          </FormControl>

          {/* SPECIALIZE */}
          <FormControl id="specialize" isRequired>
            <FormLabel>Pick doctor's specialize</FormLabel>
            <Select
              data={[
                "Dokter Umum",
                "Dokter Orthopedi",
                "Dokter THT",
                "Dokter Spesialis Anak",
                "Dokter Spesialis Paru",
                "Dokter Spesialis Saraf",
              ]}
              searchable
            />
          </FormControl>

          {/* SCHEDULE */}
          <FormControl id="schedule" isRequired>
            <FormLabel>Available Schedule</FormLabel>
            <Select data={["10:00 - 12:00", "12:00 - 13:00"]} disabled />
          </FormControl>

          {/* ISSUE */}

          <FormControl
            id="issue"
            isRequired
            isInvalid={formik.errors.issue && formik.touched["issue"]}
          >
            <FormLabel>Describe your issue</FormLabel>
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
              Sign up
            </Button>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default AppointmentForm;
