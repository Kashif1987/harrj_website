import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class userService {
  UserAdd(team_id, reporting_to_id, profile_id, designation_id, user_name, mobile_no, email_id, address, location, pincode) {
    const insertData = new FormData();
    insertData.set('team_id', team_id);
    insertData.set('reporting_to', reporting_to_id);
    insertData.set('profile_id', profile_id);
    insertData.set('designation_id', designation_id);
    insertData.set('user_name', user_name);
    insertData.set('mobile_no', mobile_no);
    insertData.set('email_id', email_id);
    insertData.set('address', address);
    insertData.set('location', location);
    insertData.set('pincode', pincode);

    return axios
      .post(API_URL + "admin/user/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  UserList() {
    return axios
      .get(API_URL + "admin/bidder/list", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  UserInfo(user_id) {
    return axios
      .post(API_URL + "admin/user/getinfo", { user_id })
      .then((response) => {
        return response.data;
      });
  }

  UserUpdate(user_id, team_id, reporting_to_id, profile_id, designation_id, user_name, mobile_no, email_id, address, location, pincode) {
    const updateData = new FormData();
    updateData.set('user_id', user_id);
    updateData.set('team_id', team_id);
    updateData.set('reporting_to', reporting_to_id);
    updateData.set('profile_id', profile_id);
    updateData.set('designation_id', designation_id);
    updateData.set('user_name', user_name);
    updateData.set('mobile_no', mobile_no);
    updateData.set('email_id', email_id);
    updateData.set('address', address);
    updateData.set('location', location);
    updateData.set('pincode', pincode);

    return axios
      .post(API_URL + "admin/user/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  UserDelete(id) {
   
    return axios
      .post(API_URL + "admin/bidder/delete", {id},{ headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new userService();