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
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useState } from "react";

import { ErrorContext } from "@context/errContext";
import { Select } from "@mantine/core";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import PatientAPI from "resources/patient/request";
import { defaultHandleErr } from "resources/utils";
import * as Yup from "yup";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setMessage } = useContext(ErrorContext);

  const formik = useFormik({
    initialValues: {
      name: "",
      ktpNumber: "",
      phoneNumber: "",
      birthdate: "",
      gender: "",
      email: "",
      password: "",
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
      password: Yup.string()
        .min(7, "must be larger than 7 char")
        .required("Sorry, password is required"),
    }),
    onSubmit: (values) => {
      const rsc = new PatientAPI();

      rsc.register(
        values,
        () => {
          router.reload(window.location.pathname);
        },
        (data) => defaultHandleErr(data, setMessage)
      );
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        bg={useColorModeValue("background")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"} textAlign={"center"}>
              Dont Have an Account? Lets{" "}
              <span className="text-primary-400">Sign up</span>
            </Heading>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
            onSubmit={formik.handleSubmit}
          >
            <Stack spacing={4}>
              {/* NAME */}

              <FormControl
                id="name"
                isRequired
                isInvalid={formik.errors.name && formik.touched["name"]}
              >
                <FormLabel>First Name</FormLabel>
                <Input
                  type="text"
                  name="name"
                  {...formik.getFieldProps("name")}
                />
                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
              </FormControl>

              {/* PHONE NUMBER */}

              <FormControl
                id="phoneNumber"
                isRequired
                isInvalid={
                  formik.errors.phoneNumber && formik.touched["phoneNumber"]
                }
              >
                <FormLabel>Nomor Telepon</FormLabel>
                <InputGroup type="tel">
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
                isRequired
                isInvalid={
                  formik.errors.ktpNumber && formik.touched["ktpNumber"]
                }
              >
                <FormLabel>Nomor KTP</FormLabel>
                <Input
                  name="ktpNumber"
                  {...formik.getFieldProps("ktpNumber")}
                />
                <FormErrorMessage>{formik.errors.ktpNumber}</FormErrorMessage>
              </FormControl>

              {/* birthdate */}

              <FormControl
                id="birthdate"
                isRequired
                isInvalid={
                  formik.errors.birthdate && formik.touched["birthdate"]
                }
              >
                <FormLabel>Tanggal Lahir</FormLabel>
                <Input
                  placeholder="Select Date and Time"
                  size="md"
                  type="date"
                  {...formik.getFieldProps("birthdate")}
                />
                <FormErrorMessage>{formik.errors.birthdate}</FormErrorMessage>
              </FormControl>

              {/* GENDER */}

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
                />
                <FormErrorMessage>{formik.errors.gender}</FormErrorMessage>
              </FormControl>

              {/* EMAIL */}

              <FormControl
                id="email"
                isRequired
                isInvalid={formik.errors.email && formik.touched["email"]}
              >
                <FormLabel>Email</FormLabel>
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
      </Flex>
    </form>
  );
}
