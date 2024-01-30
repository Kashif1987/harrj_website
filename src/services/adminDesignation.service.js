import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class designationService {
  DesignationAdd(designation) {
    const insertData = new FormData();
    insertData.set('designation', designation);

    return axios
      .post(API_URL + "admin/designation/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  DesignationList() {
    return axios
      .get(API_URL + "admin/designation/list")
      .then((response) => {
        return response.data;
      });
  }

  DesignationInfo(designation_id) {
    return axios
      .post(API_URL + "admin/designation/getinfo", { designation_id })
      .then((response) => {
        return response.data;
      });
  }

  DesignationUpdate(designation_id, designation) {
    const updateData = new FormData();
    updateData.set('designation_id', designation_id);
    updateData.set('designation', designation);

    return axios
      .post(API_URL + "admin/designation/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  DesignationDelete(designation_id) {
    return axios
      .post(API_URL + "admin/designation/delete", { designation_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new designationService();