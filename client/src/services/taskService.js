import API from "../api/axios";

export const createTask = (task) => {
  return API.post("/tasks", task);
};

export const getTasksByUser = (userId) => {
  return API.get(`/tasks/user/${userId}`);
};

export const updateTask = (taskId, task) => {
  return API.put(`/tasks/${taskId}`, task);
};

export const markTaskCompleted = (taskId) => {
  return API.patch(`/tasks/${taskId}/COMPLETE`);
};

export const deleteTask = (taskId) => {
  return API.delete(`/tasks/${taskId}`);
};

export const getTasksByPriority = (priority) => {
  return API.get(`/tasks/priority/${priority}`);
};

export const getTasksByStatus = (status) => {
  return API.get(`/tasks/status/${status}`);
};

export const getTasksByDueDate = (dueDate) => {
  return API.get(`/tasks/due?dueDate=${dueDate}`);
};

