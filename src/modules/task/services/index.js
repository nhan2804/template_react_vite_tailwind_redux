import axios from "axios";

export const createTask = (requestData) => {
  return axios.post("/task", requestData);
};
export const showTask = (id) => {
  return axios.get(`/task/${id}`);
};

export const fetchTask = (id) => {
  return axios.get(`/project/${id}/tasks`);
};
export const fetchTaskUnsign = (id) => {
  return axios.get(`/project/${id}/tasks-unsign`);
};
export const createTodo = (taskId, requestData) => {
  return axios.post("/todo", { ...requestData, task_id: taskId });
};
export const fetchTodo = (id) => {
  return axios.get(`/todo/${id}`);
};
export const createTaskComment = (taskId, requestData) => {
  return axios.post("/comment", {
    ...requestData,
    type_comment: "TASK",
    post_id: taskId,
  });
};
export const fetchComment = (id) => {
  return axios.get(`/comment/${id}?type=TASK`);
};
export const updateTodo = (id, data) => {
  return axios.put(`/todo/${id}`, data);
};
export const updateTask = (id, data) => {
  return axios.put(`/task/${id}`, data);
};
export const deleteTask = (id) => {
  return axios.delete(`/task/${id}`);
};
export const doneTodo = ({ idProject, idTask, data }) => {
  return axios.put(`/project/${idProject}/task/${idTask}/todo`, data);
};
export const updateComment = (id, data) => {
  return axios.put(`/comment/${id}`, data);
};
export const fetchTaskDetail = (id) => {
  return axios.get(`/project/${id}/tasks`);
};
export const deleteTodo = (id) => {
  return axios.delete(`/todo/${id}`);
};
export const getTaskPermission = (idProject, idTask) => {
  return axios.get(`/project/${idProject}/task/${idTask}/check-has-in`);
};
