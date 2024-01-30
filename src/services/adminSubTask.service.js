import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class subtaskService {
  SubTaskAdd(task_id, sub_task_name, sub_task_description) {
    const insertData = new FormData();
    insertData.set('task_id', task_id);
    insertData.set('sub_task_name', sub_task_name);
    insertData.set('sub_task_description', sub_task_description);

    return axios
      .post(API_URL + "admin/sub_task/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  SubTaskList() {
    return axios
      .get(API_URL + "admin/sub_task/list")
      .then((response) => {
        return response.data;
      });
  }

  SubTaskInfo(sub_task_id) {
    return axios
      .post(API_URL + "admin/sub_task/getinfo", { sub_task_id })
      .then((response) => {
        return response.data;
      });
  }

  SubTaskUpdate(sub_task_id, task_id, sub_task_name, sub_task_description) {
    const updateData = new FormData();
    updateData.set('sub_task_id', sub_task_id);
    updateData.set('task_id', task_id);
    updateData.set('sub_task_name', sub_task_name);
    updateData.set('sub_task_description', sub_task_description);

    return axios
      .post(API_URL + "admin/sub_task/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  SubTaskDelete(sub_task_id) {
    return axios
      .post(API_URL + "admin/sub_task/delete", { sub_task_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new subtaskService();