import { Flex, Spinner, Text, Box } from "@chakra-ui/react";
import React, { useContext } from "react";
import Task from "./Task";
import { userContext } from "../context/userContext";
import NewTaskButton from "./NewTaskButton";
import { useDrop } from "react-dnd";

function TasksSection({
  section,
  tasks,
  onDelete,
  onCreateTask,
  isLoading,
  onEditTask,
  onDropTask,
  sections,
  sectionSelected,
  moveTaskMobileDesing,
}) {
  const { user } = useContext(userContext);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "TASK",
    drop: () => ({ section }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <Flex
      ref={drop}
      bg={isOver ? "#EBECF6" : "#EBECF0"}
      w="100%"
      minH={{ base: "", lg: 150 }}
      borderRadius={"5px"}
      direction={"column"}
      alignItems={isLoading ? "center" : { base: "center", lg: "flex-start" }}
      gap={3}
      padding={3}
      h={tasks && tasks.length === 0 ? 120 : "100%"}
      justifyContent={{ base: "space-between" }}
    >
      <Box w="100%">
        <Text
          fontWeight={"600"}
          marginLeft={2}
          marginBottom={2}
          display={{ base: "none", lg: "block" }}
        >
          {section}
        </Text>
        {isLoading ? (
          <Spinner />
        ) : (
          tasks &&
          tasks.map((task, index) => {
            return (
              <Task
                moveTaskMobileDesing={moveTaskMobileDesing}
                sectionSelected={sectionSelected}
                sections={sections}
                taskData={task}
                key={index}
                user={user}
                onDelete={onDelete}
                onEditTask={onEditTask}
                onDropTask={onDropTask}
              />
            );
          })
        )}
      </Box>
      <NewTaskButton onCreateTask={onCreateTask} section={section} />
    </Flex>
  );
}

export default TasksSection;
