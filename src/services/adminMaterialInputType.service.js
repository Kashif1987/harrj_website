import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class materialInputTypeService {
  MaterialInputTypeAdd(material_category_id, material_input_type_name) {
    const insertData = new FormData();

    insertData.set('material_category_id', material_category_id);
    insertData.set('material_input_type_name', material_input_type_name);

    return axios
      .post(API_URL + "admin/material_input_type/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  MaterialInputTypeList() {
    return axios
      .get(API_URL + "admin/material_input_type/list")
      .then((response) => {
        return response.data;
      });
  }

  MaterialInputTypeInfo(material_input_type_id) {
    return axios
      .post(API_URL + "admin/material_input_type/getinfo", { material_input_type_id })
      .then((response) => {
        return response.data;
      });
  }
 
  MaterialInputTypeUpdate(material_input_type_id, material_category_id, material_input_type_name) {
    const updateData = new FormData();
    updateData.set('material_input_type_id', material_input_type_id);
    updateData.set('material_category_id', material_category_id);
    updateData.set('material_input_type_name', material_input_type_name);

    return axios
      .post(API_URL + "admin/material_input_type/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  MaterialInputTypeDelete(material_input_type_id) {
    return axios
      .post(API_URL + "admin/material_input_type/delete", { material_input_type_id })
      .then((response) => {
        return response.data;
      });
  }

  MaterialInputTypeListByMaterialCategoryID(material_category_id) {
    return axios
      .post(API_URL + "admin/material_input_type/material_input_type_list_by_material_category_id", { material_category_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new materialInputTypeService();