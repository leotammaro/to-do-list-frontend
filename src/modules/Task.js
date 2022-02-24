import {
  Box,
  Button,
  Flex,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import edit from "../svg/edit.svg";
import deleteIcon from "../svg/deleteIcon.svg";
import showMore from "../svg/showMore.svg";

import { useDrag } from "react-dnd";
import cancel from "../svg/cancel.svg";
import check from "../svg/check.svg";

function Task({
  taskData,
  onDelete,
  onEditTask,
  onDropTask,
  sections,
  sectionSelected,
  moveTaskMobileDesing,
}) {
  const [showIcons, setShowIcons] = useState(false);
  const [inputValue, setInputValue] = useState(taskData.content);
  const [editing, setEditing] = useState(false);
  const [sectionsToMove, setSectionsToMove] = useState([]);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: "TASK",
      item: { id: taskData._id },
      end: (item, monitor) => {
        onDropTask({
          taskId: item.id,
          section: monitor.getDropResult().section,
        });
      },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.9 : 1,
      }),
    }),
    []
  );

  const editingTaskContent = (e) => {
    setInputValue(e.target.value);
  };

  const editTaskWithEnter = (e) => {
    if (e.key === "Escape") setEditing(false);
    if (e.key === "Enter") {
      editTask();
    }
  };

  const editTask = () => {
    onEditTask({ id: taskData._id, inputValue }).then(() => setEditing(false));
  };

  useEffect(() => {
    setSectionsToMove(
      sections &&
        sections.filter((sectionsValue) => sectionsValue !== sectionSelected)
    );
  }, []);

  return (
    <Flex
      opacity={opacity}
      ref={dragRef}
      bg={"#fff"}
      w="100%"
      padding={2}
      marginBottom={2}
      borderRadius={"5px"}
      boxShadow={"0 1px 0 #091e4240"}
      alignItems={"center"}
      justifyContent={"space-between"}
      h={12}
      onMouseEnter={() => {
        setShowIcons(true);
      }}
      onMouseLeave={() => {
        setShowIcons(false);
      }}
    >
      {editing ? (
        <Flex flex={1} justifyContent={"space-between"}>
          <Input
            autoFocus
            onChange={editingTaskContent}
            flex={1}
            onKeyDown={editTaskWithEnter}
            value={inputValue}
            marginRight={5}
          ></Input>
          <Flex gap={3} alignItems={"center"} justifyContent={"center"}>
            <Image src={check} h={5} w={5} onClick={editTask} />
            <Image src={cancel} h={5} w={5} onClick={() => setEditing(false)} />
          </Flex>
        </Flex>
      ) : (
        <>
          <Text color={"#000"} fontSize={16}>
            {taskData.content}
          </Text>

          <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            borderRadius={"3px"}
            gap={3}
          >
            <Image
              src={edit}
              w={5}
              h={5}
              opacity={"0.6"}
              display={{ base: "block", lg: showIcons ? "block" : "none" }}
              _hover={{ cursor: "pointer", opacity: "0.8" }}
              onClick={() => {
                setEditing(true);
              }}
            />
            <Image
              src={deleteIcon}
              h={5}
              w={5}
              opacity={"0.6"}
              display={{ base: "block", lg: showIcons ? "block" : "none" }}
              _hover={{ cursor: "pointer", opacity: "0.8" }}
              onClick={() => onDelete({ taskId: taskData._id })}
            />
            <Box display={{ base: "block", lg: "none" }}>
              <Menu>
                <MenuButton as={Button} bg={"none"} padding={2}>
                  <Image src={showMore} h={5} w={5} opacity={"0.6"} />
                </MenuButton>

                <MenuList>
                  {sectionsToMove &&
                    sectionsToMove.map((section) => (
                      <MenuItem
                        fontSize={16}
                        key={section}
                        onClick={() =>
                          moveTaskMobileDesing({
                            taskId: taskData._id,
                            sectionSelected: section,
                          })
                        }
                      >
                        {section}
                      </MenuItem>
                    ))}
                </MenuList>
              </Menu>
            </Box>
          </Flex>
        </>
      )}
    </Flex>
  );
}

export default Task;
