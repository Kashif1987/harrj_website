import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class teamService {
  TeamAdd(team_name, team_description) {
    const insertData = new FormData();
    insertData.set('team_name', team_name);
    insertData.set('team_description', team_description);

    return axios
      .post(API_URL + "admin/team/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  TeamList() {
    return axios
      .get(API_URL + "admin/team/list")
      .then((response) => {
        return response.data;
      });
  }

  TeamInfo(team_id) {
    return axios
      .post(API_URL + "admin/team/getinfo", { team_id })
      .then((response) => {
        return response.data;
      });
  }

  TeamUpdate(team_id, team_name, team_description) {
    const updateData = new FormData();
    updateData.set('team_id', team_id);
    updateData.set('team_name', team_name);
    updateData.set('team_description', team_description);

    return axios
      .post(API_URL + "admin/team/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  TeamDelete(team_id) {
    return axios
      .post(API_URL + "admin/team/delete", { team_id })
      .then((response) => {
        return response.data;
      });
  }

   ListTeamUsers(team_id) {
    return axios
      .post(API_URL + "admin/user/users_list_by_team_id", { team_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new teamService();