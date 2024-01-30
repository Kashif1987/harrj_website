import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class materialCategoryService {
  MaterialCategoryAdd(material_category_name) {
    const insertData = new FormData();
    insertData.set('material_category_name', material_category_name);

    return axios
      .post(API_URL + "admin/material_category/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  MaterialCategoryList() {
    return axios
      .get(API_URL + "admin/material_category/list")
      .then((response) => {
        return response.data;
      });
  }

  MaterialCategoryInfo(material_category_id) {
    return axios
      .post(API_URL + "admin/material_category/getinfo", { material_category_id })
      .then((response) => {
        return response.data;
      });
  }
 
  MaterialCategoryUpdate(material_category_id, material_category_name) {
    const updateData = new FormData();
    updateData.set('material_category_id', material_category_id);
    updateData.set('material_category_name', material_category_name);

    return axios
      .post(API_URL + "admin/material_category/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  MaterialCategoryDelete(material_category_id) {
    return axios
      .post(API_URL + "admin/material_category/delete", { material_category_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new materialCategoryService();