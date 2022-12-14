import {
  Box,
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
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";

const mock = {
  firstName: "Fauzan",
  lastName: "Valdera",
  ktpNumber: "12351341324",
  phoneNumber: "087884526580",
  age: 12,
  gender: "Male",
  email: "f.valdera@yahoo.co.id",
};

const DetailProfileForm = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      ktpNumber: "",
      phoneNumber: "",
      age: 0,
      gender: "",
      email: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Sorry, first name is required"),
      lastName: Yup.string(),
    }),
    onSubmit: (values) => {
      console.log("first");
      console.log(values);
    },
  });

  useEffect(() => {
    const data = mock;

    const selectedFields = [
      "firstName",
      "lastName",
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
        templateColumns={{ base: "max-content", md: "100px max-content" }}
        gap={10}
        className="bg-white shadow-md rounded-md p-8"
      >
        <GridItem alignSelf={"start"}>
          <Text className="font-bold">Personal Information</Text>
        </GridItem>

        <GridItem as={Flex} justifySelf={"start"} gap={2} flexDir={"column"}>
          {/* FIRST NAME & LAST NAME */}

          <Flex gap={2} alignItems={"start"} justifyContent={"center"}>
            <Box>
              <FormControl
                id="firstName"
                isInvalid={
                  formik.errors.firstName && formik.touched["firstName"]
                }
              >
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="firstName"
                  {...formik.getFieldProps("firstName")}
                />
                <FormErrorMessage>{formik.errors.firstName}</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl id="lastName">
                <FormLabel>Last Name</FormLabel>
                <Input
                  type="text"
                  name="lastName"
                  {...formik.getFieldProps("lastName")}
                />
              </FormControl>
            </Box>
          </Flex>

          {/* PHONE NUMBER */}

          <FormControl
            id="phone"
            isInvalid={
              formik.errors.phoneNumber && formik.touched["phoneNumber"]
            }
          >
            <FormLabel>Phone Number</FormLabel>
            <InputGroup>
              <InputLeftAddon children="+62" />
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
                placeholder="Select gender"
                {...formik.getFieldProps("gender")}
              >
                <option value={0}>Female</option>
                <option value={1}>Male</option>
              </Select>
              <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
            </FormControl>
          </Flex>

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
