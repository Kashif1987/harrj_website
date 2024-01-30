import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class ProductInfoService {

  BidProduct(bidder_id,product_id,bid_amount,customer_id){
    const bidData = new FormData();
    
    bidData.set('bidder_id', bidder_id);
    bidData.set('product_id', product_id);
    bidData.set('bid_amount', bid_amount);
    bidData.set('customer_id', customer_id);
    console.log(authHeader)
    return axios
    .post(API_URL + "website/bidder/add_bid", bidData, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
}
CommentAdd(prodid,userid,comment){
  const bidData = new FormData();
    
    bidData.set('product_id', prodid);
    bidData.set('user_id', userid);
    bidData.set('comment', comment);
  
  return axios
  .post(API_URL + "website/comment/add ", bidData)
  .then((response) => {
    console.log("response of product ifno")
    console.log(response.data)
    return response.data;
  });
 }
 CommentList(prodid){
  console.log("service is notification")
    let autype="golivenow"
    return axios
    .get(API_URL + "website/comment/list?product_id="+prodid)
    .then((response) => {
      return response.data;
    });
 }
  LiveLogin(user_id){
    console.log("handle Live Login service")
    return axios
    .post(API_URL + "website/login/live_login", { user_id })
    .then((response) => {
      console.log("response of product ifno")
      console.log(response.data)
      return response.data;
    });
  }
 ProductInfo(product_id) {
console.log("prod info service")
    return axios
      .post(API_URL + "admin/product/getinfo", { product_id })
      .then((response) => {
        console.log("response of product ifno")
        console.log(response.data)
        return response.data;
      });
  }

}

export default new ProductInfoService();