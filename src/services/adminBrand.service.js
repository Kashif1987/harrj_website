import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class brandService {
  BrandAdd(cat_id,sub_cat_id,brand_name,brand_arabicname,brand_img) {
    const insertData = new FormData();
   // insertData.set('brand_name', brand_name);
    insertData.set('category_id', cat_id);
    insertData.set('sub_category_id', sub_cat_id);
    //insertData.set('brand_img', brand_img[0]);
    for(var i=0; i<brand_name.length; i++){
      insertData.append('brand_name', brand_name[i]);
    }
    for(var i=0; i<brand_arabicname.length; i++){
      insertData.append('brand_name_arabic', brand_arabicname[i]);
    }

    for(var j=0; j<brand_img.length; j++){
      insertData.append('brand_img', brand_img[j]);
    }
    return axios
      .post(API_URL + "admin/brand/add_many_brand_list", insertData, { headers: authHeader() } )
      .then((response) => {
        return response.data;
      });
  }
  BrandList() {
    return axios
      .get(API_URL + "admin/brand/list")
      .then((response) => {
        return response.data;
      });
  }
  
BrandOfCatList(category_id){
  const insertData = new FormData();
 
    insertData.set('category_id', category_id);
  return axios
  .post(API_URL + "admin/category/cat_brand_list",insertData, { headers: authHeader() })
  .then((response) => {
    return response.data;
  });
 
}
SubCatBrandList(subcategory_id) {
  const insertData = new FormData();

  insertData.set('sub_category_id', subcategory_id);
  return axios
    .post(API_URL + "admin/brand/subcat_brand_list",insertData , { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
}
BrandModelLst(brand_id){
  const insertData = new FormData();
 
    insertData.set('brand_id', brand_id);
  return axios
  .post(API_URL + "admin/brand/brand_model_list",insertData, { headers: authHeader() })
  .then((response) => {
    return response.data;
  });
 
}
  BrandInfo(brand_id) {
    return axios
      .post(API_URL + "admin/brand/getinfo", { brand_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  BrandUpdate(brand_id, brand_name,brand_arabicname,brand_img,cat_id,sub_cat_id) {
    const updateData = new FormData();
    updateData.set('brand_id', brand_id);
    updateData.set('brand_name', brand_name);
    updateData.set('brand_name_arabic', brand_arabicname);
    updateData.set('brand_img', brand_img[0]);
    updateData.set('category_id', cat_id);
    updateData.set('sub_category_id', sub_cat_id);
    return axios
      .post(API_URL + "admin/brand/update", updateData, { headers: authHeader() } )
      .then((response) => {
        return response.data;
      });
  }
  
  BrandDelete(brand_id) {
    return axios
      .post(API_URL + "admin/brand/delete", { brand_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new brandService();