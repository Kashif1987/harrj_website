import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class HomeService {
  UpdatePassword(email_id, passwd) {
    const insertData = new FormData();
    insertData.set("password", passwd);
    insertData.set("email_id", email_id);

    //loginadmin
    return (
      axios
        //  .post(API_URL + "login", insertData )
        .post(API_URL + "login/updatepassword", insertData)
        .then((response) => {
          // console.log("loging resp")
          // console.log(response)

          return response.data;
        })
    );
  }
  OTPCheck(otp, email_id) {
    const insertData = new FormData();
    insertData.set("otp", otp);
    insertData.set("email_id", email_id);

    //loginadmin
    return (
      axios
        //  .post(API_URL + "login", insertData )
        .post(API_URL + "login/check_otp", insertData)
        .then((response) => {
          // console.log("loging resp")
          // console.log(response)

          return response.data;
        })
    );
  }
  ForgotPassword(email_id) {
    const insertData = new FormData();
    insertData.set("user_id", email_id);
    // insertData.set('mobile_no', mobile_no);

    //loginadmin
    return (
      axios
        //  .post(API_URL + "login", insertData )
        .post(API_URL + "login/forgotpassword", insertData)
        .then((response) => {
          // console.log("loging resp")
          // console.log(response)

          return response.data;
        })
    );
  }

  UserLogin(email_id, mobile_no, password,firebase_token) {
    const insertData = new FormData();
    insertData.set("user_id", email_id);
    // insertData.set('mobile_no', mobile_no);
    insertData.set("password", password);
    insertData.set("firebase_token", firebase_token);
    //loginadmin
    return (
      axios
        //  .post(API_URL + "login", insertData )
        .post(API_URL + "login", insertData)
        .then((response) => {
          // console.log("loging resp")
          // console.log(response)
          if (
            response.data.token &&
            typeof response.data.token !== "undefined" &&
            response.data.token !== ""
          ) {
            // console.log("auth token")
            // console.log(JSON.stringify(response.data))

            localStorage.setItem("userId", JSON.stringify(response.data));
          } else {
            localStorage.removeItem("user");
          }
          return response.data;
        })
    );
  }
  register(name, mobile_no, email_id, password) {
    const insertData = new FormData();
    insertData.set("name", name);
    insertData.set("email_id", email_id);
    insertData.set("mobile_no", mobile_no);
    insertData.set("role", "customer");
    insertData.set("password", password);

    return axios.post(API_URL + "register", insertData).then((response) => {
      return response.data;
    });
  }
  BannerList() {
    return axios.get(API_URL + "admin/banner/list").then((response) => {
      return response.data;
    });
  }

  CountryList() {
    // console.log("serve country 45")
    return axios.get(API_URL + "admin/country/list").then((response) => {
      return response.data;
    });
  }
  Notifications() {
    // console.log("service is notification")
    let autype = "golivenow";
    return axios
      .get(API_URL + "website/notify/notify_liveads?auction_type=" + autype)
      .then((response) => {
        return response.data;
      });
  }
  WebLogin(name, email_id, mob_no, message) { 
    const insertData = new FormData();
    insertData.set("name", name);
    insertData.set("mobile_no", mob_no);
    insertData.set("email_id", email_id);
    insertData.set("message", message);

    return axios
      .post(API_URL + "website/contact", insertData)
      .then((response) => {
        return response.data;
      });
  }

  GoogleLogin(email_id) {
    const insertData = new FormData();
    insertData.set("user_id", email_id);

    return axios
      .post(API_URL + "login/google_login", insertData)
      .then((response) => {
        if (
          response.data.token &&
          typeof response.data.token !== "undefined" &&
          response.data.token !== ""
        ) {
          // console.log("auth token")
          // console.log(JSON.stringify(response.data))

          localStorage.setItem("userId", JSON.stringify(response.data));
        } else {
          localStorage.removeItem("user");
        }
        return response.data;
      });
  }
  CountryCityList(country_id) {
    const insertData = new FormData();
    insertData.set("country_id", country_id);
    return axios
      .post(API_URL + "admin/country/country_city_list", insertData)
      .then((response) => {
        return response.data;
      });
  }
  CategoryList() {
    return axios.get(API_URL + "admin/category/list").then((response) => {
      return response.data;
    });
  }
  SubCategoryListByCategory(category_id) {
    return axios
      .get(
        API_URL +
          "admin/sub_category/list_by_category_id?category_id=" +
          category_id
          , { headers: authHeader() }
      )
      .then((response) => {
        return response.data;
      });
  }

  SubCatBrandList(subcategory_id) {
    const insertData = new FormData();

    insertData.set("sub_category_id", subcategory_id);
    return axios
      .post(API_URL + "admin/brand/subcat_brand_list", insertData , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  BrandList(category_id) {
    // console.log("cat id recd is ")
    // console.log(category_id)

    const insertData = new FormData();

    insertData.set("category_id", category_id);
    return axios
      .post(API_URL + "admin/category/cat_brand_list", insertData , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
    // .get(API_URL + "admin/brand/list")
    // .then((response) => {
    //   return response.data;
    // });
  }
  BrandModelLst(brand_id) {
    const insertData = new FormData();

    insertData.set("brand_id", brand_id);
    return axios
      .post(API_URL + "admin/brand/brand_model_list", insertData , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  SubCategoryList(category_id) {
    return axios
      .get(
        API_URL +
          "admin/sub_category/list_by_category_id?category_id=" +
          category_id
      )
      .then((response) => {
        return response.data;
      });
  }
  ProductList(auction_type) {
    return axios
      .get(API_URL + "website/product/list?auction_type=" + auction_type , { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  yearList() {
    // console.log("service year list fired")
    return axios.get(API_URL + "admin/year/list").then((response) => {
      return response.data;
    });
  }
  BidderLstById(userId) {
    // console.log("bid list")
    // console.log(userId)
    const insertData = new FormData();

    insertData.set("bidder_id", userId);
    return axios
      .post(API_URL + "api/bidder/bid_list_by_bidder_id", insertData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
  SubCategoryAllList() {
    return axios
      .get(API_URL + "admin/sub_category/list", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
  BrandAllList() {
    return axios.get(API_URL + "admin/brand/list").then((response) => {
      return response.data;
    });
  }
  ModelAllList() {
    return axios.get(API_URL + "admin/model/list").then((response) => {
      return response.data;
    });
  }
  GoLiveProduct(
    title,
    name,
    description,
    keywords,
    category_id,
    sub_category_id,
    brand_id,
    model_id,
    country_id,
    city_id,
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
    end_time,
    year_id,
    custId
  ) {
    var user_id = 1;

    const insertData = new FormData();
    insertData.set("title", title);
    insertData.set("name", name);
    insertData.set("description", description);
    insertData.set("keywords", keywords);
    insertData.set("category_id", category_id);
    insertData.set("sub_category_id", sub_category_id);
    insertData.set("start_date_time", start_date_time);
    insertData.set("end_date_time", end_date_time);
    insertData.set("starting_price", starting_price);
    insertData.set("high_price", high_price);
    insertData.set("final_price", final_price);
    insertData.set("refund", refund);
    insertData.set("refund_days", refund_days);
    insertData.set("youtube_link", youtube_link);
    insertData.set("auction_type", auction_type);
    insertData.set("start_time", start_time);
    insertData.set("end_time", end_time);
    insertData.set("brand_id", brand_id);
    insertData.set("model_id", model_id);
    insertData.set("country_id", country_id);
    insertData.set("city_id", city_id);
    insertData.set("year_id", year_id);
    insertData.set("customer_id", custId);

    if (
      product_img &&
      typeof product_img !== "undefined" &&
      product_img.length > 0
    ) {
      for (let p = 0; p < product_img.length; p++) {
        insertData.append("product_img", product_img[p]);
      }
    }
    if (video && typeof video !== "undefined" && video.length > 0) {
      for (let p = 0; p < video.length; p++) {
        insertData.append("video", video[p]);
      }
    }

    return axios
      .post(API_URL + "api/product/golive", insertData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
    //
  }

  ProductAdd(
    title,
    name,
    description,
    keywords,
    category_id,
    sub_category_id,
    brand_id,
    model_id,
    country_id,
    city_id,
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
    end_time,
    year_id,
    custId
  ) {
    var user_id = 1;

    const insertData = new FormData();
    insertData.set("title", title);
    insertData.set("name", name);
    insertData.set("description", description);
    insertData.set("keywords", keywords);
    insertData.set("category_id", category_id);
    insertData.set("sub_category_id", sub_category_id);
    insertData.set("start_date_time", start_date_time);
    insertData.set("end_date_time", end_date_time);
    insertData.set("starting_price", starting_price);
    insertData.set("high_price", high_price);
    insertData.set("final_price", final_price);
    insertData.set("refund", refund);
    insertData.set("refund_days", refund_days);
    insertData.set("youtube_link", youtube_link);
    insertData.set("auction_type", auction_type);
    insertData.set("start_time", start_time);
    insertData.set("end_time", end_time);
    insertData.set("brand_id", brand_id);
    insertData.set("model_id", model_id);
    insertData.set("country_id", country_id);
    insertData.set("city_id", city_id);
    insertData.set("year_id", year_id);
    insertData.set("customer_id", custId);

    if (
      product_img &&
      typeof product_img !== "undefined" &&
      product_img.length > 0
    ) {
      for (let p = 0; p < product_img.length; p++) {
        insertData.append("product_img", product_img[p]);
      }
    }
    if (video && typeof video !== "undefined" && video.length > 0) {
      for (let p = 0; p < video.length; p++) {
        insertData.append("video", video[p]);
      }
    }

    return axios
      .post(API_URL + "api/product/add", insertData, {
        headers: authHeader(),
      })
      .then((response) => {
        return response.data;
      });
  }
}

export default new HomeService();
