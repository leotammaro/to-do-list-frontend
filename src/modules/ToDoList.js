import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../context/userContext";
import {
  createTask,
  deleteTaskService,
  editTaskService,
  getTasks,
} from "../services/apiServices";
import TaskSectionMobile from "./TaskSectionMobile";
import TasksSection from "./TasksSection";

const sections = ["To Do", "Doing", "Endeed"];

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const { user } = useContext(userContext);
  const [loading, setLoading] = useState(true);

  const onDelete = ({ taskId }) => {
    deleteTaskService({ taskId, user });
    setTasks((tasks) => {
      return tasks?.filter((task) => task._id !== taskId)
    });
  };

  const onCreateTask = ({ section, inputValue }) => {
    createTask({ user, inputValue, section }).then((response) => {
      setTasks([...tasks, response.data]);
    });
  };

  const onEditTask = ({ id, status, inputValue }) => {
    return editTaskService({ id, status, user, inputValue }).then(
      (response) => {
        let editedTask = tasks?.find((task) => task._id === response.data._id);
        editedTask = response.data;
        setTasks([...tasks?.filter((task) => task._id !== id), editedTask]);
      }
    );
  };

  const onDropTask = ({ taskId, section }) => {
    let droppedTask = tasks?.find((task) => task._id === taskId);
    droppedTask.status = section;
    setTasks([...tasks?.filter((task) => task._id !== taskId), droppedTask]);
    editTaskService({ id: taskId, status: section, user });
  };

  useEffect(() => {
    setTasks([]);
    if (user) {
      getTasks({ user }).then((response) => {

        setTasks(response.data);
        setLoading(false);
      });
    }
  }, [user]);

  return (
    <Flex
      fontSize={20}
      marginTop={{ base: 0, lg: 5 }}
      w={"100vw"}
      gap={6}
      direction={{ base: "column", lg: "row" }}
      justifyContent="center"
      flex={{ base: 1, lg: 0 }}
    >
      {user ? (
        <>
          <Flex
            display={{ base: "none", lg: "flex" }}
            gap={6}
            w={"100%"}
            justifyContent="center"
            h="100%"
          >
            {tasks &&
              sections?.map((section) => {
                const taskBySection = tasks.filter(
                  (task) => task.status === section
                );
                return (
                  <TasksSection
                    onDropTask={onDropTask}
                    section={section}
                    tasks={taskBySection}
                    onDelete={onDelete}
                    onCreateTask={onCreateTask}
                    isLoading={loading}
                    key={section}
                    onEditTask={onEditTask}
                  />
                );
              })}
          </Flex>
          <TaskSectionMobile
            sections={sections}
            tasks={tasks}
            onDelete={onDelete}
            onCreateTask={onCreateTask}
            isLoading={loading}
            onEditTask={onEditTask}
          />
        </>
      ) : (
        <>
          <Text>Agrega y ordena tus tareas! Clasificalas segun su avance</Text>
        </>
      )}
    </Flex>
  );
}

export default ToDoList;
