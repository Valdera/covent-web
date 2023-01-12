import SignupForm from "@components/form/signup/SignUpForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { isTokenExists } from "resources/utils";

const RegisterPage = () => {
  const router = useRouter();
  useEffect(() => {
    if (isTokenExists()) {
      router.push("/");
    }

    return () => {};
  }, [router]);

  return (
    <>
      <Fade>
        <SignupForm />
      </Fade>
    </>
  );
};

export default RegisterPage;
