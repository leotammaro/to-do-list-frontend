import { Flex, Image, Text } from "@chakra-ui/react";
import React, { useContext } from "react";
import logoutLogo from "../svg/logout.svg";
import { getAuth, signOut } from "firebase/auth";
import { userContext } from "../context/userContext";

function Navbar() {
  const { setUser } = useContext(userContext);
  const auth = getAuth();

  const logout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Flex
      h={{ base: "80px", md: "50px" }}
      alignItems={"center"}
      justifyContent={"space-between"}
      padding="40px 10px"
      bg="#0078D7"
      w="100vw"
    >
      <Text fontSize={20} color="#fff">
        To Do List
      </Text>

      <Flex>
        <Image
          h={7}
          w={7}
          src={logoutLogo}
          onClick={() => logout()}
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
    </Flex>
  );
}

export default Navbar;
