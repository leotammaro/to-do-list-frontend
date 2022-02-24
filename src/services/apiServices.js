import axios from "axios";

export const getTasks = ({ user }) => {
  return axios({
    method: "get",
    url: `${process.env.REACT_APP_SERVER_URI}/tasks`,
    headers: { Authorization: user.accessToken },
  });
};

export const createTask = ({ user, inputValue, section }) => {
  return axios({
    method: "post",
    url: `${process.env.REACT_APP_SERVER_URI}/tasks`,
    data: { content: inputValue, status: section },
    headers: { Authorization: user.accessToken },
  });
};

export const deleteTaskService = ({ taskId, user }) => {
  return axios({
    method: "delete",
    url: `${process.env.REACT_APP_SERVER_URI}/task`,
    headers: { Authorization: user.accessToken },
    data: { _id: taskId },
  });
};

export const editTaskService = ({ inputValue, user, id, status }) => {
  return axios({
    method: "put",
    url: `${process.env.REACT_APP_SERVER_URI}/task`,
    headers: { Authorization: user.accessToken },
    data: {
      ...(inputValue && { content: inputValue }),
      ...(status && { status }),
      ...(id && { _id: id }),
    },
  });
};
