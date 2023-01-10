import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightElement,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      ktpNumber: "",
      phoneNumber: "",
      age: 0,
      gender: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Sorry, first name is required"),
      lastName: Yup.string(),
      email: Yup.string()
        .required("Sorry, email is required")
        .email("This is not a valid email"),
      password: Yup.string()
        .min(7, "must be larger than 7 char")
        .required("Sorry, password is required"),
    }),
    onSubmit: (values) => {
      console.log("first");
      console.log(values);
    },
  });

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("background")}
    >
      <form onSubmit={formik.handleSubmit}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Dont Have an Account? Lets{" "}
              <span className="text-primary-400">Sign up</span>
            </Heading>
            {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text> */}
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={4}>
              {/* FIRST NAME & LAST NAME */}

              <Flex gap={2} alignItems={"start"} justifyContent={"center"}>
                <Box>
                  <FormControl
                    id="firstName"
                    isRequired
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
                    <FormErrorMessage>
                      {formik.errors.firstName}
                    </FormErrorMessage>
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
                isRequired
                isInvalid={
                  formik.errors.phoneNumber && formik.touched["phoneNumber"]
                }
              >
                <FormLabel>Phone Number</FormLabel>
                <InputGroup
                  type="tel"
                  name="phoneNumber"
                  {...formik.getFieldProps("phoneNumber")}
                >
                  <InputLeftAddon children="+62" />
                  <Input type="tel" />
                </InputGroup>
                <FormErrorMessage>{formik.errors.phoneNumber}</FormErrorMessage>
              </FormControl>

              {/* KTP NUMBER */}

              <FormControl
                id="ktpNumber"
                isRequired
                isInvalid={
                  formik.errors.ktpNumber && formik.touched["ktpNumber"]
                }
              >
                <FormLabel>KTP Number</FormLabel>
                <Input
                  name="ktpNumber"
                  {...formik.getFieldProps("ktpNumber")}
                />
                <FormErrorMessage>{formik.errors.ktpNumber}</FormErrorMessage>
              </FormControl>

              {/* AGE & GENDER */}

              <Flex gap={2} alignItems={"start"} justifyContent={"center"}>
                <Box>
                  <FormControl
                    id="age"
                    isRequired
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
                </Box>
                <Box>
                  <FormControl
                    id="gender"
                    isRequired
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
                </Box>
              </Flex>

              {/* EMAIL */}

              <FormControl
                id="email"
                isRequired
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

              {/* PASSWORD */}

              <FormControl
                id="password"
                isRequired
                isInvalid={formik.errors.password && formik.touched["password"]}
              >
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    {...formik.getFieldProps("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
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
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"}>
                  Already a user?{" "}
                  <Link href={"/login"}>
                    <span className="text-blue-400 cursor-pointer hover:underline">
                      Login
                    </span>
                  </Link>
                </Text>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </form>
    </Flex>
  );
}
