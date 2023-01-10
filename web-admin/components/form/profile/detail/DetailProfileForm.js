import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftAddon,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Text,
} from "@chakra-ui/react";
import { Select } from "@mantine/core";

import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const DetailProfileForm = ({ data }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      ktpNumber: "",
      phoneNumber: "",
      age: 0,
      gender: 0,
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Sorry, name is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    const selectedFields = [
      "name",
      "ktpNumber",
      "phoneNumber",
      "age",
      "gender",
      "email",
    ];

    for (const field of selectedFields) {
      formik.setFieldValue(field, data[field]);
    }
  }, []);

  return (
    <form>
      <Grid
        alignItems={"center"}
        templateColumns={{ base: "1fr", md: "100px 1fr" }}
        gap={10}
        className="m-10 bg-white shadow-md rounded-md p-5"
      >
        <GridItem alignSelf={"start"}>
          <Text className="font-bold">Personal Information</Text>
        </GridItem>

        <GridItem as={Flex} justifySelf={"start"} gap={2} flexDir={"column"}>
          {/* FIRST NAME & LAST NAME */}

          <FormControl
            id="name"
            isInvalid={formik.errors.firstName && formik.touched["name"]}
          >
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              isReadOnly
              variant={"filled"}
              {...formik.getFieldProps("name")}
            />
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
                isReadOnly
                variant={"filled"}
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
            <Input
              name="ktpNumber"
              isReadOnly
              variant={"filled"}
              {...formik.getFieldProps("ktpNumber")}
            />
            <FormErrorMessage>{formik.errors.ktpNumber}</FormErrorMessage>
          </FormControl>

          {/* AGE & GENDER */}

          <Flex gap={2} alignItems={"start"}>
            <FormControl
              id="age"
              isInvalid={formik.errors.age && formik.touched["age"]}
            >
              <FormLabel>Age</FormLabel>
              <NumberInput
                max={100}
                min={0}
                name="age"
                onChange={(v) => {
                  formik.setFieldValue("age", v);
                }}
                value={formik.values.age}
                isReadOnly
                variant={"filled"}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              <FormErrorMessage>{formik.errors.age}</FormErrorMessage>
            </FormControl>

            <FormControl
              id="gender"
              isInvalid={formik.errors.gender && formik.touched["gender"]}
            >
              <FormLabel>Gender</FormLabel>

              <Select
                placeholder="Pilih jenis kelamin"
                data={[
                  { label: "Wanita", value: 0 },
                  { label: "Pria", value: 1 },
                ]}
                value={formik.values.gender}
                variant="filled"
                disabled
              />
              <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
            </FormControl>
          </Flex>

          {/* EMAIL */}

          <FormControl
            id="email"
            isInvalid={formik.errors.email && formik.touched["email"]}
          >
            <FormLabel>Email address</FormLabel>
            <Input
              type="email"
              name="email"
              {...formik.getFieldProps("email")}
              isReadOnly
              variant={"filled"}
            />
            <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
          </FormControl>
        </GridItem>
      </Grid>
    </form>
  );
};

export default DetailProfileForm;
