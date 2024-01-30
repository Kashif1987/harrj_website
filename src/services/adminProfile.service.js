import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class profileService {
  ProfileAdd(profile) {
    const insertData = new FormData();
    insertData.set('profile', profile);

    return axios
      .post(API_URL + "admin/profile/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  ProfileList() {
    return axios
      .get(API_URL + "admin/profile/list")
      .then((response) => {
        return response.data;
      });
  }

  ProfileInfo(profile_id) {
    return axios
      .post(API_URL + "admin/profile/getinfo", { profile_id })
      .then((response) => {
        return response.data;
      });
  }

  ProfileUpdate(profile_id, profile) {
    const updateData = new FormData();
    updateData.set('profile_id', profile_id);
    updateData.set('profile', profile);

    return axios
      .post(API_URL + "admin/profile/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  ProfileDelete(profile_id) {
    return axios
      .post(API_URL + "admin/profile/delete", { profile_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new profileService();