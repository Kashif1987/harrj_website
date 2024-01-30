import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class liftSpecificationsService {
  LiftSpecificationsAdd(lift_speci_name, lift_speci_description) {
    const insertData = new FormData();
    insertData.set('lift_speci_name', lift_speci_name);
    insertData.set('lift_speci_description', lift_speci_description);

    return axios
      .post(API_URL + "admin/lift_specification/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  LiftSpecificationsList() {
    return axios
      .get(API_URL + "admin/lift_specification/list")
      .then((response) => {
        return response.data;
      });
  }

  LiftSpecificationsInfo(lift_speci_id) {
    return axios
      .post(API_URL + "admin/lift_specification/getinfo", { lift_speci_id })
      .then((response) => {
        return response.data;
      });
  }

  LiftSpecificationsUpdate(lift_speci_id, lift_speci_name, lift_speci_description) {
    const updateData = new FormData();
    updateData.set('lift_speci_id', lift_speci_id);
    updateData.set('lift_speci_name', lift_speci_name);
    updateData.set('lift_speci_description', lift_speci_description);

    return axios
      .post(API_URL + "admin/lift_specification/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  LiftSpecificationsDelete(lift_speci_id) {
    return axios
      .post(API_URL + "admin/lift_specification/delete", { lift_speci_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new liftSpecificationsService();