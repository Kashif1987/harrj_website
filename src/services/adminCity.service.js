import axios from "axios";
import authHeader from "./auth-header";

/*import * as globalSettings from './../globalSettings';

const API_URL = globalSettings.API_URL;*/

const API_URL = process.env.REACT_APP_API_URL;

class cityService {
  CityAdd(city_name,city_name_arabic, country_id) {

    var user_id = 1;

    const insertData = new FormData();
    insertData.set('city_name', city_name);
    insertData.set('city_name_arabic',city_name_arabic);
    insertData.set('country_id', country_id);
    

    return axios
      .post(API_URL + "admin/city/add", insertData , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  CityList() {

    return axios
      .get(API_URL + "admin/city/list", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  CityInfo(city_id) {

    return axios
      .post(API_URL + "admin/city/getinfo", { city_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  CityUpdate(city_id, city_name, city_name_arabic,country_id) {
   
    var user_id = 1;

    const updateData = new FormData();
    updateData.set('city_name', city_name);
    updateData.set('country_id', country_id);
    updateData.set('city_name_arabic', city_name_arabic);
    updateData.set('city_id', city_id);

    return axios
      .post(API_URL + "admin/city/update", updateData , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  
  CityDelete(city_id) {

    var user_id = 1;

    return axios
      .post(API_URL + "admin/city/delete", { user_id, city_id })
      .then((response) => {
        return response.data;
      });
  }

  CityListById(state_id) {

    var user_id = 1;

    return axios
      .post(API_URL + "admin/city/bystateid", { state_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new cityService();