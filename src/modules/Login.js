import { Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import email from "../svg/email.svg";
import key from "../svg/key.svg";
import { useForm } from "react-hook-form";
import tasksHome from "../svg/tasksHome.svg";

import { loginWithService, registerService } from "../services/loginServices";

function Login() {
  const [registerForm, setRegisterForm] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (registerForm) {
      registerService({
        service: data.email,
        password: data.password,
      }).catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setError("Email is already in use");
        }
      });
    } else {
      loginWithService({ email: data.email, password: data.password }).catch(
        (err) => {
          if (err.code === "auth/wrong-password") {
            setError("Invalid email or password");
          }
        }
      );
    }
  };

  const loginService = ({ service, email, password }) => {
    loginWithService({ service, email, password });
  };

  useEffect(() => {
    setError("");
  }, [registerForm]);

  return (
    <Flex height={"100vh"} w="100vw" bg={{ base: "#FEF4E8" }}>
      <Flex
        direction={"column"}
        flex={1}
        alignItems={"center"}
        justifyContent={"space-between"}
        padding={{ base: 45, lg: 10 }}
      >
        <Flex textAlign={"center"} direction={"column"} alignItems={"center"}>
          <Text
            color={{ base: "#000", lg: "#0078D7" }}
            fontWeight={"bold"}
            fontSize={24}
          >
            To Do List
          </Text>
          <Text fontSize={18}>Keep it organized!</Text>
          <Image src={tasksHome} height={40} w={40} />
        </Flex>

        <Flex direction={"column"} gap={3}>
          <Flex direction={"column"} h={16}>
            <Flex
              alignItems={"center"}
              width={{ base: 300, lg: 400 }}
              bg={"#fff"}
            >
              <Image
                src={email}
                h={5}
                w={5}
                position={"absolute"}
                marginLeft={2}
                fontSize={12}
                opacity={0.8}
                zIndex={2}
              ></Image>
              <Input
                placeholder="Your login or email"
                padding={6}
                paddingLeft={10}
                fontSize={12}
                {...register("email", { required: true })}
                _focus={{ border: "1px solid #E2E8F0" }}
              ></Input>
            </Flex>
            <Text fontSize={10} color="red" textAlign={"left"}>
              {errors.email?.type === "required" && "Email is required"}
            </Text>
          </Flex>
          <Flex direction={"column"} h={16}>
            <Flex
              alignItems={"center"}
              width={{ base: 300, lg: 400 }}
              borderRadius={5}
              bgColor={"#fff"}
            >
              <Image
                src={key}
                h={5}
                w={5}
                position={"absolute"}
                zIndex={10}
                marginLeft={2}
                fontSize={12}
                opacity={0.8}
              ></Image>
              <Input
                type={"password"}
                placeholder="Password"
                fontSize={12}
                padding={6}
                paddingLeft={10}
                {...register("password", { required: true })}
              ></Input>
            </Flex>
            <Text color={"red"} fontSize={10} textAlign={"left"}>
              {errors.password?.type === "required" && "Password is required"}
            </Text>
          </Flex>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Text
              fontSize={14}
              opacity={0.6}
              _hover={{ cursor: "pointer", opacity: 1 }}
              onClick={() => setRegisterForm(!registerForm)}
              textDecoration={"underline"}
            >
              {registerForm ? "Log in" : "Register"}
            </Text>
            <Button
              bg={{ base: "#828282", lg: "#0078D7" }}
              color={"white"}
              padding={"20px 15px"}
              fontSize={12}
              onClick={handleSubmit(onSubmit)}
            >
              {registerForm ? "Register" : "Log in"}
            </Button>
          </Flex>
          <Text textAlign={"center"} fontSize={14} color={"red"}>
            {error}
          </Text>
        </Flex>
        <Flex
          gap={3}
          _hover={{ cursor: "pointer" }}
          onClick={() => loginService({ service: "gmail" })}
          alignItems={"center"}
        >
          <Text color={{ base: "#000", lg: "#0078D7" }} fontWeight={"500"}>
            Log in With Google
          </Text>
          <Image src={"https://freesvg.org/img/1534129544.png"} h={10} w={10} />
        </Flex>
      </Flex>
      <Image
        display={{ base: "none", lg: "block" }}
        objectFit={"cover"}
        src={
          "https://images2.minutemediacdn.com/image/upload/c_crop,h_2586,w_3845,x_0,y_1/v1554918405/shape/mentalfloss/94735-istock-863607936.jpg?itok=hWMo9qSn"
        }
        width={800}
      />
    </Flex>
  );
}

export default Login;
