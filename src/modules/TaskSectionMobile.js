import { Flex, Text } from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import TasksSection from "./TasksSection";

function TaskSectionMobile({
  sections,
  tasks,
  onDelete,
  onCreateTask,
  loading,
  onEditTask,
}) {
  const [sectionSelected, setSectionSelected] = useState("To Do");

  const sectionTasks = useMemo(() => {
    return tasks.filter((task) => task.status === sectionSelected);
  }, [sectionSelected, tasks]);

  const moveTaskMobileDesing = ({ sectionSelected, taskId }) => {
    onEditTask({ id: taskId, status: sectionSelected });
  };

  return (
    <Flex
      bg="#EBECF0"
      w={"90vw"}
      borderRadius={5}
      display={{ base: "flex", lg: "none" }}
      direction={"column"}
      minH={300}
      justifyContent={"space-between"}
    >
      <Flex justifyContent={"space-around"} padding={5}>
        {sections.map((section, index) => (
          <Text
            textDecoration={sectionSelected === section && "underline"}
            key={index}
            onClick={() => setSectionSelected(section)}
            opacity={sectionSelected === section ? 1 : 0.1}
          >
            {section}
          </Text>
        ))}
      </Flex>
      <TasksSection
        section={sectionSelected}
        tasks={sectionTasks}
        onDelete={onDelete}
        onCreateTask={onCreateTask}
        isLoading={loading}
        onEditTask={onEditTask}
        sections={sections}
        sectionSelected={sectionSelected}
        moveTaskMobileDesing={moveTaskMobileDesing}
      />
    </Flex>
  );
}

export default TaskSectionMobile;
