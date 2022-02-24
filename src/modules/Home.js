import { Flex } from "@chakra-ui/react";
import React from "react";
import Navbar from "./Navbar";
import ToDoList from "./ToDoList";

function Home() {
  return (
    <Flex height={"100vh"} direction={"column"} alignItems={"center"}>
      <Navbar />
      <ToDoList />
    </Flex>
  );
}

export default Home;
