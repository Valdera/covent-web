import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { ErrorContext } from "@context/errContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import PatientAPI from "resources/patient/request";
import { defaultHandleErr } from "resources/utils";

export default function LoginForm() {
  const router = useRouter();
  const { setMessage } = useContext(ErrorContext);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Sorry, email is required")
        .email("This is not a valid email"),
      password: Yup.string().required("Sorry, password is required"),
    }),
    onSubmit: (values) => {
      const rsc = new PatientAPI();
      rsc.login(
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
            <Heading fontSize={"4xl"} fontFamily={"heading"}>
              <span className="text-primary-400">Sign in</span> to your account
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
              <FormControl
                id="email"
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
              <FormControl
                id="password"
                isInvalid={formik.errors.password && formik.touched["password"]}
              >
                <FormLabel>Password</FormLabel>
                <Input
                  type="password"
                  name="password"
                  {...formik.getFieldProps("password")}
                />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Checkbox>Remember me</Checkbox>
                  <Link href={"/"}>Forgot password?</Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type={"submit"}
                >
                  Sign in
                </Button>
              </Stack>

              <Stack pt={6}>
                <Text align={"center"}>
                  Dont Have an Account?{" "}
                  <Link href={"/register"}>
                    <span className="text-blue-400 cursor-pointer hover:underline">
                      Register
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
