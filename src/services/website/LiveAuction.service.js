import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class LiveAuctionService {
  LiveListFilter(
    auction_type,
    category_id,
    sub_category_id,
    brand_id,
    model_id,
    pricevalue,
    year,
    country_id,
    city_id,
    sort_by
  ) {
    const insertData = new FormData();
    // console.log("category_id")
    // console.log(category_id)

    // if(category_id && typeof category_id !=="undefined" && category_id.length>0){
    //     for (var i = 0; i < category_id.length; i++) {
    //       insertData.append('category_id', category_id[i]);
    //     }
    //   }
    //    if(sub_category_id && typeof sub_category_id !=="undefined" && sub_category_id.length>0){
    //     for (var i = 0; i < sub_category_id.length; i++) {
    //       insertData.append('sub_category_id', sub_category_id[i]);
    //     }
    //   }
    //   if(brand_id && typeof brand_id !=="undefined" && brand_id.length>0){
    //     for (var i = 0; i < brand_id.length; i++) {
    //       insertData.append('brand_id', brand_id[i]);
    //     }
    //   }
    //   if(model_id && typeof model_id !=="undefined" && model_id.length>0){
    //     for (var i = 0; i < model_id.length; i++) {
    //       insertData.append('model_id', model_id[i]);
    //     }
    //   }
    //   insertData.append('starting_price',pricevalue)
    //   if(year && typeof year !=="undefined" && year.length>0){
    //     for (var i = 0; i < year.length; i++) {
    //       insertData.append('year', year[i]);
    //     }
    //   }
    return axios
      .get(
        API_URL +
          "website/product/list?auction_type=" +
          auction_type +
          "&category_id=" +
          category_id +
          "&sub_category_id=" +
          sub_category_id +
          "&brand_id=" +
          brand_id +
          "&model_id=" +
          model_id +
          "&max_price_filter=" +
          pricevalue +
          "&year=" +
          year +
          "&country_id=" +
          country_id +
          "&city_id=" +
          city_id +
          "&sort_by=" +
          sort_by
      )
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
  ProductInfo(product_id) {
    return axios
      .post(API_URL + "admin/product/getinfo", { product_id })
      .then((response) => {
        return response.data;
      });
  }
  ClientProductList(customer_id) {
    const getData = new FormData();

    getData.set("customer_id", customer_id);
    return axios
      .post(API_URL + "website/customer/list_myads", getData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
  AwardBid(customer_id, bid_id, bid_status, product_id) {
    const getData = new FormData();
    getData.set("customer_id", customer_id);
    getData.set("bid_id", bid_id);
    getData.set("bid_status", bid_status);
    getData.set("product_id", product_id);
    return axios
      .post(API_URL + "website/bidder/award_bid", getData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
  ProductwiseBidderList(product_id) {
    const getData = new FormData();

    getData.set("product_id", product_id);
    return axios
      .post(API_URL + "website/bidder/bidlist_by_productid", getData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }

  ProductUpdate(
    product_id,
    title,
    name,
    description,
    keywords,
    category_id,
    brand_id,
    model_id,
    country_id,
    city_id,
    sub_category_id,
    start_date_time,
    end_date_time,
    auction_type,
    starting_price,
    high_price,
    final_price,
    refund,
    refund_days,
    youtube_link,
    product_img,
    video,
    start_time,
    end_time
  ) {
    var user_id = 1;

    const updateData = new FormData();

    updateData.set("product_id", product_id);
    updateData.set("title", title);
    updateData.set("name", name);
    updateData.set("description", description);
    updateData.set("keywords", keywords);
    updateData.set("category_id", category_id);
    updateData.set("sub_category_id", sub_category_id);
    updateData.set("start_date_time", start_date_time);
    updateData.set("end_date_time", end_date_time);
    updateData.set("starting_price", starting_price);
    updateData.set("high_price", high_price);
    updateData.set("final_price", final_price);
    updateData.set("refund", refund);
    updateData.set("refund_days", refund_days);
    updateData.set("zoom_link", youtube_link);
    updateData.set("auction_type", auction_type);
    updateData.set("start_time", start_time);
    updateData.set("end_time", end_time);
    updateData.set("brand_id", brand_id);
    updateData.set("model_id", model_id);
    updateData.set("country_id", country_id);
    updateData.set("city_id", city_id);

    if (
      product_img &&
      typeof product_img !== "undefined" &&
      product_img.length > 0
    ) {
      for (let p = 0; p < product_img.length; p++) {
        updateData.append("product_img", product_img[p]);
      }
    }
    if (video && typeof video !== "undefined" && video.length > 0) {
      for (let p = 0; p < video.length; p++) {
        updateData.append("video", video[p]);
      }
    }

    return axios
      .post(API_URL + "website/product/update", updateData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new LiveAuctionService();
