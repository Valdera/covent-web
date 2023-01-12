import { Grid } from "@chakra-ui/react";
import ProfileDetailForm from "@components/form/profile/detail/DetailProfileForm";
import PhotoProfileForm from "@components/form/profile/photo/PhotoProfileForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { isTokenExists } from "resources/utils";

const ProfilePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isTokenExists()) {
      router.push("/login");
    }

    return () => {};
  }, [router]);

  return (
    <div className="flex justify-center items-center flex-col m-10">
      <Grid gap={10} templateColumns={"max-content"}>
        <ProfileDetailForm />
        <PhotoProfileForm />
      </Grid>
    </div>
  );
};

export default ProfilePage;
