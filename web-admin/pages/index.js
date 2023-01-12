import {
  Box,
  Flex,
  Heading,
  Link,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillSchedule } from "react-icons/ai";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { GiDoctorFace } from "react-icons/gi";
import { MdOutlineSchedule } from "react-icons/md";
import { isTokenExists } from "resources/utils";

const MenuCard = (props) => {
  const { title, icon, link } = props;
  return (
    <Link href={link} style={{ textDecoration: "none" }}>
      <Flex
        justifyContent={"center"}
        backgroundColor={"white"}
        alignItems={"center"}
        px={{ base: 4, md: 8 }}
        py={"5"}
        cursor={"pointer"}
        shadow={"xl"}
        rounded={"lg"}
        fontWeight={"semibold"}
        className="hover:scale-105 transition-all flex-col gap-2"
      >
        <div className="text-2xl text-primary-600">{icon}</div>
        <Text className="">{title}</Text>
      </Flex>
    </Link>
  );
};

const HomePage = () => {
  const router = useRouter();

  useEffect(() => {
    if (!isTokenExists()) {
      router.push("/login");
    }

    return () => {};
  }, []);

  return (
    <Box
      maxW="7xl"
      mx={"auto"}
      py={10}
      minH={"50vh"}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <Stack align={"center"} marginBottom={"10"}>
        <Heading fontSize={"4xl"} fontFamily={"heading"}>
          <span className="text-primary-400">Home Page</span>
        </Heading>
      </Stack>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <MenuCard
          title={"Data Dokter"}
          icon={<GiDoctorFace />}
          link={"/doctor"}
        />
        <MenuCard
          title={"Data Pasien"}
          icon={<BsFillPersonLinesFill />}
          link={"/patient"}
        />
        <MenuCard
          title={"Appointment Ongoing"}
          icon={<AiFillSchedule />}
          link={"/appointment/ongoing"}
        />
        <MenuCard
          title={"Appointment Waiting"}
          icon={<MdOutlineSchedule />}
          link={"/appointment/waiting"}
        />
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
