import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class yearService {
  YearAdd(year) {
    const insertData = new FormData();
    insertData.set('year', year);
   

    return axios
      .post(API_URL + "admin/year/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  yearList() {
    return axios
      .get(API_URL + "admin/year/list")
      .then((response) => {
        return response.data;
      });
  }

  YearInfo(year_id) {
    return axios
      .post(API_URL + "admin/year/getinfo", { year_id })
      .then((response) => {
        return response.data;
      });
  }

  YearUpdate(year_id, year) {
    const updateData = new FormData();
    updateData.set('year_id', year_id);
    updateData.set('year', year);
   

    return axios
      .post(API_URL + "admin/year/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  YearDelete(year_id) {
    return axios
      .post(API_URL + "admin/year/delete", { year_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new yearService();