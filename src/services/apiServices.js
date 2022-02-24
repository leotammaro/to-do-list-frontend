import axios from "axios";

export const getTasks = ({ user }) => {
  return axios({
    method: "get",
    url: "http://localhost:3001/tasks",
    headers: { Authorization: user.accessToken },
  });
};

export const createTask = ({ user, inputValue, section }) => {
  return axios({
    method: "post",
    url: "http://localhost:3001/tasks",
    data: { content: inputValue, status: section },
    headers: { Authorization: user.accessToken },
  });
};

export const deleteTaskService = ({ taskId, user }) => {
  return axios({
    method: "delete",
    url: "http://localhost:3001/task",
    headers: { Authorization: user.accessToken },
    data: { _id: taskId },
  });
};

export const editTaskService = ({ inputValue, user, id, status }) => {
  return axios({
    method: "put",
    url: "http://localhost:3001/task",
    headers: { Authorization: user.accessToken },
    data: {
      ...(inputValue && { content: inputValue }),
      ...(status && { status }),
      ...(id && { _id: id }),
    },
  });
};
