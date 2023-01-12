import AppointmentForm from "@components/form/appointment/AppointmentForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isTokenExists } from "resources/utils";

const AppointmentPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isTokenExists()) {
      router.push("/login");
    }

    return () => {};
  }, [router]);

  return (
    <div className="flex justify-center items-center flex-col m-10">
      <AppointmentForm />
    </div>
  );
};

export default AppointmentPage;
