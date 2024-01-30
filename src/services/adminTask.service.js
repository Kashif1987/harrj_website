import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class taskService {
  TaskAdd(task_name, task_description) {
    const insertData = new FormData();
    insertData.set('task_name', task_name);
    insertData.set('task_description', task_description);

    return axios
      .post(API_URL + "admin/task/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  TaskList() {
    return axios
      .get(API_URL + "admin/task/list")
      .then((response) => {
        return response.data;
      });
  }

  TaskInfo(task_id) {
    return axios
      .post(API_URL + "admin/task/getinfo", { task_id })
      .then((response) => {
        return response.data;
      });
  }

  TaskUpdate(task_id, task_name, task_description) {
    const updateData = new FormData();
    updateData.set('task_id', task_id);
    updateData.set('task_name', task_name);
    updateData.set('task_description', task_description);

    return axios
      .post(API_URL + "admin/task/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  TaskDelete(task_id) {
    return axios
      .post(API_URL + "admin/task/delete", { task_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new taskService();