import React, { createRef, useState } from "react";
import {
  Flex,
  Image,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Input,
  Text,
} from "@chakra-ui/react";
import plus from "../svg/plus.svg";
import FocusLock from "react-focus-lock";

function NewTaskButton({ onCreateTask, section }) {
  const refInput = createRef(null);
  const [inputValue, setInputValue] = useState("");

  const newTaskContent = (e) => {
    setInputValue(e.target.value);
  };

  const createTask = () => {
    onCreateTask({ section, inputValue });
    setInputValue("");
  };

  const newTaskWithEnter = (e) => {
    if (e.key === "Enter") {
      createTask();
    }
  };

  return (
    <Popover initialFocusRef={refInput}>
      <PopoverTrigger onClick={() => refInput.current.focus()}>
        <Flex
          alignItems={"center"}
          gap={4}
          _hover={{ bg: "#E8E8E8", cursor: "pointer" }}
          w="100%"
          padding={2}
          borderRadius={"5px"}
          onClick={() => {
            refInput.current.focus();
          }}
          justifyContent={{ base: "center", lg: "flex-start" }}
        >
          <Image src={plus} h={5} w={5} opacity={"0.5"} />
          <Text fontSize={18} color={"gray.600"}>
            New task
          </Text>
        </Flex>
      </PopoverTrigger>
      <Portal>
        <PopoverContent>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverBody>
              <Flex alignItems={"center"} podding={5} gap={3}>
                <Input
                  ref={refInput}
                  onChange={newTaskContent}
                  onKeyDown={newTaskWithEnter}
                  value={inputValue}
                />
                <Image
                  src={plus}
                  w={5}
                  h={5}
                  _hover={{ cursor: "pointer" }}
                  onClick={createTask}
                />
              </Flex>
            </PopoverBody>
          </FocusLock>
        </PopoverContent>
      </Portal>
    </Popover>
  );
}

export default NewTaskButton;
