import React, { Component } from "react";
import axios from "axios";
import { withTranslation } from "react-i18next";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";

import { clearMessage } from "../../actions/message";

import { history } from "../../helpers/history";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import Carousel from "react-bootstrap/Carousel";

import $ from "jquery";

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
  SubCatBrandList,
  BrandModelLst,
  YearList,
  BannerList,
  CountryCityList,
  CountryList,
  SubCategoryListByCategory,
} from "../../actions/website/Home";
import {
  ProductDelete,
  ProductInfo,
  ProductUpdate,
  ClientProductList,
  ProductwiseBidderList,
  AwardBid,
} from "../../actions/website/LiveAuction";

import moment from "moment-timezone";

import HeroSlider from "./parts/heroSlider";
import homebanner from "./../../assets/website/img/myads23_03_22.jpg";
import logo from "./../../assets/website/img/livebid/logo.png";
import "./../../assets/website/css/sliderstyle.css";
import noImage from "./../../assets/website/img/download.jpg";

toast.configure();

class MyAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategoryData: [],
      listLiveAuctionData: [],
      listNormalAuctionData: [],
      filterArray: [],
      listBannerData: [],
      listBrandData: [],
      bidListOfProduct: [],
      data: [],
      itemsToShow: 4,
      expanded: false,
      normalToShow: 4,
      normalexpanded: false,
      showPopup: false,
      loading: true,
      edit_title: "",
      edit_name: "",
      edit_country_id: 0,
      edit_city_id: 0,
      edit_category_id: 0,
      edit_sub_category_id: 0,
      edit_brand_id: 0,
      edit_model_id: 0,
      edit_auction_type: 0,
      edit_starting_price: 0,
      edit_keywords: "",
      edit_start_date_time: "",
      edit_end_date_time: "",
      edit_start_time: "",
      edit_end_time: "",
      edit_youtube_link: "",
      searchString: "",
    };
    this.showMore = this.showMore.bind(this);
    this.showMoreLive = this.showMoreLive.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.filterArrayfunc = this.filterArrayfunc.bind(this);
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    this.ListCountryFun();
    this.ListCategoryFun();
    this.ListLiveAuctionFun();
    // this.ListNormalAuctionFun();
    this.ListBannerFun();
  }
  onChangeSearch = (e) => {
    let inputVal = e.target.value;
    if (inputVal.length > 0) {
      this.setState({
        searchString: inputVal,
      });
    } else {
      this.setState({
        filterArray: this.state.listNormalAuctionData,
      });
    }
  };
  onEnterSearch = (e) => {
    if (e.key === "Enter") {
      let searchString = e.target.value;
      let responseData = [];
      if (searchString.length > 0) {
        responseData = this.state.listNormalAuctionData.filter((val) =>
          val.title.toLowerCase().includes(searchString.toLowerCase())
        );
      } else {
        responseData = this.state.listNormalAuctionData;
      }
      this.setState({
        filterArray: responseData,
      });
    }
  };
  filterArrayfunc = () => {
    var searchString = this.state.searchString;
    let responseData = [];
    if (searchString.length > 0) {
      responseData = this.state.listNormalAuctionData.filter((val) =>
        val.title.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      responseData = this.state.listNormalAuctionData;
    }
    this.setState({
      filterArray: responseData,
    });
  };

  ListCategoryFun = () => {
    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
        this.setState({
          listCategoryData: response.data,
        });
        // this.TableDataUpdate();
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
    console.log("city list called");
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

  ListYearFun = () => {
    const { dispatch, history } = this.props;
    dispatch(YearList())
      .then((response) => {
        this.setState({
          listYearData: response.data,
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listYearData: [],
        });
      });
  };
  ListBannerFun = () => {
    const { dispatch, history } = this.props;
    dispatch(BannerList())
      .then((response) => {
        this.setState({
          listBannerData: response.data,
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listBannerData: [],
        });
      });
  };

  ListLiveAuctionFun = () => {
    let biddata = JSON.parse(localStorage.getItem("userId"));

    const { dispatch, history } = this.props;
    this.setState({
      loading: true,
    });
    if (biddata == null) {
      history.push("/");
    } else {
      dispatch(ClientProductList(biddata.data[0].id))
        .then((response) => {
          this.setState({
            listNormalAuctionData: response.data,
            filterArray: response.data,
          });
          this.setState({
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            listNormalAuctionData: [],
            filterArray: [],
          });
        });
    }
  };
  submitAward = (customer_id, bid_id, bid_status, product_id) => {debugger
    const { dispatch, history } = this.props;
    dispatch(AwardBid(customer_id, bid_id, bid_status, product_id)).then(
      (response) => {
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
          this.ListLiveAuctionFun();
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
        $("#bid_list_form").modal("hide");
      }
    );
  };
  showMoreLive = (e) => {
    e.preventDefault();
    this.state.itemsToShow === 4
      ? this.setState({
          itemsToShow: this.state.filterArray.length,
          expanded: true,
        })
      : this.setState({ itemsToShow: 4, expanded: false });
  };
  onChangeEditTitle = (e) => {
    this.setState({
      edit_title: e.target.value,
    });
  };
  onChangeEditName = (e) => {
    this.setState({
      edit_name: e.target.value,
    });
  };
  onChangeEditDescription = (e) => {
    this.setState({
      edit_description: e.target.value,
    });
  };
  onChangeEditKeywords = (e) => {
    this.setState({
      edit_keywords: e.target.value,
    });
  };
  onChangeEditCategory = (e) => {
    var catid = e.target.value;
    this.setState(
      {
        edit_category_id: e.target.value,
      },
      () => {
        this.ListSubCategoryFun(catid);
      }
    );
  };

  onchangeEditCity = (e) => {
    this.setState({
      edit_city_id: e.target.value,
    });
  };
  onchangeEditCountry = (e) => {
    console.log("Edit coutry is fired");
    var countryid = e.target.value;
    this.setState(
      {
        edit_country_id: e.target.value,
      },
      () => {
        this.ListCityFun(countryid);
      }
    );
  };
  onChangeEditBrand = (e) => {
    var brandid = e.target.value;
    this.setState(
      {
        edit_brand_id: e.target.value,
      },
      () => {
        this.ListModelFun(brandid);
      }
    );
  };
  onChangeEditModel = (e) => {
    this.setState({
      edit_model_id: e.target.value,
    });
    // this.ListSubCategoryFun(e.target.value);
  };
  onChangeEditSubCategory = (e) => {
    let subcatid = e.target.value;
    this.setState(
      {
        edit_sub_category_id: e.target.value,
      },
      () => {
        this.ListBrandFun(subcatid);
      }
    );
  };
  onChangeEditStartDateTime = (e) => {
    this.setState({
      edit_start_date_time: e.target.value,
    });
  };
  onChangeEditStartTime = (e) => {
    this.setState({
      edit_start_time: e.target.value,
    });
  };
  onChangeEditEndDateTime = (e) => {
    this.setState({
      edit_end_date_time: e.target.value,
    });
  };
  onChangeEditEndTime = (e) => {
    this.setState({
      edit_end_time: e.target.value,
    });
  };
  onChangeEditAuctionType = (e) => {
    if (e.target.value === "online") {
      this.setState({
        other_edit_show: true,
        edit_auction_type: e.target.value,
      });
    } else {
      this.setState({
        other_edit_show: false,
        edit_auction_type: e.target.value,
      });
    }
  };
  onChangeEditStartingPrice = (e) => {
    this.setState({
      edit_starting_price: e.target.value,
    });
  };
  onChangeEditHighPrice = (e) => {
    this.setState({
      edit_high_price: e.target.value,
    });
  };
  onChangeEditFinalPrice = (e) => {
    this.setState({
      edit_final_price: e.target.value,
    });
  };
  onChangeEditRefund = (e) => {
    this.setState({
      edit_refund: e.target.value,
    });
  };
  onChangeEditRefundDays = (e) => {
    this.setState({
      edit_refund_days: e.target.value,
    });
  };
  onChangeEditYoutubeLink = (e) => {
    this.setState({
      edit_youtube_link: e.target.value,
    });
  };
  onChangeEditVideo = (e) => {
    this.setState({
      edit_video: e.target.files,
    });
  };
  onChangeEditProductImage = (e) => {
    this.setState({
      edit_product_img: e.target.files,
    });
  };

  togglePopup() {
    var lang;
    lang = localStorage.getItem("userId");
    // console.log("value of lang is")
    // console.log(lang)
    if (lang != null) {
      let path = `/createads`;
      history.push(path);
    } else {
      $("#createad").modal("show");
    }
  }
  showMore = () => {
    this.state.normalToShow === 4
      ? this.setState({
          itemsToShow: this.state.filterArray.length,
          normalexpanded: true,
        })
      : this.setState({ itemsToShow: 4, normalexpanded: false });
  };

  showBidList = (product_id) => {
    const { dispatch, history } = this.props;
    dispatch(ProductwiseBidderList(product_id)).then((response) => {
      if (
        response.success ||
        response.success === "true" ||
        response.success === true
      ) {
        if (response.data) {
          console.log("true");
          console.log(response.data.length);
        } else {
          console.log("false");
        }
        if (response.data && response.data.length > 0) {
          this.setState({
            bidListOfProduct: response.data,
          });
          $("#bid_list_form").modal("show");
        } else {
          toast.error(this.props.t("nba"), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeonClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        toast.error(this.props.t("nba"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeonClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };
  InfoProductFun = (product_id) => {
    const { dispatch, history } = this.props;
    dispatch(ProductInfo(product_id))
      .then((response) => {
        if (
          response.data &&
          typeof response.data !== "undefined" &&
          response.data.length > 0
        ) {
          this.setState(
            {
              product_id: response.data[0].product_id,
              edit_category_id: response.data[0].category_id,
              edit_title: response.data[0].title,
              edit_name: response.data[0].name,
              edit_description: response.data[0].description,
              edit_keywords: response.data[0].keywords,
              edit_category_id: response.data[0].category_id,
              edit_sub_category_id: response.data[0].sub_category_id,
              edit_brand_id: response.data[0].brand_id,
              edit_country_id: response.data[0].country_id,
              edit_city_id: response.data[0].city_id,
              edit_model_id: response.data[0].model_id,
              edit_start_date_time: response.data[0].start_date_time,
              edit_end_date_time:
                response.data[0].auction_type === "offline"
                  ? ""
                  : response.data[0].end_date_time,
              edit_start_time:
                response.data[0].auction_type === "online"
                  ? response.data[0].start_time
                  : "00:00",
              edit_end_time:
                response.data[0].auction_type === "online"
                  ? response.data[0].end_time
                  : "00:00",
              edit_auction_type: response.data[0].auction_type,
              other_edit_show:
                response.data[0].auction_type === "online" ? true : false,
              edit_starting_price: response.data[0].starting_price,
              edit_high_price: response.data[0].high_price,
              edit_final_price: response.data[0].final_price,
              edit_refund: response.data[0].refund,
              edit_refund_days: response.data[0].refund_days,
              edit_youtube_link: response.data[0].zoom_link,
              edit_video_view: response.data[0].video,
              edit_product_view_img: response.data[0].product_img,
            },
            () => {
              console.log("end date teime");
              console.log(this.state.edit_end_date_time);
              this.ListCityFun(response.data[0].country_id);
              this.ListSubCategoryFun(response.data[0].category_id);
              this.ListBrandFun(response.data[0].sub_category_id);
              this.ListModelFun(response.data[0].brand_id);
            }
          );
          if (
            response.data[0].auction_type &&
            response.data[0].auction_type == "online"
          ) {
            this.setState({ other_edit_show: true });
          }

          this.ListSubCategoryFun(response.data[0].category_id);
          $("#edit_form").modal("show");
        }
      })
      .catch((error) => {});
  };

  handleDelete = (id) => {
    const { dispatch, history } = this.props;
    dispatch(ProductDelete(id))
      .then((response) => {
        if (response.success === true) {
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
          this.ListLiveAuctionFun();
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
      })
      .catch(() => {
        toast.error(this.props.t("sww"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
  handleUpdateSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Updateform.validateAll();

    const { dispatch, history } = this.props;
    console.log("now endd ate time is");
    console.log(this.state.edit_end_date_time);
    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(
        ProductUpdate(
          this.state.product_id,
          this.state.edit_title,
          this.state.edit_name,
          this.state.edit_description,
          this.state.edit_keywords,
          this.state.edit_category_id,
          this.state.edit_brand_id,
          this.state.edit_model_id,
          this.state.edit_country_id,
          this.state.edit_city_id,
          this.state.edit_sub_category_id,
          this.state.edit_start_date_time,
          // "2022-06-23",
          this.state.edit_end_date_time,
          this.state.edit_auction_type,
          this.state.edit_starting_price,
          this.state.edit_high_price,
          this.state.edit_final_price,
          this.state.edit_refund,
          this.state.edit_refund_days,
          this.state.edit_youtube_link,
          this.state.edit_product_img,
          this.state.edit_video,
          this.state.edit_start_time,
          this.state.edit_end_time
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
          this.ListLiveAuctionFun();
          this.setState({
            product_id: 0,
            edit_category_id: 0,
            edit_product_name: "",
          });
          $("#edit_form").modal("hide");
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
      // .catch((error) => {
      //   this.setState({
      // 	loading: false
      //   });
      //   toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      // });
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

  tzFun = (ndate, ntime, nformat) => {
    if (ndate && ntime) {
      let ndateArr = ndate.split("-");
      let localtz = moment.tz.guess();
      let tempDate = moment.tz(
        `${ndateArr[2]}-${ndateArr[1]}-${ndateArr[0]} ${ntime}`,
        localtz
      );
      let formatDate = moment(tempDate._i).format(nformat);
      return formatDate;
    } else {
      return "";
    }
  };

  render() {
    const { isLoggedIn, message } = this.props;

    const slider = [
      {
        banner: homebanner,
        title: "lorem lipsum",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
        buttonTitle: this.props.t("createad"),
        handleButtonClick: this.togglePopup.bind(this),
      },
    ];

    return (
      <React.Fragment>
        <HeroSlider slides={slider} />

        {/* <section className="breadcrumb-products">
            <div className="container">
              <div className="row bose-row-1">
                <div className="col-md-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <a href="#">{this.props.t("home_cap")}</a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#">{this.props.t("my_adss")}</a>
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </section> */}

        <section className="bose-quiet">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="bose-heading">
                  <h1>{this.props.t("my_adss")}</h1>
                </div>
              </div>
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="search-product-outer">
                  <div className="search-product">
                    <input
                      type="text"
                      placeholder={this.props.t("Search")}
                      name="search"
                      onChange={this.onChangeSearch}
                      onKeyDown={this.onEnterSearch}
                    />
                    <button onClick={this.filterArrayfunc}>
                      <i className="fa fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              {this.state.loading ? (
                <div className="col-md-12">
                  <div className="auction-loader">
                    <div className="loader"></div>
                  </div>
                </div>
              ) : (
                <>
                  {this.state.filterArray &&
                  typeof this.state.filterArray !== "undefined" &&
                  this.state.filterArray.length > 0 ? (
                    <>
                      {this.state.filterArray
                        .slice(0, this.state.itemsToShow)
                        .map((itemMyAdsList, l) => (
                          <div
                            className="col-md-12 col-sm-12 col-xs-12 bid-list-bose-comfrt"
                            key={l}
                          >
                            <div className="col-md-2 col-sm-2 col-xs-4 bid-list-img">
                              {itemMyAdsList.product_img.length > 0 ? (
                                <img
                                  className="live-bid-img"
                                  src={itemMyAdsList.product_img}
                                  alt=""
                                />
                              ) : (
                                <img
                                  className="live-bid-img"
                                  src={logo}
                                  alt=""
                                />
                              )}
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-8 bid-list-sec1">
                              <span className="bid-list-h1">
                                {itemMyAdsList.title}
                              </span>
                              <div className="mob-push-up">
                                <span className="bid-list-p">
                                  {this.props.t(
                                    itemMyAdsList.auction_type.toLowerCase()
                                  )}{" "}
                                  {this.props.t("bid")}
                                </span>
                                <span className="bid-list-p">
                                  {this.props.t("status")}:{" "}
                                  {this.props.t(
                                    itemMyAdsList.auction_type.toLowerCase()
                                  )}
                                </span>
                              </div>
                            </div>
                            <div className="col-md-3 col-sm-3 col-xs-5 bid-list-sec2">
                              <div className="date-time bid-list-date-time">
                                <ul>
                                  <li className="bid-list-li">
                                    <i
                                      className="fa fa-calendar bid-list-icon"
                                      aria-hidden="true"
                                    ></i>
                                    <span className="bid-list-date">
                                      {`${this.tzFun(
                                        itemMyAdsList.start_date_time,
                                        itemMyAdsList.start_time
                                          ? moment(itemMyAdsList.start_time, [
                                              "h:mm A",
                                            ]).format("HH:mm:ss")
                                          : "00:00:00",
                                        "DD/MM/YY"
                                      )} - ${this.tzFun(
                                        itemMyAdsList.end_date_time,
                                        itemMyAdsList.end_time
                                          ? moment(itemMyAdsList.end_time, [
                                              "h:mm A",
                                            ]).format("HH:mm:ss")
                                          : "00:00:00",
                                        "DD/MM/YY"
                                      )}`}
                                    </span>
                                  </li>
                                  {itemMyAdsList.auction_type === "online" ? (
                                    <li className="bid-list-li">
                                      <i
                                        className="fa fa-clock-o bid-list-icon"
                                        aria-hidden="true"
                                      ></i>
                                      <span className="bid-list-date">
                                        {`${this.tzFun(
                                          itemMyAdsList.start_date_time,
                                          itemMyAdsList.start_time
                                            ? moment(itemMyAdsList.start_time, [
                                                "h:mm A",
                                              ]).format("HH:mm:ss")
                                            : "00:00:00",
                                          "h:mmA"
                                        )} - ${this.tzFun(
                                          itemMyAdsList.end_date_time,
                                          itemMyAdsList.end_time
                                            ? moment(itemMyAdsList.end_time, [
                                                "h:mm A",
                                              ]).format("HH:mm:ss")
                                            : "00:00:00",
                                          "h:mmA"
                                        )}`}
                                      </span>
                                    </li>
                                  ) : null}
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-4 bid-list-sec3">
                              {itemMyAdsList.auction_type === "offline" ? (
                                <span className="bid-list-h1">
                                  {this.props.t("Bid_Amount")}:{" "}
                                  {itemMyAdsList.starting_price}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-4 bid-list-sec4">
                              <ul className="bid-list-event">
                                {itemMyAdsList.auction_type === "offline" ? (
                                  <li>
                                    <a
                                      href="#"
                                      onClick={(e) => {
                                        this.showBidList(
                                          itemMyAdsList.product_id
                                        );
                                        e.preventDefault();
                                      }}
                                    >
                                      <i href="#" className="fa fa-list"></i>
                                      <span>{this.props.t("Bid_List")}</span>
                                    </a>
                                  </li>
                                ) : (
                                  ""
                                )}
                                <li>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      this.InfoProductFun(
                                        itemMyAdsList.product_id
                                      );
                                      e.preventDefault();
                                    }}
                                  >
                                    <i href="#" className="fa fa-edit"></i>
                                    <span>{this.props.t("adminEdit")}</span>
                                  </a>
                                </li>
                                {/* <li>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      e.preventDefault();
                                    }}
                                  >
                                    <i href="#" className="fa fa-trophy"></i>
                                    <span>{this.props.t("Trophy")}</span>
                                  </a>
                                </li> */}
                                <li>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      this.handleDelete(
                                        itemMyAdsList.product_id
                                      );
                                      e.preventDefault();
                                    }}
                                  >
                                    <i
                                      href="#"
                                      target="_blank"
                                      className="fa fa-archive"
                                    ></i>
                                    <span>{this.props.t("Archive_")}</span>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ))}
                      {this.state.filterArray &&
                      typeof this.state.filterArray !== "undefined" &&
                      this.state.filterArray.length > 4 ? (
                        <div className="col-md-12 ">
                          <div className="see-more container ">
                            <a href="#" onClick={this.showMoreLive}>
                              {this.state.expanded ? (
                                <span>{this.props.t("showless")}</span>
                              ) : (
                                <span>{this.props.t("showmore")}</span>
                              )}
                            </a>
                            <div className="bar2"></div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <div className="col-md-12">
                      <div className="NoAuctionData">{this.props.t("NoAuctionData")}</div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </section>

        <div id="main-wrapper">
          <div
            id="bid_list_form"
            className="modal custom-modal fade"
            role="dialog"
          >
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  {/* <h4 className="modal-title">Bid List</h4> */}
                  <h4 className="modal-title"> {this.props.t("Bid_List")}</h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  {/* <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}> */}
                  <table className="table table-striped custom-table mb-0 datatable">
                    <thead>
                      <tr>
                        <th>{this.props.t("Email_")}</th>
                        <th>{this.props.t("Mobile")}</th>
                        <th>{this.props.t("Bid_Amount")}</th>
                        <th>{this.props.t("adminActions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.bidListOfProduct &&
                      typeof this.state.bidListOfProduct !== "undefined" &&
                      this.state.bidListOfProduct.length > 0 ? (
                        this.state.bidListOfProduct.map((itemBidList, l) => (
                          <tr key={l}>
                            <td>{itemBidList.email_id}</td>
                            <td>{itemBidList.mobile_no}</td>
                            <td>{itemBidList.bid_amount}</td>
                            
                            <td>
                            {itemBidList.bid_status=="pending" &&
                            <button
                               className="btn awardbtn"
                               onClick={() =>
                                 this.submitAward(
                                   itemBidList.customer_id,
                                   itemBidList.bid_id,
                                   "accepted",
                                   itemBidList.product_id
                                 )
                               }
                             >
                               Award
                             </button>
  }
                              {itemBidList.bid_status=="accepted" &&
                               <button
                               className="btn awardbtn"
                              //  onClick={() =>
                              //    this.submitAward(
                              //      itemBidList.customer_id,
                              //      itemBidList.bid_id,
                              //      "accepted",
                              //      itemBidList.product_id
                              //    )
                               
                               disabled
                             >
                               Awarded
                             </button>
                              }
                              {itemBidList.bid_status=="rejected" &&
                               <button
                               className="btn awardbtn"
                              //  onClick={() =>
                              //    this.submitAward(
                              //      itemBidList.customer_id,
                              //      itemBidList.bid_id,
                              //      "accepted",
                              //      itemBidList.product_id
                              //    )
                               
                               disabled
                             >
                               Award
                             </button>
                              }
                             
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr></tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div id="edit_form" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">
                    {this.props.t("EditProduct")}
                  </h4>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  <Form
                    onSubmit={this.handleUpdateSubmit}
                    ref={(c) => {
                      this.Updateform = c;
                    }}
                    // edit_auction_type
                  >
                    <div className="row">
                      {/* <div className="col-sm-4">
                        <div className="form-group">
                          <label>{this.props.t("adminAuctionType")}:</label>
                          <select
                            className="form-control"
                            placeholder={this.props.t("adminAuctionType")}
                            id="auction_type"
                            name="edit_auction_type"
                            value={this.state.edit_auction_type}
                            onChange={this.onChangeEditAuctionType}
                            required
                            disabled
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("select_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          >
                            <option value="">
                              {this.props.t("select")}{" "}
                              {this.props.t("adminAuctionType")}:
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
                      </div> */}
                      <div className="col-sm-8">
                        <div className="form-group">
                          <label>{this.props.t("title")}:<span style={{color:"red"}}> *</span></label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder={this.props.t("title")}
                            id="title"
                            name="edit_title"
                            value={this.state.edit_title}
                            onChange={this.onChangeEditTitle}
                            required
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          />
                        </div>
                      </div>
                      {/* <div className="col-sm-3">
                        <div className="form-group">
                          <label>Name:</label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Name"
                            id="name"
                            name="edit_name"
                            value={this.state.edit_name}
                            onChange={this.onChangeEditName}
                            required
                          />
                        </div>
                      </div> */}

                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>{this.props.t("adminCountry")}:<span style={{color:"red"}}> *</span></label>
                          <select
                            className="form-control"
                            placeholder={this.props.t("adminCountry")}
                            id="Country_id"
                            name="edit_Country_id"
                            value={this.state.edit_country_id}
                            onChange={this.onchangeEditCountry}
                            required
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("select_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          >
                            <option value="">
                              {this.props.t("select")}{" "}
                              {this.props.t("adminCountry")}
                            </option>
                            {this.state.listCountryData &&
                              (typeof this.state.listCountryData !==
                                "undefined") &
                                (this.state.listCountryData.length > 0) &&
                              this.state.listCountryData.map(
                                (itemTaskList, m) => (
                                  <option
                                    value={itemTaskList.country_id}
                                    key={m}
                                  >
                                    {localStorage.getItem("lang") === "English"
                                      ? itemTaskList.country_name
                                      : itemTaskList.country_name_arabic}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                      </div>
                      <div className="col-sm-4">
                        <div className="form-group">
                          <label>{this.props.t("adminCity")}:<span style={{color:"red"}}> *</span></label>
                          <select
                            className="form-control"
                            placeholder={this.props.t("adminCity")}
                            id="City_id"
                            name="City_id"
                            value={this.state.edit_city_id}
                            onChange={this.onchangeEditCity}
                            required
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("select_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          >
                            <option value="">
                              {this.props.t("select")}{" "}
                              {this.props.t("adminCity")}
                            </option>
                            {this.state.listCityData &&
                              (typeof this.state.listCityData !== "undefined") &
                                (this.state.listCityData.length > 0) &&
                              this.state.listCityData.map((itemTaskList, m) => (
                                <option value={itemTaskList.city_id} key={m}>
                                  {localStorage.getItem("lang") === "English"
                                    ? itemTaskList.city_name
                                    : itemTaskList.city_name_arabic}
                                </option>
                              ))}
                          </select>
                        </div>
                      </div>
                      {this.state.edit_auction_type !== "golivenow" ? (
                        <>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("adminCategory")}:<span style={{color:"red"}}> *</span></label>
                              <select
                                className="form-control"
                                placeholder={this.props.t("adminCategory")}
                                id="category_id"
                                name="edit_category_id"
                                value={this.state.edit_category_id}
                                onChange={this.onChangeEditCategory}
                                required
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("select_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
                              >
                                <option value="">
                                  {this.props.t("select")}{" "}
                                  {this.props.t("adminCategory")}
                                </option>
                                {this.state.listCategoryData &&
                                  (typeof this.state.listCategoryData !==
                                    "undefined") &
                                    (this.state.listCategoryData.length > 0) &&
                                  this.state.listCategoryData.map(
                                    (itemTaskList, m) => (
                                      <option
                                        value={itemTaskList.category_id}
                                        key={m}
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
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("adminSubCat")}:<span style={{color:"red"}}> *</span></label>
                              <select
                                className="form-control"
                                placeholder={this.props.t("adminSubCat")}
                                id="edit_category_id"
                                name="edit_category_id"
                                value={this.state.edit_sub_category_id}
                                onChange={this.onChangeEditSubCategory}
                                required
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("select_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
                              >
                                <option value="">
                                  {this.props.t("select")}{" "}
                                  {this.props.t("adminSubCat")}
                                </option>
                                {this.state.listSubCategoryData &&
                                  (typeof this.state.listSubCategoryData !==
                                    "undefined") &
                                    (this.state.listSubCategoryData.length >
                                      0) &&
                                  this.state.listSubCategoryData.map(
                                    (itemTaskList, m) => (
                                      <option
                                        value={itemTaskList.sub_category_id}
                                        key={m}
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
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("adminBrand")}:<span style={{color:"red"}}> *</span></label>
                              <select
                                className="form-control"
                                placeholder={this.props.t("adminBrand")}
                                id="brand_id"
                                name="edit_brand_id"
                                value={this.state.edit_brand_id}
                                onChange={this.onChangeEditBrand}
                                required
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("select_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
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
                                        value={itemTaskList.brand_id}
                                        key={m}
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
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("adminModel")}:</label>
                              <select
                                className="form-control"
                                placeholder={this.props.t("adminModel")}
                                id="model_id"
                                name="edit_model_id"
                                value={this.state.edit_model_id}
                                onChange={this.onChangeEditModel}
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
                          {this.state.edit_auction_type === "offline" ? (
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label>{this.props.t("price")}:</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  placeholder={this.props.t("price")}
                                  id="starting_price"
                                  name="edit_starting_price"
                                  value={this.state.edit_starting_price}
                                  onChange={this.onChangeEditStartingPrice}
                                  required
                                  min={0}
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
                          ) : (
                            ""
                          )}
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("adminKeywords")}:</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder={this.props.t("adminKeywords")}
                                id="keywords"
                                name="edit_keywords"
                                value={this.state.edit_keywords}
                                onChange={this.onChangeEditKeywords}
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        ""
                      )}
                      {this.state.edit_auction_type === "online" ? (
                        <>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("adminStartDate")}:<span style={{color:"red"}}> *</span></label>
                              <input
                                type="date"
                                className="form-control"
                                placeholder={this.props.t("adminStartDate")}
                                id="start_date_time"
                                name="edit_start_date_time"
                                value={this.state.edit_start_date_time}
                                onChange={this.onChangeEditStartDateTime}
                                required
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("input_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
                              />
                            </div>
                          </div>
                          {!this.state.other_edit_show && (
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label>{this.props.t("adminEndDate")}:<span style={{color:"red"}}> *</span></label>
                                <input
                                  type="date"
                                  className="form-control"
                                  placeholder={this.props.t("adminEndDate")}
                                  id="end_date_time"
                                  name="edit_end_date_time"
                                  value={this.state.edit_end_date_time}
                                  onChange={this.onChangeEditEndDateTime}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}
                      {this.state.edit_auction_type !== "golivenow" ? (
                        <>
                          {this.state.other_edit_show && (
                            <div className="col-sm-4">
                              <div className="form-group">
                                <label>{this.props.t("starttime")}:<span style={{color:"red"}}> *</span></label>
                                <input
                                  type="time"
                                  className="form-control"
                                  placeholder={this.props.t("starttime")}
                                  id="edit_start_time"
                                  name="edit_start_time"
                                  value={this.state.edit_start_time}
                                  onChange={this.onChangeEditStartTime}
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
                          )}

                          {/* <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("totime")}:</label>
                              <input
                                type="time"
                                className="form-control"
                                placeholder={this.props.t("totime")}
                                id="edit_end_time"
                                name="edit_end_time"
                                value={this.state.edit_end_time}
                                onChange={this.onChangeEditEndTime}
                                required
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("input_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
                              />
                            </div>
                          </div>  */}

                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("Product_images")}:<span style={{color:"red"}}> *</span></label>
                              <input
                                type="file"
                                className="form-control edit_product_img"
                                id="product_img"
                                name="edit_product_img"
                                onChange={this.onChangeEditProductImage}
                                multiple
                              //  required
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("input_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
                              />
                            </div>
                          </div>
                          <div className="col-sm-4">
                            <div className="form-group">
                              <label>{this.props.t("adminVideo")}:</label>
                              <input
                                type="file"
                                className="form-control edit_video"
                                id="video"
                                name="edit_video"
                                onChange={this.onChangeEditVideo}
                              />
                            </div>
                          </div>
                          {this.state.other_edit_show && (
                            <div className="col-sm-8">
                              <div className="form-group">
                                <label>{this.props.t("meetinglink")}</label>
                                <input
                                  type="text"
                                  className="form-control "
                                  placeholder={this.props.t("meetinglink")}
                                  id="youtube_link"
                                  name="edit_youtube_link"
                                  value={this.state.edit_youtube_link}
                                  onChange={this.onChangeEditYoutubeLink}
                                />
                              </div>
                            </div>
                          )}
                        </>
                      ) : (
                        ""
                      )}

                      <div
                        className={
                          this.state.edit_auction_type !== "golivenow"
                            ? "col-sm-12"
                            : "col-sm-8"
                        }
                      >
                        <div className="form-group">
                          <label>{this.props.t("discp")}:<span style={{color:"red"}}> *</span></label>
                          <textarea
                            type="text"
                            className="form-control"
                            placeholder={this.props.t("discp")}
                            id="description"
                            name="edit_description"
                            value={this.state.edit_description}
                            onChange={this.onChangeEditDescription}
                            required
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="m-t-20 text-center">
                      <button className="btn btn-primary" type="submit">
                        {this.props.t("adminUpdate")}
                      </button>
                    </div>
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkUpdateBtn = c;
                      }}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
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

export default connect(mapStateToProps)(withTranslation()(MyAds));
