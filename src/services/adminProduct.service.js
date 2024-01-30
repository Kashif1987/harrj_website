import axios from "axios";
import authHeader from "./auth-header";

/*import * as globalSettings from './../globalSettings';

const API_URL = globalSettings.API_URL;*/

const API_URL = process.env.REACT_APP_API_URL;

class ProductService {
  ProductAdd(title, name, description, keywords, category_id, sub_category_id, brand_id, model_id, country_id, city_id, start_date_time, end_date_time,
    auction_type, starting_price, high_price, final_price, refund_days, youtube_link, product_img, video, start_time, end_time, year_id) {

    // var user_id = 1;

    const insertData = new FormData();
    debugger
    insertData.set('title', title);
    insertData.set('name', name);
    insertData.set('description', description);
    insertData.set('keywords', keywords);
    insertData.set('category_id', category_id);
    insertData.set('sub_category_id', sub_category_id);
    insertData.set('start_date_time', start_date_time);
    insertData.set('end_date_time', end_date_time);
    insertData.set('starting_price', starting_price);
    insertData.set('high_price', high_price);
    insertData.set('final_price', final_price);
    // insertData.set('refund', refund);
    insertData.set('refund_days', refund_days);
    insertData.set('youtube_link', youtube_link);
    insertData.set('auction_type', auction_type);
    insertData.set('start_time', start_time);
    insertData.set('end_time', end_time);
    insertData.set('brand_id', brand_id);
    insertData.set('model_id', model_id);
    insertData.set('country_id', country_id);
    insertData.set('city_id', city_id);
    insertData.set('year_id', year_id)

    let adminUser = JSON.parse(localStorage.getItem("user")).data
    let adminid = JSON.stringify(adminUser)
    //console.log("adminUser+++"+)
    insertData.set('customer_id', JSON.parse(adminid)[0].id)

    if (product_img && typeof product_img !== "undefined" && product_img.length > 0) {
      for (let p = 0; p < product_img.length; p++) {
        insertData.append('product_img', product_img[p]);
      }
    }
    if (video && typeof video !== "undefined" && video.length > 0) {
      for (let p = 0; p < video.length; p++) {
        insertData.append('video', video[p]);
      }
    }

    return axios
      .post(API_URL + "admin/product/add", insertData, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  ProductList() {

    return axios
      .get(API_URL + "admin/product/list")
      .then((response) => {
        return response.data;
      });
  }

  ProductInfo(product_id) {

    return axios
      .post(API_URL + "admin/product/getinfo", { product_id })
      .then((response) => {
        return response.data;
      });
  }

  ProductUpdate(product_id, title, name, description, keywords, category_id, brand_id, model_id, country_id, city_id, sub_category_id, start_date_time, end_date_time,
    auction_type, starting_price, high_price, final_price, refund, refund_days, youtube_link, product_img, video, start_time, end_time, user_id) {

    var user_id = 1;

    const updateData = new FormData();

    updateData.set('product_id', product_id);
    updateData.set('title', title);
    updateData.set('name', name);
    updateData.set('description', description);
    updateData.set('keywords', keywords);
    updateData.set('category_id', category_id);
    updateData.set('sub_category_id', sub_category_id);
    updateData.set('start_date_time', start_date_time);
    updateData.set('end_date_time', end_date_time);
    updateData.set('starting_price', starting_price);
    updateData.set('high_price', high_price);
    updateData.set('final_price', final_price);
    // updateData.set('refund', refund);
    updateData.set('refund_days', refund_days);
    updateData.set('zoom_link', youtube_link);
    updateData.set('auction_type', auction_type);
    updateData.set('start_time', start_time);
    updateData.set('end_time', end_time);
    updateData.set('brand_id', brand_id);
    updateData.set('model_id', model_id);
    updateData.set('country_id', country_id);

    updateData.set('city_id', city_id);
    let adminUser = JSON.parse(localStorage.getItem("user")).data
    let adminid = JSON.stringify(adminUser)
    //console.log("adminUser+++"+)
    updateData.set('customer_id', JSON.parse(adminid)[0].id)
    // updateData.set('user_id', user_id);


    if (product_img && typeof product_img !== "undefined" && product_img.length > 0) {
      for (let p = 0; p < product_img.length; p++) {
        updateData.append('product_img', product_img[p]);
      }
    }
    if (video && typeof video !== "undefined" && video.length > 0) {
      for (let p = 0; p < video.length; p++) {
        updateData.append('video', video[p]);
      }
    }


    return axios
      .post(API_URL + "admin/product/update", updateData)
      .then((response) => {
        return response.data;
      });
  }

  ProductDelete(product_id) {

    var user_id = 1;

    return axios
      .post(API_URL + "admin/product/delete", { user_id, product_id })
      .then((response) => {
        return response.data;
      });
  }

  ProductListById(state_id) {

    var user_id = 1;

    return axios
      .post(API_URL + "admin/product/bystateid", { state_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new ProductService();