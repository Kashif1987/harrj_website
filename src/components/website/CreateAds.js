import React, { Component } from "react";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

import HeroSlider from "./parts/heroSlider";

import moment from "moment-timezone";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "./../../assets/css/bootstrap.min.css";

import "./../../assets/css/font-awesome.min.css";
import "./../../assets/website/css/styles.css";

//import "./../../assets/css/style.css"
//import "./../../assets/css/custom.css"
//import "./../../App.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CategoryList,
  YearList,
  CountryList,
  CountryCityList,
  SubCategoryListByCategory,
  SubCatBrandList,
  BrandModelLst,
  ProductAdd,
  GoLiveProduct,
} from "./../../actions/website/Home";

import homebanner from "./../../assets/website/img/auction.jpg";
import logo from "./../../assets/website/img/livebid/logo.png";
import "./../../assets/website/css/sliderstyle.css";
// const Slider = require('react-slick');
// import Slider from "react-slick";

toast.configure();

class Createads extends Component {
  constructor(props) {
    super(props);
    this.ListCategoryFun = this.ListCategoryFun.bind(this);
    this.ListCountryFun = this.ListCountryFun.bind(this);
    this.ListCityFun = this.ListCityFun.bind(this);
    this.ListSubCategoryFun = this.ListSubCategoryFun.bind(this);
    this.ListBrandFun = this.ListBrandFun.bind(this);
    this.ListModelFun = this.ListModelFun.bind(this);
    this.onChangeCountry = this.onChangeCountry.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.ListYearFun = this.ListYearFun.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      listCategoryData: [],
      listSubCategoryData: [],
      listBrandData: [],
      listModelData: [],
      listCountryData: [],
      listCityData: [],
      listProductData: [],
      listYearData: [],
      addProductList: [],
      prod_img1: "",
      prod_img2: "",
      prod_img3: "",
      prod_img4: "",
      prod_img5: "",
      prod_noimg: false,
      productMoreAddData: [],
      productMoreAddDataEdit: [],
      title: "",
      name: "",
      description: "",
      keywords: "",
      category_id: 0,
      brand_id: 0,
      model_id: 0,
      country_id: 0,
      city_id: 0,
      sub_category_id: 0,
      start_date_time: "",
      end_date_time: "",
      start_time: "",
      end_time: "",
      time_err: false,
      product_year_id: 0,
      auction_type: "",
      auction_type_err: false,
      starting_price: 0,
      high_price: 0,
      final_price: 0,
      refund: "no",
      refund_days: 0,
      youtube_link: "",
      video: "",
      product_img: [],

      delete_id: 0,

      product_id: 0,
      livename: "",
      livetitle: "",
      livekeyword: "Live now",

      other_show: false,
      other_edit_show: false,
      showprod: false,
      showlive: false,
      showmain: true,
      showyear: false,
    };
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    this.checkFun();
    var temp_arry = [];
    var temp_obj = { tmidx: 1, product_img: "" };
    temp_arry.push(temp_obj);
    temp_obj = { tmidx: 2, product_img: "" };
    temp_arry.push(temp_obj);
    temp_obj = { tmidx: 3, product_img: "" };
    temp_arry.push(temp_obj);
    temp_obj = { tmidx: 4, product_img: "" };
    temp_arry.push(temp_obj);
    this.setState({
      addProductList: temp_arry,
    });
    this.ListCategoryFun();
    this.ListCountryFun();
  }

  checkFun = () => {
    let biddata = JSON.parse(localStorage.getItem("userId"));
    const { dispatch, history } = this.props;
    if (biddata === null) {
      history.push("/");
    }
  };

  handleliveSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addliveform.validateAll();

    const { dispatch, history } = this.props;

    let add_product_img = [];

    add_product_img.push(this.state.prod_img1);

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(
        GoLiveProduct(
          this.state.livetitle,
          this.state.livename,
          this.state.livedescription,
          this.state.livekeywords,
          this.state.category_id,
          this.state.sub_category_id,
          this.state.brand_id,
          this.state.model_id,
          this.state.country_id,
          this.state.city_id,
          this.state.start_date_time,
          this.state.end_date_time,
          "golivenow",
          this.state.starting_price,
          this.state.high_price,
          this.state.final_price,
          this.state.refund,
          this.state.refund_days,
          this.state.youtube_link,
          add_product_img,
          this.state.video,
          this.state.start_time,
          this.state.end_time
        )
      ).then((response) => {
        if (
          response.success ||
          response.success === "true" ||
          response.success === true
        ) {
          toast.success(
            localStorage.getItem("lang") === "English"
              ? response.message
              : response?.message_arabic,
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeonClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
          // this.ListProductFun();
          this.setState({
            category_id: "",
            sub_category_id: "",
            product_name: "",
          });
          // $("#add_form").modal("hide");
          history.push("/");
        } else {
          toast.error(
            localStorage.getItem("lang") === "English"
              ? response.message
              : response?.message_arabic,
            {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeonClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            }
          );
        }
      });
    } else {
      this.setState({
        loading: false,
      });
      toast.error(this.props.t("sww"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();

    this.Addform.validateAll();
    let biddata = JSON.parse(localStorage.getItem("userId"));
    const { dispatch, history } = this.props;

    if (this.state.auction_type === "offline") {
      // Normal Auction
      let add_product_img = this.state.addProductList.map((item) => {
        return item.product_img;
      });
      var dt1 = "";
      dt1 = `${this.state.start_date_time} 00:00:00`;
      if (add_product_img.filter((e) => e !== "").length > 0) {
        this.setState({
          loading: true,
        });
        this.setState({
          prod_noimg: false,
        });
        this.setState({
          time_err: false,
        });

        // var d = new Date(dt1);
        // let utcmonth = d.getUTCMonth() + 1;
        // let utcendmonth = utcmonth + 3;
        // let utcendtime = d.getUTCHours() + 2;

        let d = new Date();
        let utcmonth = d.getUTCMonth() + 1;
        // let utcendmonth = utcmonth + 3;
        let utcendmonth = utcmonth + 0;
        // let utcendtime = d.getUTCHours() + 0;
        let utcendtime = d.getUTCHours() + 2;

        let utcdatetime =
          d.getUTCFullYear() +
          "-" +
          (utcmonth < 10 ? "0" + utcmonth : utcmonth) +
          "-" +
          (d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()) +
          " " +
          (d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours()) +
          ":" +
          (d.getUTCMinutes() < 10
            ? "0" + d.getUTCMinutes()
            : d.getUTCMinutes()) +
          ":" +
          (d.getUTCSeconds() < 10
            ? "0" + d.getUTCSeconds()
            : d.getUTCSeconds());
        let utcenddatetime =
          d.getUTCFullYear() +
          "-" +
          (utcendmonth < 10 ? "0" + utcendmonth : utcendmonth) +
          "-" +
          (d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()) +
          " " +
          (utcendtime < 10 ? "0" + utcendtime : utcendtime) +
          ":" +
          (d.getUTCMinutes() < 10
            ? "0" + d.getUTCMinutes()
            : d.getUTCMinutes()) +
          ":" +
          (d.getUTCSeconds() < 10
            ? "0" + d.getUTCSeconds()
            : d.getUTCSeconds());
        let starttime =
          (d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours()) +
          ":" +
          (d.getUTCMinutes() < 10 ? "0" + d.getUTCMinutes : d.getUTCMinutes()) +
          ":" +
          (d.getUTCSeconds() < 10
            ? "0" + d.getUTCSeconds()
            : d.getUTCSeconds());
        let endtime =
          (utcendtime < 10 ? "0" + utcendtime : utcendtime) +
          ":" +
          (d.getUTCMinutes() < 10
            ? "0" + d.getUTCMinutes()
            : d.getUTCMinutes()) +
          ":" +
          (d.getUTCSeconds() < 10
            ? "0" + d.getUTCSeconds()
            : d.getUTCSeconds());

        if (this.checkBtn.context._errors.length === 0) {
          dispatch(
            ProductAdd(
              this.state.title,
              this.state.name,
              this.state.description,
              this.state.keywords,
              this.state.category_id,
              this.state.sub_category_id,
              this.state.brand_id,
              this.state.model_id,
              this.state.country_id,
              this.state.city_id,
              utcdatetime,
              utcenddatetime,
              this.state.auction_type,
              this.state.starting_price,
              this.state.high_price,
              this.state.final_price,
              this.state.refund,
              this.state.refund_days,
              this.state.youtube_link,
              add_product_img,
              this.state.video,
              this.state.auction_type == "offline" ? "" : starttime,
              this.state.auction_type == "offline" ? "" : endtime,
              this.state.product_year_id,
              biddata.data[0].id
            )
          ).then((response) => {
            if (
              response.success ||
              response.success === "true" ||
              response.success === true
            ) {
              toast.success(
                localStorage.getItem("lang") === "English"
                  ? response.message
                  : response?.message_arabic,
                {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeonClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
              this.setState({
                category_id: "",
                sub_category_id: "",
                product_name: "",
              });
              history.push("/");
              this.setState({
                loading: false,
              });
            } else {
              this.setState({
                loading: false,
              });
              toast.error(
                localStorage.getItem("lang") === "English"
                  ? response.message
                  : response?.message_arabic,
                {
                  position: "bottom-right",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeonClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                }
              );
            }
          });
        } else {
          this.setState({
            loading: false,
          });
          toast.error(this.props.t("sww"), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        this.setState({
          prod_noimg: true,
        });
      }
    } else if (this.state.auction_type === "online") {
      // Schedule Auction
      let add_product_img = this.state.addProductList.map((item) => {
        return item.product_img;
      });
      let dt1 = this.state.start_date_time + " " + this.state.start_time;
      let selectedDate = moment(dt1);
      let duration = moment(moment.duration(moment().diff(selectedDate)));

      if (duration._i._data.minutes >= 0) {
        this.setState({
          time_err: true,
        });
      } else {
        if (add_product_img.filter((e) => e !== "").length > 0) {
          this.setState({
            loading: true,
          });
          this.setState({
            prod_noimg: false,
          });
          this.setState({
            time_err: false,
          });
          let d = new Date(dt1);
          let utcmonth = d.getUTCMonth() + 1;
          // let utcendmonth = utcmonth + 3;
          let utcendmonth = utcmonth + 0;
          // let utcendtime = d.getUTCHours() + 0;
          let utcendtime = d.getUTCHours() + 2;

          let utcdatetime =
            d.getUTCFullYear() +
            "-" +
            (utcmonth < 10 ? "0" + utcmonth : utcmonth) +
            "-" +
            (d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()) +
            " " +
            (d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours()) +
            ":" +
            (d.getUTCMinutes() < 10
              ? "0" + d.getUTCMinutes()
              : d.getUTCMinutes()) +
            ":" +
            (d.getUTCSeconds() < 10
              ? "0" + d.getUTCSeconds()
              : d.getUTCSeconds());
          let utcenddatetime =
            d.getUTCFullYear() +
            "-" +
            (utcendmonth < 10 ? "0" + utcendmonth : utcendmonth) +
            "-" +
            (d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()) +
            " " +
            (utcendtime < 10 ? "0" + utcendtime : utcendtime) +
            ":" +
            (d.getUTCMinutes() < 10
              ? "0" + d.getUTCMinutes()
              : d.getUTCMinutes()) +
            ":" +
            (d.getUTCSeconds() < 10
              ? "0" + d.getUTCSeconds()
              : d.getUTCSeconds());
          let starttime =
            (d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours()) +
            ":" +
            (d.getUTCMinutes() < 10
              ? "0" + d.getUTCMinutes
              : d.getUTCMinutes()) +
            ":" +
            (d.getUTCSeconds() < 10
              ? "0" + d.getUTCSeconds()
              : d.getUTCSeconds());
          let endtime =
            (utcendtime < 10 ? "0" + utcendtime : utcendtime) +
            ":" +
            (d.getUTCMinutes() < 10
              ? "0" + d.getUTCMinutes()
              : d.getUTCMinutes()) +
            ":" +
            (d.getUTCSeconds() < 10
              ? "0" + d.getUTCSeconds()
              : d.getUTCSeconds());

          var start_date_time_temp =
            this.state.start_date_time + " " + this.state.start_time;

          var end_time_temp = moment(start_date_time_temp)
            .add(2, "hours")
            .format("HH:mm:ss");

          var end_date_time_temp =
            this.state.start_date_time + " " + end_time_temp;

          if (this.checkBtn.context._errors.length === 0) {
            dispatch(
              GoLiveProduct(
                this.state.title,
                this.state.name,
                this.state.description,
                this.state.keywords,
                this.state.category_id,
                this.state.sub_category_id,
                this.state.brand_id,
                this.state.model_id,
                this.state.country_id,
                this.state.city_id,
                start_date_time_temp,
                end_date_time_temp,
                this.state.auction_type,
                this.state.starting_price,
                this.state.high_price,
                this.state.final_price,
                this.state.refund,
                this.state.refund_days,
                this.state.youtube_link,
                add_product_img,
                this.state.video,
                this.state.start_time,
                end_time_temp,
                this.state.product_year_id,
                biddata.data[0].id
              )
            ).then((response) => {
              if (
                response.success ||
                response.success === "true" ||
                response.success === true
              ) {
                toast.success(
                  localStorage.getItem("lang") === "English"
                    ? response.message
                    : response?.message_arabic,
                  {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeonClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
                this.setState({
                  category_id: "",
                  sub_category_id: "",
                  product_name: "",
                });
                history.push("/");
                this.setState({
                  loading: false,
                });
              } else {
                this.setState({
                  loading: false,
                });
                toast.error(
                  localStorage.getItem("lang") === "English"
                    ? response.message
                    : response?.message_arabic,
                  {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeonClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  }
                );
              }
            });
          } else {
            this.setState({
              loading: false,
            });
            toast.error(this.props.t("sww"), {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        } else {
          this.setState({
            prod_noimg: true,
          });
        }
      }
    } else if (this.state.auction_type === "golivenow") {
      // Live Auction
      let add_product_img = [];

      add_product_img.push(this.state.prod_img1);
      if (this.checkBtn.context._errors.length === 0) {
        dispatch(
          GoLiveProduct(
            this.state.title,
            this.state.livename,
            this.state.description,
            this.state.keywords,
            this.state.category_id,
            this.state.sub_category_id,
            this.state.brand_id,
            this.state.model_id,
            this.state.country_id,
            this.state.city_id,
            moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
            moment(new Date()).add(2, "hours").format("YYYY-MM-DD HH:mm:ss"),
            "golivenow",
            this.state.starting_price,
            this.state.high_price,
            this.state.final_price,
            this.state.refund,
            this.state.refund_days,
            this.state.youtube_link,
            add_product_img,
            this.state.video,
            moment(new Date()).format("HH:mm:ss"),
            moment(new Date()).add(2, "hours").format("HH:mm:ss"),
            "",
            biddata.data[0].id
          )
        ).then((response) => {
          if (
            response.success ||
            response.success === "true" ||
            response.success === true
          ) {
            toast.success(
              localStorage.getItem("lang") === "English"
                ? response.message
                : response?.message_arabic,
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeonClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
            // this.ListProductFun();
            this.setState({
              category_id: "",
              sub_category_id: "",
              product_name: "",
            });
            // $("#add_form").modal("hide");
            window.scrollTo({ top: 0, behavior: "smooth" });

            history.push("/");
          } else {
            toast.error(
              localStorage.getItem("lang") === "English"
                ? response.message
                : response?.message_arabic,
              {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeonClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }
            );
          }
        });
      } else {
        this.setState({
          loading: false,
        });
        toast.error(this.props.t("sww"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  showproduct = () => {
    this.setState({
      showprod: true,
      showlive: false,
      showmain: false,
    });
  };
  showliveFunc = () => {
    const d = new Date();

    let day = d.getUTCDate();
    console.log("now date is");
    console.log(day);
    let utcmonth = d.getUTCMonth() + 1;
    let utcendmonth = utcmonth + 3;
    let utcendtime = d.getUTCHours() + 2;

    let utcdatetime =
      d.getUTCFullYear() +
      "-" +
      (utcmonth < 10 ? "0" + utcmonth : utcmonth) +
      "-" +
      (d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()) +
      " " +
      (d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours()) +
      ":" +
      (d.getUTCMinutes() < 10 ? "0" + d.getUTCMinutes() : d.getUTCMinutes()) +
      ":" +
      (d.getUTCSeconds() < 10 ? "0" + d.getUTCSeconds() : d.getUTCSeconds());
    let utcenddatetime =
      d.getUTCFullYear() +
      "-" +
      (utcendmonth < 10 ? "0" + utcendmonth : utcendmonth) +
      "-" +
      (d.getUTCDate() < 10 ? "0" + d.getUTCDate() : d.getUTCDate()) +
      " " +
      (utcendtime < 10 ? "0" + utcendtime : utcendtime) +
      ":" +
      (d.getUTCMinutes() < 10 ? "0" + d.getUTCMinutes() : d.getUTCMinutes()) +
      ":" +
      (d.getUTCSeconds() < 10 ? "0" + d.getUTCSeconds() : d.getUTCSeconds());
    let starttime =
      (d.getUTCHours() < 10 ? "0" + d.getUTCHours() : d.getUTCHours()) +
      ":" +
      (d.getUTCMinutes() < 10 ? "0" + d.getUTCMinutes() : d.getUTCMinutes()) +
      ":" +
      (d.getUTCSeconds() < 10 ? "0" + d.getUTCSeconds() : d.getUTCSeconds());
    let endtime =
      (utcendtime < 10 ? "0" + utcendtime : utcendtime) +
      ":" +
      (d.getUTCMinutes() < 10 ? "0" + d.getUTCMinutes() : d.getUTCMinutes()) +
      ":" +
      (d.getUTCSeconds() < 10 ? "0" + d.getUTCSeconds() : d.getUTCSeconds());

    this.setState({
      start_date_time: utcdatetime,
      end_date_time: utcenddatetime,
      start_time: starttime,
      end_time: endtime,
      category_name: 22,
      prod_img1: process.env.PUBLIC_URL + "/logo2.png",
      video: process.env.PUBLIC_URL + "/logo2.png",
      auction_type: "0",
      showlive: true,
      showprod: false,
      showmain: false,
    });
  };
  ListYearFun = () => {
    console.log("List year fired");
    const { dispatch, history } = this.props;
    dispatch(YearList())
      .then((response) => {
        this.setState({
          listYearData: response.data,
        });
        //this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listYearData: [],
        });
      });
  };
  ListCategoryFun = () => {
    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
        this.setState({
          listCategoryData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listCategoryData: [],
        });
      });
  };

  ListSubCategoryFun = () => {
    console.log("now categorylist ");

    const { dispatch, history } = this.props;
    dispatch(SubCategoryListByCategory(this.state.category_id))
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: [],
        });
      });
  };
  ListBrandFun = (subcategory_id) => {
    const { dispatch, history } = this.props;
    dispatch(SubCatBrandList(subcategory_id))
      .then((response) => {
        this.setState({
          listBrandData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listBrandData: [],
        });
      });
  };
  ListModelFun = (brand_id) => {
    const { dispatch, history } = this.props;
    dispatch(BrandModelLst(brand_id))
      .then((response) => {
        this.setState({
          listModelData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listModelData: [],
        });
      });
  };
  ListCountryFun = () => {
    const { dispatch, history } = this.props;
    dispatch(CountryList())
      .then((response) => {
        this.setState({
          listCountryData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listCountryData: [],
        });
      });
  };

  ListCityFun = (country_id) => {
    // console.log("city list called");
    const { dispatch, history } = this.props;
    dispatch(CountryCityList(country_id))
      .then((response) => {
        console.log("resp is");
        console.log(response);
        this.setState(
          {
            listCityData: response.data,
          },
          () => {
            console.log("the resp is is");
            console.log(this.state.listCityData);
          }
        );
      })
      .catch(() => {
        this.setState({
          listCityData: [],
        });
      });
  };
  onChangeStartTime = (e) => {
    var updatedMinute = "0:0";
    if (e.target.value != "" || e.target.value != "  ") {
      var hour = e.target.value.split(":")[0];
      var minute = e.target.value.split(":")[1];
      updatedMinute = parseInt(hour) + 2 + ":" + minute;
    }
    console.log("e.target.value", e.target.value);
    this.setState({
      start_time: e.target.value,
      end_time: updatedMinute,
    });
    this.setState({
      time_err: false,
    });
  };

  onChangeCountry = (e) => {
    var country_id = e.target.value;
    this.setState(
      {
        country_id: e.target.value,
      },
      () => {
        this.ListCityFun(country_id);
      }
    );
  };
  onChangeCity = (e) => {
    this.setState({
      city_id: e.target.value,
    });
  };
  onChangeCategory = (e) => {
    var catid = e.target.value;
    this.setState(
      {
        category_id: e.target.value,
      },
      () => {
        this.ListSubCategoryFun(catid);
      }
    );
  };
  onChangeSubCategory = (e) => {
    var subcatid = e.target.value;
    // console.log("data year ");
    // console.log(e.target.selectedOptions[0].getAttribute("data-year"));
    var showyear = parseInt(
      e.target.selectedOptions[0].getAttribute("data-year")
    );
    this.setState(
      {
        sub_category_id: e.target.value,
      },
      () => {
        if (showyear === 1) {
          console.log("show year true");
          this.setState(
            {
              showyear: true,
            },
            () => {
              console.log("calling listyear");
              this.ListYearFun();
            }
          );
        } else {
          // console.log("year off");
          this.setState({
            showyear: false,
          });
        }
        this.ListBrandFun(subcatid);
      }
    );
  };
  onChangeBrand = (e) => {
    var brandid = e.target.value;
    this.setState(
      {
        brand_id: e.target.value,
      },
      () => {
        this.ListModelFun(brandid);
      }
    );
    //this.ListBrandFun(e.target.value);
  };
  onChangeModel = (e) => {
    this.setState({
      model_id: e.target.value,
    });
    //this.ListBrandFun(e.target.value);
  };
  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value,
    });
  };
  onChangeName = (e) => {
    this.setState({
      name: e.target.value,
    });
  };
  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };
  onChangeLiveTitle = (e) => {
    this.setState({
      livetitle: e.target.value,
    });
  };
  onChangeLiveName = (e) => {
    this.setState({
      livename: e.target.value,
    });
  };
  onChangeLiveDescription = (e) => {
    this.setState({
      livedescription: e.target.value,
    });
  };
  onChangeKeywords = (e) => {
    this.setState({
      keywords: e.target.value,
    });
  };
  onChangeYear = (e) => {
    this.setState({
      product_year_id: e.target.value,
    });
  };
  onChangeStartDateTime = (e) => {
    var d1 = Date.parse(e.target.value);
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    today = yyyy + "/" + mm + "/" + dd;
    var d2 = Date.parse(today);
    if (d1 < d2) {
      alert("Date should greater than equal to current date");
    } else {
      let enddate = "";
      if (e.target.value != "" || e.target.value != "  ") {
        let year = e.target.value.split("-")[0];
        let month = parseInt(e.target.value.split("-")[1]) + 3;
        let day = e.target.value.split("-")[2];

        enddate = year + "-" + "0" + month + "-" + day;
      }

      this.setState({
        start_date_time: e.target.value,
        end_date_time: enddate,
      });
      this.setState({
        time_err: false,
      });
    }
  };
  onChangePrice = (e) => {
    this.setState({
      starting_price: e.target.value,
    });
  };
  setImage = (e, index) => {
    let i = parseInt(index);

    let updatedItemList = this.state.addProductList.map((item) => {
      if (item.tmidx === i) {
        item = { ...item, product_img: e.target.files[0] };
      }
      return item;
    });
    this.setState({
      addProductList: updatedItemList,
    });
    this.setState({
      prod_noimg: false,
    });
    switch (i) {
      case 1:
        this.setState({
          prod_img1: window.URL.createObjectURL(e.target.files[0]),
        });
        break;
      case 2:
        this.setState({
          prod_img2: window.URL.createObjectURL(e.target.files[0]),
        });
        break;
      case 3:
        this.setState({
          prod_img3: window.URL.createObjectURL(e.target.files[0]),
        });
        break;
      case 4:
        this.setState({
          prod_img4: window.URL.createObjectURL(e.target.files[0]),
        });
        break;
      default:
      // code block
    }
  };
  onChangeAuctionType = (e) => {
    if (e.target.value === "online") {
      this.setState({
        other_show: true,
        auction_type: e.target.value,
      });
    } else {
      this.setState({
        other_show: false,
        auction_type: e.target.value,
      });
    }
  };
  onChangeVideo = (e) => {
    this.setState({
      prod_img5: window.URL.createObjectURL(e.target.files[0]),
    });
    this.setState({
      video: e.target.files,
    });
  };
  ListCategoryFun = () => {
    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
        this.setState({
          listCategoryData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listCategoryData: [],
        });
      });
  };
  ListBrandFun = (subcategory_id) => {
    const { dispatch, history } = this.props;
    dispatch(SubCatBrandList(subcategory_id))
      .then((response) => {
        this.setState({
          listBrandData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listBrandData: [],
        });
      });
  };
  ListModelFun = (brand_id) => {
    const { dispatch, history } = this.props;
    dispatch(BrandModelLst(brand_id))
      .then((response) => {
        this.setState({
          listModelData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listModelData: [],
        });
      });
  };

  ListCountryFun = () => {
    const { dispatch, history } = this.props;
    dispatch(CountryList())
      .then((response) => {
        this.setState({
          listCountryData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listCountryData: [],
        });
      });
  };

  ListCityFun = (country_id) => {
    // console.log("city list called");
    const { dispatch, history } = this.props;
    dispatch(CountryCityList(country_id))
      .then((response) => {
        this.setState({
          listCityData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listCityData: [],
        });
      });
  };
  ListSubCategoryFun = (category_id) => {
    const { dispatch, history } = this.props;
    dispatch(SubCategoryListByCategory(category_id))
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: [],
        });
      });
  };

  render() {
    const { isLoggedIn, message } = this.props;

    const slider = [
      {
        banner: homebanner,
        title: "",
        description: "",
        buttonTitle: "",
        handleButtonClick: "",
      },
    ];
    return (
      <React.Fragment>
        <HeroSlider slides={slider} />

        {this.state.loading ? (
          <div className="full-page-loader">
            <div className="auction-loader">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          ""
        )}

        <section className="bose-quiet">
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-xs-12">
                <div className="bose-heading">
                  <h1>{this.props.t("createad")}</h1>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <Form
                  onSubmit={this.handleSubmit}
                  ref={(c) => {
                    this.Addform = c;
                  }}
                >
                  <div className="row">
                    <div className="col-md-6">
                      {this.state.auction_type !== "golivenow" ? (
                        <>
                          <div className="form-input-outer">
                            <div className="form-input">
                              <img
                                id="file-ip-1-preview"
                                src={this.state.prod_img1}
                                style={{
                                  display: this.state.prod_img1
                                    ? "block"
                                    : "none",
                                }}
                                alt={""}
                              />
                            </div>
                            <div className="form-input1">
                              <label htmlFor="file-ip-1" id="file-ip-1_1">
                                <i className="fa fa-plus"></i>
                              </label>
                              <input
                                type="file"
                                id="file-ip-1"
                                accept="image/*"
                                onChange={(e) => this.setImage(e, 1)}
                              />
                            </div>
                          </div>
                          <div className="bottom-img">
                            <ul style={{ listStyle: "none" }}>
                              <li>
                                <div className="form-input2">
                                  <div className="preview2">
                                    {this.state.prod_img2 !== "undefined" &&
                                    this.state.prod_img2.length > 0 ? (
                                      <img
                                        id="file-ip-1-preview2"
                                        src={this.state.prod_img2}
                                        alt={""}
                                        style={{
                                          display: this.state.prod_img2
                                            ? "block"
                                            : "none",
                                        }}
                                      />
                                    ) : (
                                      <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                    )}
                                  </div>
                                  <label
                                    htmlFor="file-ip-12"
                                    id="file-ip-1_2"
                                    className={
                                      this.state.prod_img2
                                        ? "form-input-view"
                                        : ""
                                    }
                                  >
                                    +
                                  </label>
                                  <input
                                    type="file"
                                    id="file-ip-12"
                                    accept="image/*"
                                    onChange={(e) => this.setImage(e, 2)}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="form-input3">
                                  <div className="preview3">
                                    {this.state.prod_img3 !== "undefined" &&
                                    this.state.prod_img3.length > 0 ? (
                                      <img
                                        id="file-ip-1-preview3"
                                        src={this.state.prod_img3}
                                        style={{
                                          display: this.state.prod_img3
                                            ? "block"
                                            : "none",
                                        }}
                                        alt={""}
                                      />
                                    ) : (
                                      <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                    )}
                                  </div>
                                  <label
                                    htmlFor="file-ip-13"
                                    id="file-ip-1_3"
                                    className={
                                      this.state.prod_img3
                                        ? "form-input-view"
                                        : ""
                                    }
                                  >
                                    +
                                  </label>
                                  <input
                                    type="file"
                                    id="file-ip-13"
                                    accept="image/*"
                                    onChange={(e) => this.setImage(e, 3)}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="form-input4">
                                  <div className="preview4">
                                    {this.state.prod_img4 !== "undefined" &&
                                    this.state.prod_img4.length > 0 ? (
                                      <img
                                        id="file-ip-1-preview4"
                                        src={this.state.prod_img4}
                                        style={{
                                          display: this.state.prod_img4
                                            ? "block"
                                            : "none",
                                        }}
                                        alt={""}
                                      />
                                    ) : (
                                      <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                    )}
                                  </div>
                                  <label
                                    htmlFor="file-ip-14"
                                    id="file-ip-1_4"
                                    className={
                                      this.state.prod_img4
                                        ? "form-input-view"
                                        : ""
                                    }
                                  >
                                    +
                                  </label>
                                  <input
                                    type="file"
                                    id="file-ip-14"
                                    accept="image/*"
                                    onChange={(e) => this.setImage(e, 4)}
                                  />
                                </div>
                              </li>
                              <li>
                                <div className="form-input5">
                                  <div className="preview5">
                                    {this.state.prod_img5 !== "undefined" &&
                                    this.state.prod_img5.length > 0 ? (
                                      <video
                                        id="file-ip-1-preview5"
                                        width="320"
                                        height="240"
                                        muted
                                        autoPlay
                                        style={{
                                          display: this.state.prod_img5
                                            ? "block"
                                            : "none",
                                        }}
                                      >
                                        <source
                                          src={this.state.prod_img5}
                                          type="video/mp4"
                                        />
                                      </video>
                                    ) : (
                                      <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                    )}
                                  </div>
                                  <label
                                    id="file-ip-1_5"
                                    htmlFor="file-ip-15"
                                    className={
                                      this.state.prod_img5
                                        ? "form-input-view"
                                        : ""
                                    }
                                  >
                                    +
                                  </label>
                                  <input
                                    id="file-ip-15"
                                    type="file"
                                    accept="video/*"
                                    onChange={this.onChangeVideo}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                          {this.state.prod_noimg ? (
                            <div className="amp-prod_noimg">
                              {this.props.t("pumoi")}
                            </div>
                          ) : (
                            ""
                          )}
                        </>
                      ) : (
                        <div className="amp-golivenow-img">
                          <img src={logo} alt={""} />
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <div className="add-my-product">
                        <h1>
                          {this.props.t("adminAdd")}{" "}
                          {this.props.t("adminProduct")}
                        </h1>
                        <div className="products-form">
                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <select
                                  className="select-Auction form-control"
                                  onChange={this.onChangeAuctionType}
                                  required
                                  onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                      this.props.t("select_err_msg")
                                    )
                                  }
                                  onInput={(e) =>
                                    e.target.setCustomValidity("")
                                  }
                                >
                                  <option value="">
                                    {this.props.t("select")}{" "}
                                    {this.props.t("adminAuctionType")}
                                  </option>
                                  <option value="offline">
                                    {this.props.t("Normal")}{" "}
                                    {this.props.t("Auction")}
                                  </option>
                                  <option value="online">
                                    {this.props.t("sch_auc")}
                                  </option>
                                  <option value="golivenow">
                                    {this.props.t("Live")}{" "}
                                    {this.props.t("Auction")}
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="title"
                                  placeholder={this.props.t("title")}
                                  onChange={this.onChangeTitle}
                                  required
                                  onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                      this.props.t("input_err_msg")
                                    )
                                  }
                                  onInput={(e) =>
                                    e.target.setCustomValidity("")
                                  }
                                />
                              </div>
                            </div>

                            {/* <div className="col-md-12">
                              <div className="form-group">
                                <input
                                  type="text"
                                  className="form-control"
                                  name="name"
                                  placeholder={this.props.t("name")}
                                  onChange={this.onChangeName}
                                  required
                                />
                              </div>
                            </div> */}

                            <div className="col-md-6">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  placeholder="Country"
                                  id="country_id"
                                  name="country_id"
                                  value={this.state.country_id}
                                  onChange={this.onChangeCountry}
                                  required
                                  onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                      this.props.t("select_err_msg")
                                    )
                                  }
                                  onInput={(e) =>
                                    e.target.setCustomValidity("")
                                  }
                                >
                                  <option value="">
                                    {this.props.t("select")}{" "}
                                    {this.props.t("adminCountry")}{" "}
                                  </option>
                                  {this.state.listCountryData &&
                                    (typeof this.state.listCountryData !==
                                      "undefined") &
                                      (this.state.listCountryData.length > 0) &&
                                    this.state.listCountryData.map(
                                      (itemTaskList, m) => (
                                        <option
                                          key={m}
                                          value={itemTaskList.country_id}
                                        >
                                          {localStorage.getItem("lang") ===
                                          "English"
                                            ? itemTaskList.country_name
                                            : itemTaskList.country_name_arabic}
                                        </option>
                                      )
                                    )}
                                </select>
                              </div>
                            </div>

                            <div className="col-md-6">
                              <div className="form-group">
                                <select
                                  className="form-control"
                                  placeholder="City"
                                  id="city_id"
                                  name="city_id"
                                  value={this.state.city_id}
                                  onChange={this.onChangeCity}
                                  required
                                  onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                      this.props.t("select_err_msg")
                                    )
                                  }
                                  onInput={(e) =>
                                    e.target.setCustomValidity("")
                                  }
                                >
                                  <option value="">
                                    {this.props.t("select")}{" "}
                                    {this.props.t("adminCity")}
                                  </option>
                                  {this.state.listCityData &&
                                    (typeof this.state.listCityData !==
                                      "undefined") &
                                      (this.state.listCityData.length > 0) &&
                                    this.state.listCityData.map(
                                      (itemTaskList, m) => (
                                        <option
                                          key={m}
                                          value={itemTaskList.city_id}
                                        >
                                          {localStorage.getItem("lang") ===
                                          "English"
                                            ? itemTaskList.city_name
                                            : itemTaskList.city_name_arabic}
                                        </option>
                                      )
                                    )}
                                </select>
                              </div>
                            </div>

                            {this.state.auction_type !== "golivenow" && (
                              <>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      placeholder="Category"
                                      id="category_id"
                                      name="category_id"
                                      value={this.state.category_id}
                                      onChange={this.onChangeCategory}
                                      required
                                      onInvalid={(e) =>
                                        e.target.setCustomValidity(
                                          this.props.t("select_err_msg")
                                        )
                                      }
                                      onInput={(e) =>
                                        e.target.setCustomValidity("")
                                      }
                                    >
                                      <option value="">
                                        {this.props.t("select")}{" "}
                                        {this.props.t("adminCategory")}
                                      </option>
                                      {this.state.listCategoryData &&
                                        (typeof this.state.listCategoryData !==
                                          "undefined") &
                                          (this.state.listCategoryData.length >
                                            0) &&
                                        this.state.listCategoryData.map(
                                          (itemTaskList, m) => (
                                            <option
                                              key={m}
                                              value={itemTaskList.category_id}
                                            >
                                              {localStorage.getItem("lang") ===
                                              "English"
                                                ? itemTaskList.category_name
                                                : itemTaskList.category_name_arabic}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      placeholder="Brand"
                                      id="brand_id"
                                      name="brand_id"
                                      value={this.state.sub_category_id}
                                      onChange={this.onChangeSubCategory}
                                      required
                                      onInvalid={(e) =>
                                        e.target.setCustomValidity(
                                          this.props.t("select_err_msg")
                                        )
                                      }
                                      onInput={(e) =>
                                        e.target.setCustomValidity("")
                                      }
                                    >
                                      <option value="">
                                        {this.props.t("select")}{" "}
                                        {this.props.t("adminSubCat")}
                                      </option>
                                      {this.state.listSubCategoryData &&
                                        (typeof this.state
                                          .listSubCategoryData !==
                                          "undefined") &
                                          (this.state.listSubCategoryData
                                            .length >
                                            0) &&
                                        this.state.listSubCategoryData.map(
                                          (itemTaskList, m) => (
                                            <option
                                              key={m}
                                              data-year={
                                                itemTaskList.sub_category_year_applies
                                              }
                                              value={
                                                itemTaskList.sub_category_id
                                              }
                                            >
                                              {localStorage.getItem("lang") ===
                                              "English"
                                                ? itemTaskList.sub_category_name
                                                : itemTaskList.sub_category_name_arabic}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      placeholder="Brand"
                                      id="brand_id"
                                      name="brand_id"
                                      value={this.state.brand_id}
                                      onChange={this.onChangeBrand}
                                      required
                                      onInvalid={(e) =>
                                        e.target.setCustomValidity(
                                          this.props.t("select_err_msg")
                                        )
                                      }
                                      onInput={(e) =>
                                        e.target.setCustomValidity("")
                                      }
                                    >
                                      <option value="">
                                        {this.props.t("select")}{" "}
                                        {this.props.t("adminBrand")}
                                      </option>
                                      {this.state.listBrandData &&
                                        (typeof this.state.listBrandData !==
                                          "undefined") &
                                          (this.state.listBrandData.length >
                                            0) &&
                                        this.state.listBrandData.map(
                                          (itemTaskList, m) => (
                                            <option
                                              key={m}
                                              value={itemTaskList.brand_id}
                                            >
                                              {localStorage.getItem("lang") ===
                                              "English"
                                                ? itemTaskList.brand_name
                                                : itemTaskList.brand_name_arabic}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      placeholder="Model"
                                      id="model_id"
                                      name="model_id"
                                      value={this.state.model_id}
                                      onChange={this.onChangeModel}
                                    >
                                      <option value="">
                                        {this.props.t("select")}{" "}
                                        {this.props.t("adminModel")}
                                      </option>
                                      {this.state.listModelData &&
                                        (typeof this.state.listModelData !==
                                          "undefined") &
                                          (this.state.listModelData.length >
                                            0) &&
                                        this.state.listModelData.map(
                                          (itemTaskList, m) => (
                                            <option
                                              key={m}
                                              value={itemTaskList.model_id}
                                            >
                                              {localStorage.getItem("lang") ===
                                              "English"
                                                ? itemTaskList.model_name
                                                : itemTaskList.model_name_arabic}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                </div>
                              </>
                            )}

                            {this.state.auction_type === "offline" ? (
                              <div className="col-md-6">
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    defaultValue={0}
                                    min={0}
                                    placeholder={this.props.t("Amount")}
                                    onChange={this.onChangePrice}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {this.state.auction_type !== "golivenow" && (
                              <>
                                {this.state.showyear ? (
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <select
                                        className="form-control"
                                        placeholder="Model"
                                        id="model_id"
                                        name="model_id"
                                        onChange={this.onChangeYear}
                                        required
                                        onInvalid={(e) =>
                                          e.target.setCustomValidity(
                                            this.props.t("select_err_msg")
                                          )
                                        }
                                        onInput={(e) =>
                                          e.target.setCustomValidity("")
                                        }
                                      >
                                        <option value="">
                                          {this.props.t("select")}{" "}
                                          {this.props.t("adminYear")}
                                        </option>
                                        {this.state.listYearData &&
                                          (typeof this.state.listYearData !==
                                            "undefined") &
                                            (this.state.listYearData.length >
                                              0) &&
                                          this.state.listYearData.map(
                                            (itemTaskList, m) => (
                                              <option
                                                key={m}
                                                value={itemTaskList.year_id}
                                              >
                                                {itemTaskList.year}
                                              </option>
                                            )
                                          )}
                                      </select>
                                    </div>
                                  </div>
                                ) : null}

                                {this.state.auction_type !== "offline" ? (
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <input
                                        type="date"
                                        className="form-control"
                                        placeholder="Start Date Time"
                                        id="start_date_time"
                                        name="start_date_time"
                                        value={this.state.start_date_time}
                                        onChange={this.onChangeStartDateTime}
                                        required
                                        onInvalid={(e) =>
                                          e.target.setCustomValidity(
                                            this.props.t("input_err_msg")
                                          )
                                        }
                                        onInput={(e) =>
                                          e.target.setCustomValidity("")
                                        }
                                        min={moment().format("YYYY-MM-DD")}
                                      />
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}

                                {this.state.auction_type === "online" ? (
                                  <div className="col-md-6">
                                    <div className="form-group">
                                      <input
                                        type="time"
                                        className="form-control"
                                        placeholder="Start Time"
                                        id="start_time"
                                        name="start_time"
                                        value={this.state.start_time}
                                        onChange={this.onChangeStartTime}
                                        required
                                        onInvalid={(e) =>
                                          e.target.setCustomValidity(
                                            this.props.t("input_err_msg")
                                          )
                                        }
                                        onInput={(e) =>
                                          e.target.setCustomValidity("")
                                        }
                                      />
                                      {this.state.time_err ? (
                                        <div className="form-time_err">
                                          {this.props.t("tsgtetct")}
                                        </div>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  ""
                                )}

                                <div
                                  className={
                                    this.state.auction_type === "offline" ||
                                    this.state.auction_type === "online"
                                      ? "col-md-12"
                                      : "col-md-6"
                                  }
                                >
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control"
                                      name="Keywords"
                                      placeholder={this.props.t(
                                        "adminKeywords"
                                      )}
                                      onChange={this.onChangeKeywords}
                                    />
                                  </div>
                                </div>
                              </>
                            )}
                            <div className="col-md-12">
                              <div className="form-group">
                                <textarea
                                  className="pl-2"
                                  name="your-message"
                                  placeholder={this.props.t("discp")}
                                  onChange={this.onChangeDescription}
                                  required
                                  onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                      this.props.t("input_err_msg")
                                    )
                                  }
                                  onInput={(e) =>
                                    e.target.setCustomValidity("")
                                  }
                                ></textarea>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="post-btn form-group">
                                <input
                                  type="submit"
                                  value={this.props.t("post")}
                                  className="post-submit"
                                />
                              </div>
                            </div>
                          </div>
                          <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                              this.checkBtn = c;
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>

            {/* {this.state.showmain ? (
              <div className="addpro-s1-row row">
                <div className="col-md-6 col-sm-6  col-xs-12 addpro-s1-col ">
                  <div className="addpro-s1-box fl-right">
                    <span
                      className="addpro-s1-box-txt"
                      onClick={this.showproduct}
                    >
                      {this.props.t("normal_ad")}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 col-sm-6 col-xs-12 addpro-s1-col">
                  <div className="addpro-s1-box fl-left">
                    <span
                      className="addpro-s1-box-txt"
                      onClick={this.showliveFunc}
                    >
                      {this.props.t("live_ad")}
                    </span>
                  </div>
                </div>
              </div>
            ) : null} */}

            {/* {this.state.showprod ? (
              <div className="row">
                <div className="col-md-12">
                  <Form
                    onSubmit={this.handleSubmit}
                    ref={(c) => {
                      this.Addform = c;
                    }}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-input">
                          <img
                            id="file-ip-1-preview"
                            src={this.state.prod_img1}
                            style={{
                              display: this.state.prod_img1 ? "block" : "none",
                            }}
                            alt={""}
                          />
                        </div>
                        <div className="form-input1">
                          <label htmlFor="file-ip-1" id="file-ip-1_1">
                            <i className="fa fa-plus"></i>
                          </label>
                          <input
                            type="file"
                            id="file-ip-1"
                            accept="image/*"
                            onChange={(e) => this.setImage(e, 1)}
                            required
                          />
                        </div>
                        <div className="bottom-img">
                          <ul style={{ listStyle: "none" }}>
                            <li>
                              <div className="form-input2">
                                <div className="preview2">
                                  {this.state.prod_img2 !== "undefined" &&
                                  this.state.prod_img2.length > 0 ? (
                                    <img
                                      id="file-ip-1-preview2"
                                      src={this.state.prod_img2}
                                      alt={""}
                                      style={{
                                        display: this.state.prod_img2
                                          ? "block"
                                          : "none",
                                      }}
                                    />
                                  ) : (
                                    <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                  )}
                                </div>
                                <label
                                  htmlFor="file-ip-12"
                                  id="file-ip-1_2"
                                  className={
                                    this.state.prod_img2
                                      ? "form-input-view"
                                      : ""
                                  }
                                >
                                  +
                                </label>
                                <input
                                  type="file"
                                  id="file-ip-12"
                                  accept="image/*"
                                  onChange={(e) => this.setImage(e, 2)}
                                />
                              </div>
                            </li>
                            <li>
                              <div className="form-input3">
                                <div className="preview3">
                                  {this.state.prod_img3 !== "undefined" &&
                                  this.state.prod_img3.length > 0 ? (
                                    <img
                                      id="file-ip-1-preview3"
                                      src={this.state.prod_img3}
                                      style={{
                                        display: this.state.prod_img3
                                          ? "block"
                                          : "none",
                                      }}
                                      alt={""}
                                    />
                                  ) : (
                                    <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                  )}
                                </div>
                                <label
                                  htmlFor="file-ip-13"
                                  id="file-ip-1_3"
                                  className={
                                    this.state.prod_img3
                                      ? "form-input-view"
                                      : ""
                                  }
                                >
                                  +
                                </label>
                                <input
                                  type="file"
                                  id="file-ip-13"
                                  accept="image/*"
                                  onChange={(e) => this.setImage(e, 3)}
                                />
                              </div>
                            </li>
                            <li>
                              <div className="form-input4">
                                <div className="preview4">
                                  {this.state.prod_img4 !== "undefined" &&
                                  this.state.prod_img4.length > 0 ? (
                                    <img
                                      id="file-ip-1-preview4"
                                      src={this.state.prod_img4}
                                      style={{
                                        display: this.state.prod_img4
                                          ? "block"
                                          : "none",
                                      }}
                                      alt={""}
                                    />
                                  ) : (
                                    <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                  )}
                                </div>
                                <label
                                  htmlFor="file-ip-14"
                                  id="file-ip-1_4"
                                  className={
                                    this.state.prod_img4
                                      ? "form-input-view"
                                      : ""
                                  }
                                >
                                  +
                                </label>
                                <input
                                  type="file"
                                  id="file-ip-14"
                                  accept="image/*"
                                  onChange={(e) => this.setImage(e, 4)}
                                />
                              </div>
                            </li>
                            <li>
                              <div className="form-input5">
                                <div className="preview5">
                                  {this.state.prod_img5 !== "undefined" &&
                                  this.state.prod_img5.length > 0 ? (
                                    <img
                                      id="file-ip-1-preview5"
                                      src={this.state.prod_img5}
                                      style={{
                                        display: this.state.prod_img5
                                          ? "block"
                                          : "none",
                                      }}
                                      alt={""}
                                    />
                                  ) : (
                                    <i className="fa-solid fa-rectangle-history-circle-plus fa-2x"></i>
                                  )}
                                </div>
                                <label
                                  id="file-ip-1_5"
                                  htmlFor="file-ip-15"
                                  className={
                                    this.state.prod_img5
                                      ? "form-input-view"
                                      : ""
                                  }
                                >
                                  +
                                </label>
                                <input
                                  id="file-ip-15"
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => this.setImage(e, 5)}
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="add-my-product">
                          <h1>
                            {this.props.t("adminAdd")}{" "}
                            {this.props.t("adminProduct")}
                          </h1>
                          <div className="products-form">
                            <div className="row">
                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="title"
                                    placeholder={this.props.t("title")}
                                    onChange={this.onChangeTitle}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="name"
                                    placeholder={this.props.t("name")}
                                    onChange={this.onChangeName}
                                    required
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    placeholder="Country"
                                    id="country_id"
                                    name="country_id"
                                    value={this.state.country_id}
                                    onChange={this.onChangeCountry}
                                  >
                                    <option value="">
                                      {this.props.t("select")}{" "}
                                      {this.props.t("adminCountry")}{" "}
                                    </option>
                                    {this.state.listCountryData &&
                                      (typeof this.state.listCountryData !==
                                        "undefined") &
                                        (this.state.listCountryData.length >
                                          0) &&
                                      this.state.listCountryData.map(
                                        (itemTaskList, m) => (
                                          <option
                                            key={m}
                                            value={itemTaskList.country_id}
                                          >
                                            {itemTaskList.country_name}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    placeholder="City"
                                    id="city_id"
                                    name="city_id"
                                    value={this.state.city_id}
                                    onChange={this.onChangeCity}
                                    required
                                  >
                                    <option value="">
                                      {this.props.t("select")}{" "}
                                      {this.props.t("adminCity")}
                                    </option>
                                    {this.state.listCityData &&
                                      (typeof this.state.listCityData !==
                                        "undefined") &
                                        (this.state.listCityData.length > 0) &&
                                      this.state.listCityData.map(
                                        (itemTaskList, m) => (
                                          <option
                                            key={m}
                                            value={itemTaskList.city_id}
                                          >
                                            {itemTaskList.city_name}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    placeholder="Category"
                                    id="category_id"
                                    name="category_id"
                                    value={this.state.category_id}
                                    onChange={this.onChangeCategory}
                                    required
                                  >
                                    <option value="">
                                      {this.props.t("select")}{" "}
                                      {this.props.t("adminCategory")}
                                    </option>
                                    {this.state.listCategoryData &&
                                      (typeof this.state.listCategoryData !==
                                        "undefined") &
                                        (this.state.listCategoryData.length >
                                          0) &&
                                      this.state.listCategoryData.map(
                                        (itemTaskList, m) => (
                                          <option
                                            key={m}
                                            value={itemTaskList.category_id}
                                          >
                                            {itemTaskList.category_name}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    placeholder="Brand"
                                    id="brand_id"
                                    name="brand_id"
                                    value={this.state.sub_category_id}
                                    onChange={this.onChangeSubCategory}
                                    required
                                  >
                                    <option value="">
                                      {this.props.t("select")}
                                      {this.props.t("adminSubCat")}{" "}
                                    </option>
                                    {this.state.listSubCategoryData &&
                                      (typeof this.state.listSubCategoryData !==
                                        "undefined") &
                                        (this.state.listSubCategoryData.length >
                                          0) &&
                                      this.state.listSubCategoryData.map(
                                        (itemTaskList, m) => (
                                          <option
                                            key={m}
                                            data-year={
                                              itemTaskList.sub_category_year_applies
                                            }
                                            value={itemTaskList.sub_category_id}
                                          >
                                            {itemTaskList.sub_category_name}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    placeholder="Brand"
                                    id="brand_id"
                                    name="brand_id"
                                    value={this.state.brand_id}
                                    onChange={this.onChangeBrand}
                                    required
                                  >
                                    <option value="">
                                      {this.props.t("select")}{" "}
                                      {this.props.t("adminBrand")}
                                    </option>
                                    {this.state.listBrandData &&
                                      (typeof this.state.listBrandData !==
                                        "undefined") &
                                        (this.state.listBrandData.length > 0) &&
                                      this.state.listBrandData.map(
                                        (itemTaskList, m) => (
                                          <option
                                            key={m}
                                            value={itemTaskList.brand_id}
                                          >
                                            {itemTaskList.brand_name}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="form-group">
                                  <select
                                    className="form-control"
                                    placeholder="Model"
                                    id="model_id"
                                    name="model_id"
                                    value={this.state.model_id}
                                    onChange={this.onChangeModel}
                                  >
                                    <option value="">
                                      {this.props.t("select")}{" "}
                                      {this.props.t("adminModel")}
                                    </option>
                                    {this.state.listModelData &&
                                      (typeof this.state.listModelData !==
                                        "undefined") &
                                        (this.state.listModelData.length > 0) &&
                                      this.state.listModelData.map(
                                        (itemTaskList, m) => (
                                          <option
                                            key={m}
                                            value={itemTaskList.model_id}
                                          >
                                            {itemTaskList.model_name}
                                          </option>
                                        )
                                      )}
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <select
                                    className="select-Auction form-control"
                                    onChange={this.onChangeAuctionType}
                                  >
                                    <option>
                                      {this.props.t("select")}{" "}
                                      {this.props.t("adminAuctionType")}
                                    </option>

                                    <option value="online">
                                      {this.props.t("Live")}{" "}
                                      {this.props.t("Auction")}
                                    </option>
                                    <option value="offline">
                                      {this.props.t("Normal")}{" "}
                                      {this.props.t("Auction")}
                                    </option>
                                  </select>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="amount"
                                    placeholder={this.props.t("Amount")}
                                    onChange={this.onChangePrice}
                                  />
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control"
                                    name="Keywords"
                                    placeholder={this.props.t("adminKeywords")}
                                    onChange={this.onChangeKeywords}
                                    required
                                  />
                                </div>
                              </div>

                              {this.state.showyear ? (
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <select
                                      className="form-control"
                                      placeholder="Model"
                                      id="model_id"
                                      name="model_id"
                                      onChange={this.onChangeYear}
                                      required
                                    >
                                      <option value="">
                                        {this.props.t("select")}{" "}
                                        {this.props.t("adminYear")}
                                      </option>
                                      {this.state.listYearData &&
                                        (typeof this.state.listYearData !==
                                          "undefined") &
                                          (this.state.listYearData.length >
                                            0) &&
                                        this.state.listYearData.map(
                                          (itemTaskList, m) => (
                                            <option
                                              key={m}
                                              value={itemTaskList.year_id}
                                            >
                                              {itemTaskList.year}
                                            </option>
                                          )
                                        )}
                                    </select>
                                  </div>
                                </div>
                              ) : null}

                              <div className="col-md-6">
                                <div className="form-group">
                                  <input
                                    type="date"
                                    className="form-control"
                                    placeholder="Start Date Time"
                                    id="start_date_time"
                                    name="start_date_time"
                                    value={this.state.start_date_time}
                                    onChange={this.onChangeStartDateTime}
                                    required
                                  />
                                </div>
                              </div>
                              {this.state.other_show && (
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <input
                                      type="time"
                                      className="form-control"
                                      placeholder="Start Date Time"
                                      id="start_time"
                                      name="start_time"
                                      value={this.state.start_time}
                                      onChange={this.onChangeStartTime}
                                      required
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="col-md-12">
                                <div className="form-group">
                                  <textarea
                                    className="pl-2"
                                    name="your-message"
                                    placeholder={this.props.t("discp")}
                                    onChange={this.onChangeDescription}
                                    required
                                  ></textarea>
                                </div>
                              </div>

                              <div className="col-md-12">
                                <div className="post-btn form-group">
                                  <input
                                    type="submit"
                                    value={this.props.t("post")}
                                    className="post-submit"
                                  />
                                </div>
                              </div>
                            </div>
                            <CheckButton
                              style={{ display: "none" }}
                              ref={(c) => {
                                this.checkBtn = c;
                              }}
                            />
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            ) : null} */}

            {/* {this.state.showlive ? (
              <div className="row">
                <div className="col-md-6">
                  <div className="logo">
                    <a href="/">
                      <img
                        src={logo}
                        alt=""
                        className="d-block mx-auto mt-5 pt-5"
                      />
                    </a>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="add-my-product pt-3">
                    <h1>
                      {this.props.t("adminAdd")} {this.props.t("adminProduct")}
                    </h1>
                    <div className="products-form">
                      <Form
                        onSubmit={this.handleliveSubmit}
                        ref={(d) => {
                          this.Addliveform = d;
                        }}
                      >
                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="title"
                              placeholder={this.props.t("title")}
                              onChange={this.onChangeLiveTitle}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="name"
                              placeholder={this.props.t("name")}
                              onChange={this.onChangeLiveName}
                            />
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="form-group">
                            <textarea
                              name="your-message"
                              className="form-control"
                              placeholder={this.props.t("discp")}
                              onChange={this.onChangeLiveDescription}
                            ></textarea>
                          </div>
                        </div>

                        <div className="col-md-12">
                          <div className="post-btn form-group">
                            <input
                              type="submit"
                              value={this.props.t("post")}
                              className="post-submit"
                            />
                          </div>
                        </div>
                        <CheckButton
                          style={{ display: "none" }}
                          ref={(d) => {
                            this.checkBtn = d;
                          }}
                        />
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            ) : null} */}

            <div className="row mt-5">
              <div className="col-md-12">
                <div className="see-more my-bid-see">
                  <div className="bar2"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </React.Fragment>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    user,
    isLoggedIn,
    message,
  };
}

export default connect(mapStateToProps)(withTranslation()(Createads));
