import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class countryService {
  CountryAdd(country_name,country_name_arabic) {
    const insertData = new FormData();
    insertData.set('country_name', country_name);
    insertData.set("country_name_arabic",country_name_arabic)

    return axios
      .post(API_URL + "admin/country/add", insertData )
      .then((response) => {
        return response.data;
      });
  }
  CountryCityList(country_id) {
    const insertData = new FormData();
    insertData.set('country_id', country_id);

    return axios
      .post(API_URL + "admin/country/country_city_list", insertData )
      .then((response) => {
        return response.data;
      });
  }

  CountryList() {
    return axios
      .get(API_URL + "admin/country/list" , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  CountryInfo(country_id) {
    return axios
      .post(API_URL + "admin/country/getinfo", { country_id })
      .then((response) => {
        return response.data;
      });
  }

  CountryUpdate(country_id, country_name,country_name_arabic) {
    const updateData = new FormData();
    updateData.set('country_id', country_id);
    updateData.set('country_name', country_name);
    updateData.set('country_name_arabic', country_name_arabic);
    return axios
      .post(API_URL + "admin/country/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  CountryDelete(country_id) {
    return axios
      .post(API_URL + "admin/country/delete", { country_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new countryService();