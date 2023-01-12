import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Select } from "@mantine/core";

import { useFormik } from "formik";
import { useEffect } from "react";
import PatientAPI from "resources/patient/request";
import * as Yup from "yup";

const toLocaleDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString();
};

const DetailProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      ktpNumber: "",
      phoneNumber: "",
      birthdate: "",
      gender: 0,
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, name is required"),
      email: Yup.string()
        .required("Sorry, email is required")
        .email("This is not a valid email"),
      ktpNumber: Yup.string().required("Sorry, ktp number is required"),
      phoneNumber: Yup.string().required("Sorry, phone number is required"),
      birthdate: Yup.string().required("Sorry, birthdate is required"),
      gender: Yup.number().required("Sorry, gender is required"),
    }),
    onSubmit: (values) => {
      console.log("first");
      console.log(values);
    },
  });

  useEffect(() => {
    const rsc = new PatientAPI();
    rsc.getPatientMe((res) => {
      const data = res.data.data;
      data["birthdate"] = toLocaleDate(data["birthdate"]);

      const selectedFields = [
        "name",
        "ktpNumber",
        "phoneNumber",
        "birthdate",
        "gender",
        "email",
      ];

      for (const field of selectedFields) {
        formik.setFieldValue(field, data[field]);
      }
    });
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid
        alignItems={"center"}
        templateColumns={{ base: "max-content", md: "100px max-content" }}
        gap={10}
        className="bg-white shadow-md rounded-md p-8"
      >
        <GridItem alignSelf={"start"}>
          <Text className="font-bold">Personal Information</Text>
        </GridItem>

        <GridItem as={Flex} justifySelf={"start"} gap={2} flexDir={"column"}>
          {/* NAME */}

          <FormControl
            id="name"
            isInvalid={formik.errors.name && formik.touched["name"]}
          >
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" {...formik.getFieldProps("name")} />
            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
          </FormControl>

          {/* PHONE NUMBER */}

          <FormControl
            id="phone"
            isInvalid={
              formik.errors.phoneNumber && formik.touched["phoneNumber"]
            }
          >
            <FormLabel>Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon>+62</InputLeftAddon>
              <Input
                type="tel"
                name="phoneNumber"
                {...formik.getFieldProps("phoneNumber")}
              />
            </InputGroup>
            <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
          </FormControl>

          {/* KTP NUMBER */}

          <FormControl
            id="ktpNumber"
            isInvalid={formik.errors.ktpNumber && formik.touched["ktpNumber"]}
          >
            <FormLabel>KTP Number</FormLabel>
            <Input name="ktpNumber" {...formik.getFieldProps("ktpNumber")} />
            <FormErrorMessage>{formik.errors.ktpNumber}</FormErrorMessage>
          </FormControl>

          {/* birthdate */}

          <FormControl
            id="birthdate"
            isRequired
            isInvalid={formik.errors.birthdate && formik.touched["birthdate"]}
          >
            <FormLabel>Tanggal Lahir</FormLabel>
            <Input
              placeholder="Select Date and Time"
              size="md"
              disabled
              variant={"filled"}
              {...formik.getFieldProps("birthdate")}
            />
            <FormErrorMessage>{formik.errors.birthdate}</FormErrorMessage>
          </FormControl>

          <FormControl
            id="gender"
            isRequired
            isInvalid={formik.errors.gender && formik.touched["gender"]}
          >
            <FormLabel>Gender</FormLabel>
            <Select
              placeholder="Pilih jenis kelamin"
              data={[
                { label: "Wanita", value: 0 },
                { label: "Pria", value: 1 },
              ]}
              onChange={(v) => {
                formik.setFieldValue("gender", v);
              }}
              value={formik.values.gender}
            />
            <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
          </FormControl>

          {/* EMAIL */}

          <FormControl
            id="email"
            isDisabled
            isInvalid={formik.errors.email && formik.touched["email"]}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>

          <Stack spacing={10} pt={2}>
            <Button
              loadingText="Submitting"
              size="lg"
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
            >
              Update Profile
            </Button>
          </Stack>
        </GridItem>
      </Grid>
    </form>
  );
};

export default DetailProfileForm;
