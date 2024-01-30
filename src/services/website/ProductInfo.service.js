import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class ProductInfoService {
  BidProduct(bidder_id, product_id, bid_amount, customer_id) {
    const bidData = new FormData();

    bidData.set("bidder_id", bidder_id);
    bidData.set("product_id", product_id);
    bidData.set("bid_amount", bid_amount);
    bidData.set("customer_id", customer_id);
    console.log(authHeader);
    return axios
      .post(API_URL + "website/bidder/add_bid", bidData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  BidComment(product_id, insert_id, user_id, comment) {
    const commentData = new FormData();

    commentData.set("product_id", product_id);
    commentData.set("bid_id", insert_id);
    commentData.set("user_id", user_id);
    commentData.set("comment", comment);
    return axios
      .post(API_URL + "website/comment/add", commentData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  LiveLogin(user_id) {
    console.log("handle Live Login service");
    return axios
      .post(API_URL + "website/login/live_login", { user_id })
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
}

export default new ProductInfoService();
