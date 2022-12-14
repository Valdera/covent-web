import { Grid } from "@chakra-ui/react";
import ProfileDetailForm from "@components/form/profile/detail/DetailProfileForm";
import PhotoProfileForm from "@components/form/profile/photo/PhotoProfileForm";

const ProfilePage = () => {
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
