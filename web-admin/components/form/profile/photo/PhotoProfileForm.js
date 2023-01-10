import { SmallCloseIcon } from "@chakra-ui/icons";
import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Stack,
  Text,
} from "@chakra-ui/react";

const PhotoProfileForm = () => {
  return (
    <Grid
      alignItems={"center"}
      templateColumns={{ base: "max-content", md: "100px max-content" }}
      gap={10}
      className="bg-white shadow-md rounded-md p-8"
    >
      <GridItem alignSelf={"start"}>
        <Text className="font-bold">Photo Profile</Text>
      </GridItem>
      <GridItem justifySelf={"start"}>
        <FormControl id="userProfile">
          <Stack direction={["column", "row"]} spacing={6}>
            <Center>
              <Avatar size="xl" src="https://bit.ly/sage-adebayo">
                <AvatarBadge
                  as={IconButton}
                  size="sm"
                  rounded="full"
                  top="-10px"
                  colorScheme="red"
                  aria-label="remove Image"
                  icon={<SmallCloseIcon />}
                />
              </Avatar>
            </Center>
            <Center w="full">
              <Button w="full">Change Photo</Button>
            </Center>
          </Stack>
        </FormControl>
      </GridItem>
    </Grid>
  );
};

export default PhotoProfileForm;
