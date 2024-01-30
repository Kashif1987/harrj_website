import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class stateService {
  StateAdd(country_id, state_name) {
    const insertData = new FormData();
    insertData.set('country_id', country_id);
    insertData.set('state_name', state_name);

    return axios
      .post(API_URL + "admin/state/add", insertData )
      .then((response) => {
        return response.data;
      });
  }


  StateList() {
    return axios
      .get(API_URL + "admin/state/list")
      .then((response) => {
        return response.data;
      });
  }

  StateListByCountry(country_id) {
    return axios
      .get(API_URL + "admin/state/listoncountry?country_id="+country_id)
      .then((response) => {
        return response.data;
      });
  }

  StateInfo(state_id) {
    return axios
      .post(API_URL + "admin/state/getinfo", { state_id })
      .then((response) => {
        return response.data;
      });
  }

  StateUpdate(state_id, country_id, state_name, sub_task_description) {
    const updateData = new FormData();
    updateData.set('state_id', state_id);
    updateData.set('country_id', country_id);
    updateData.set('state_name', state_name);

    return axios
      .post(API_URL + "admin/state/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  StateDelete(state_id) {
    return axios
      .post(API_URL + "admin/state/delete", { state_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new stateService();