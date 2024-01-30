import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class categoryService {
  CategoryAdd(category_name,category_name_arabic,category_img) {
    const insertData = new FormData();
    insertData.set('category_name', category_name);
    insertData.set('category_name_arabic', category_name_arabic);

    insertData.set('category_img', category_img[0]);

    return axios
      .post(API_URL + "admin/category/add", insertData, { headers: authHeader() } )
      .then((response) => {
        return response.data;
      });
  }

  CategoryList() {
    return axios
      .get(API_URL + "admin/category/list", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  CategoryInfo(category_id) {
    return axios
      .post(API_URL + "admin/category/getinfo", { category_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  CategoryUpdate(category_id, category_name,category_name_arabic,category_img) {
    const updateData = new FormData();
    updateData.set('category_id', category_id);
    updateData.set('category_name', category_name);
    updateData.set('category_name_arabic', category_name_arabic);
    updateData.set('category_img', category_img[0]);

    return axios
      .post(API_URL + "admin/category/update", updateData , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  
  CategoryDelete(category_id) {
    return axios
      .post(API_URL + "admin/category/delete", { category_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new categoryService();