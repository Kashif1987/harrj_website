import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class subcategoryService {
  SubCategoryAdd(category_id, subCategoryNameVar,subCategoryArabicNameVar,subCategoryImgArry,subCategoryyearVar) {
    
    console.log("category_id: ");
    console.log(category_id);

    console.log("subCategoryNameVar: ");
    console.log(subCategoryNameVar);

    console.log("subCategoryImgArry: ");
    console.log(subCategoryImgArry);

    const insertData = new FormData();
    insertData.set('category_id', category_id);
    
    for(var i=0; i<subCategoryNameVar.length; i++){
      insertData.append('sub_category_name', subCategoryNameVar[i]);
    }
    for(var i=0; i<subCategoryArabicNameVar.length; i++){
      insertData.append('sub_category_name_arabic', subCategoryArabicNameVar[i]);
    }
    
    for(var j=0; j<subCategoryImgArry.length; j++){
      insertData.append('sub_category_img', subCategoryImgArry[j]);
    }
    //  for(var j=0; j<subCategoryYearArry.length; j++){
    //    console.log("value ")
    //    console.log(subCategoryYearArry[j])
    //   insertData.append('sub_category_year_applies', subCategoryYearArry[j]);
    // }

    // for(var j=0; j<subCategoryyearVar.length; j++){
    //   console.log("value ")
    //   console.log(subCategoryyearVar)
     insertData.set('sub_category_year_applies', subCategoryyearVar);
  //  }


    console.log("insertData: ");
    console.log(insertData);

    return axios
      .post(API_URL + "admin/sub_category/add_many_list", insertData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  SubCategoryList() {
    return axios
      .get(API_URL + "admin/sub_category/list", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

   SubCategoryListByCategory(category_id) {
    return axios
      .get(API_URL + "admin/sub_category/list_by_category_id?category_id="+category_id)
      .then((response) => {
        return response.data;
      });
  }

  SubCategoryInfo(sub_category_id) {
    return axios
      .post(API_URL + "admin/sub_category/getinfo", { sub_category_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  SubCategoryUpdate(sub_category_id, category_id, sub_category_name, sub_category_name_arabic,sub_category_img,year_applies) {
    const updateData = new FormData();
    updateData.set('sub_category_id', sub_category_id);
    updateData.set('category_id', category_id);
    updateData.set('sub_category_name', sub_category_name);
    updateData.set('sub_category_name_arabic', sub_category_name_arabic);
    updateData.set('sub_category_img', sub_category_img[0]);
    updateData.set('sub_category_year_applies',year_applies)


    return axios
      .post(API_URL + "admin/sub_category/update", updateData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  
  SubCategoryDelete(sub_category_id) {
    return axios
      .post(API_URL + "admin/sub_category/delete", { sub_category_id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new subcategoryService();