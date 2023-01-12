import LoginForm from "@components/form/login/LogInForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import { isTokenExists } from "resources/utils";

const LoginPage = () => {
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
        <LoginForm />
      </Fade>
    </>
  );
};

export default LoginPage;
