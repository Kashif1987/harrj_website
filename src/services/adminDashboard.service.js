import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class DashboardService {
  DashboardCount() {
    return axios
      .get(API_URL + "admin/dashboard/dashboard_count", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

}

export default new DashboardService();