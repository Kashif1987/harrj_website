import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class architectureService {
  ArchitectureAdd(architecture_name, architecture_description) {
    const insertData = new FormData();
    insertData.set('architecture_name', architecture_name);
    insertData.set('architecture_description', architecture_description);

    return axios
      .post(API_URL + "admin/architecture/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  ArchitectureList() {
    return axios
      .get(API_URL + "admin/architecture/list")
      .then((response) => {
        return response.data;
      });
  }

  ArchitectureInfo(architecture_id) {
    return axios
      .post(API_URL + "admin/architecture/getinfo", { architecture_id })
      .then((response) => {
        return response.data;
      });
  }

  ArchitectureUpdate(architecture_id, architecture_name, architecture_description) {
    const updateData = new FormData();
    updateData.set('architecture_id', architecture_id);
    updateData.set('architecture_name', architecture_name);
    updateData.set('architecture_description', architecture_description);

    return axios
      .post(API_URL + "admin/architecture/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  ArchitectureDelete(architecture_id) {
    return axios
      .post(API_URL + "admin/architecture/delete", { architecture_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new architectureService();