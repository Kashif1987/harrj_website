import React, { Component } from "react";
import {
  Redirect,
  Router,
  Switch,
  Route,
  Link,
  NavLink,
} from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import $ from "jquery";
import jQuery from "jquery";
import Popper from "popper.js";

import "./../../assets/css/bootstrap.min.css";
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/website/css/styles.css";
//import "./../../assets/css/style.css"
//import "./../../assets/css/custom.css"
//import "./../../App.css";
import Slider from "@material-ui/lab/Slider";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withTranslation } from "react-i18next";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminLogin } from "./../../actions/auth";

import {
  CategoryList,
  SubCategoryList,
  CountryList,
  CountryCityList,
  ProductList,
  BannerList,
  BrandList,
  SubCategoryAllList,
  BrandAllList,
  ModelAllList,
} from "./../../actions/website/Home";
import { LiveListFilter } from "./../../actions/website/LiveAuction";

import Header from "./Header";
import Footer from "./Footer";

import banner3 from "./../../assets/website/img/livebid/banner-3.png";
import bannerbg from "./../../assets/website/img/livebid/banner-bg.png";
import boss from "./../../assets/website/img/livebid/boss.png";
import live from "./../../assets/website/img/livebid/live.png";
import order from "./../../assets/website/img/livebid/order.png";
import dateImg from "./../../assets/website/img/livebid/date.png";
import homebanner from "./../../assets/website/img/homebanner.jpg";
import loc from "./../../assets/website/img/livebid/loc.png";
import clock from "./../../assets/website/img/livebid/clock.png";
import banner1 from "./../../assets/website/img/livebid//banner-1.png";

import coverImg from "./../../assets/website/img/co.jpg";

import footballImg from "./../../assets/website/img/football.png";

// const Slider = require('react-slick');
// import Slider from "react-slick";
import { FrownOpenIcon } from "react-line-awesome";
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

toast.configure();

class SideFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listBannerData: [],
      listCategoryData: [],
      listSubCategoryData: [],
      listBrandData: [],
      listModelData: [],
      FilterListSubCat: [],
      FilterListBrand: [],
      FilterListModel: [],
      listCountryData: [],
      listcityData: [],
      listLiveAuctionData: [],

      category_id: [],
      sub_category_id: [],
      brand_id: [],
      model_id: [],
      country_id: [],
      city_id: [],
      year: [],
      live_auction: "online",
      sort_by: "",
      activeCollapse: "",
      subcatactiveCollapse: false,
      selected: false,
      pricevalue: 0,
      showPopup: false,
    };

    this.myDivToFocus = React.createRef();
  }

  componentDidMount() {
    this.ListCategoryFun();
    this.ListSubCategoryFun();
    this.ListBrandFun();
    this.ListModelFun();
    this.ListCountryFun();
    this.ListLiveAuctionFun();
    this.ListBannerFun();
  }

  handleChange = (event) => {
    this.setState({ selected: event.target.name });
    let cat_id = parseInt(event.target.name);
    if (event.target.checked) {
      this.setState(
        {
          category_id: [...this.state.category_id, cat_id],
        },
        () => {
          this.FilterSubCatListFunc();
          this.FilterBrandFunc();
          this.ListLiveAuctionFun();
        }
      );
    } else {
      var array = [...this.state.category_id];
      var index = array.indexOf(cat_id);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ sub_category_id: [] });
        this.setState({ brand_id: [] });
        this.setState({ category_id: array }, () => {
          this.FilterSubCatListFunc();
          this.ListLiveAuctionFun();
        });
      }
    }
  };

  handlePriceChange = (event, value) => {
    this.setState({ pricevalue: value });
    this.ListLiveAuctionFun();
  };

  onChangeBrand = (event) => {
    this.setState({ selected: event.target.name });
    let brandid = parseInt(event.target.name);

    if (event.target.checked) {
      this.setState(
        {
          brand_id: [...this.state.brand_id, brandid],
        },
        () => {
          this.ListModelFun();
          this.ListLiveAuctionFun();
        }
      );
    } else {
      var array = [...this.state.brand_id];
      var index = array.indexOf(brandid);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ model_id: [] });
        this.setState({ brand_id: array }, () => {
          this.ListModelFun();
          this.ListLiveAuctionFun();
        });
      }
    }
  };

  onChangeSubCategory = (event) => {
    this.setState({ selected: event.target.name });
    let subcatid = parseInt(event.target.name);
    if (event.target.checked) {
      this.setState(
        {
          sub_category_id: [...this.state.sub_category_id, subcatid],
        },
        () => {
          this.FilterBrandFunc();
          this.ListLiveAuctionFun();
        }
      );
    } else {
      var array = [...this.state.sub_category_id];
      var index = array.indexOf(subcatid);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ brand_id: [] });
        this.setState({ sub_category_id: array }, () => {
          this.FilterBrandFunc();
          this.ListLiveAuctionFun();
        });
      }
    }
  };

  onChangeModel = (event) => {
    this.setState({ selected: event.target.name });

    if (event.target.checked) {
      this.setState(
        {
          model_id: [...this.state.model_id, event.target.name],
        },
        () => {
          this.ListLiveAuctionFun();
        }
      );
    } else {
      var array = [...this.state.model_id]; // make a separate copy of the array
      var index = array.indexOf(event.target.name);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ model_id: array }, () => {
          this.ListLiveAuctionFun();
        });
      }
    }
  };

  onChangeCountry = (event) => {
    this.setState({ selected: event.target.name });

    if (event.target.checked) {
      this.setState(
        {
          country_id: [...this.state.country_id, event.target.name],
        },
        () => {
          this.ListCityFun();
          this.ListLiveAuctionFun();
        }
      );
    } else {
      var array = [...this.state.country_id]; // make a separate copy of the array
      var index = array.indexOf(event.target.name);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ country_id: array }, () => {
        this.ListCityFun();
        //this.FilterBrandFunc();
          this.ListLiveAuctionFun();
        });
      }
    }
  };
  onChangeCity = (event) => {
    this.setState({ selected: event.target.name });

    if (event.target.checked) {
      this.setState(
        {
          city_id: [...this.state.city_id, event.target.name],
        },
        () => {
          this.ListLiveAuctionFun();
        }
      );
    } else {
      var array = [...this.state.city_id]; // make a separate copy of the array
      var index = array.indexOf(event.target.name);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({ city_id: array }, () => {
          this.ListLiveAuctionFun();
        });
      }
    }
  };
  onChangeSortBy = (e) => {
    this.setState({
      sort_by: e.target.value,
    });
    this.ListLiveAuctionFun();
  };
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup,
    });
  }
  handleExpandCollaps = (e) => {
    e.preventDefault();

    if (e.target) {
      if (e.target.nextSibling.classList.contains("open")) {
        e.target.nextSibling.classList.remove("open");
      } else {
        let nav = document.querySelectorAll(
          ".sidebar-navigation > ul > li > a"
        );
        nav.forEach(function (item) {
          item.nextSibling.classList.remove("open");
        });
        e.target.nextSibling.classList.add("open");
      }
    }
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
  ListCityFun = () => {
    const { dispatch, history } = this.props;
    dispatch(CountryCityList(this.state.country_id))
      .then((response) => {
        this.setState({
          listcityData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listcityData: [],
        });
      });
  };
  ListSubCategoryFun = () => {
    const { dispatch, history } = this.props;
    dispatch(SubCategoryAllList())
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data,
          FilterListSubCat: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: [],
          FilterListSubCat: [],
        });
      });
  };

  ListBrandFun = () => {
    const { dispatch, history } = this.props;
    dispatch(BrandAllList(this.state.sub_category_id))
      .then((response) => {
        this.setState(
          {
            listBrandData: response.data,
            FilterListBrand: [],
          },
          () => {
            // // console.log("all  var")
            // // console.log(this.state.FilterListBrand)
          }
        );
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listBrandData: [],
          FilterListBrand: [],
        });
      });
  };
  ListModelFun = () => {
    const { dispatch, history } = this.props;
    dispatch(ModelAllList())
      .then((response) => {
        this.setState({
          listModelData: response.data,
          FilterListModel: response.data,
        });
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listModelData: [],
          FilterListModel: [],
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
        // this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listCategoryData: [],
        });
      });
  };
  FilterSubCatListFunc = () => {
    if (this.state.category_id.length > 0) {
      let filteredArray = this.state.listSubCategoryData.filter((item) =>
        this.state.category_id.includes(item.category_id)
      );
      this.setState({ FilterListSubCat: filteredArray });
    } else {
      this.setState({ FilterListSubCat: [] });
    }
  };
  FilterBrandFunc = () => {
    let filteredCatArray = [];
    if (
      this.state.sub_category_id.length > 0 &&
      this.state.category_id.length > 0
    ) {
      let catlist = [];
      let filteredsubArray = [];
      let filterallArray = [];
      filteredsubArray = this.state.listBrandData.filter((item) =>
        this.state.sub_category_id.includes(item.sub_category_id)
      );
      catlist = filteredsubArray.map((item) => {
        return item.category_id;
      });
      filterallArray = this.state.listBrandData.filter((item) =>
        this.state.category_id.includes(item.category_id)
      );

      let updatedItemList = filterallArray.filter((item) => {
        if (catlist.includes(item.category_id)) {
          if (this.state.sub_category_id.includes(item.sub_category_id)) {
            return item;
          } else {
          }
        } else {
          return item;
        }
      });
      filteredCatArray = updatedItemList;
    } else if (
      this.state.sub_category_id.length > 0 &&
      this.state.category_id.length === 0
    ) {
      filteredCatArray = this.state.listBrandData.filter((item) =>
        this.state.sub_category_id.includes(item.sub_category_id)
      );
    } else if (
      this.state.category_id.length > 0 &&
      this.state.sub_category_id.length === 0
    ) {
      filteredCatArray = this.state.listBrandData.filter((item) =>
        this.state.category_id.includes(item.category_id)
      );
    }
    this.setState({ FilterListBrand: filteredCatArray }, () => { });
  };
 
  ListBannerFun = () => {
    const { dispatch, history } = this.props;
    dispatch(BannerList())
      .then((response) => {
        this.setState({
          listBannerData: response.data,
        });
      })
      .catch(() => {
        this.setState({
          listBannerData: [],
          FilterListBrand: [],
        });
      });
  };

  ListLiveAuctionFun = () => {
    const { dispatch, history } = this.props;
    this.props.loadeads(true);
    dispatch(
      LiveListFilter(
        this.props.auctiontype,
        this.state.category_id,
        this.state.sub_category_id,
        this.state.brand_id,
        this.state.model_id,
        this.state.pricevalue,
        this.state.year,
        this.state.country_id,
        this.state.city_id,
        this.state.sort_by
      )
    )
      .then((response) => {
        this.setState({ listLiveAuctionData: response.data }, () => {
          this.props.liveads(response.data);
        });
        this.props.loadeads(false);
      })
      .catch(() => {
        this.setState({
          listLiveAuctionData: [],
        });
      });
  };

  render() {
    const { isLoggedIn, message } = this.props;
    var bannersettings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 3,
    };

    return (
      <React.Fragment>
        <ul>
          <li>
            <a href="#" onClick={this.handleExpandCollaps}>
              {this.props.t("Categories")}{" "}
              <i className="fa fa-chevron-down"></i>
            </a>
            <ul>
              {this.state.listCategoryData &&
                (typeof this.state.listCategoryData !== "undefined") &
                (this.state.listCategoryData.length > 0) ? (
                this.state.listCategoryData.map((itemTaskList, m) => (
                  <li key={m}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`${itemTaskList.category_id}`}
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          onChange={this.handleChange}
                        />
                      }
                      label={
                        this.props.i18n.language === "en"
                          ? itemTaskList.category_name
                          : itemTaskList.category_name_arabic
                      }
                    />
                  </li>
                ))
              ) : (
                <li className="snodata">No Category Available </li>
              )}
            </ul>
          </li>
          {this.state.category_id.length > 0 ? (
            <>
              <li>
                <a
                  href="#"
                  onClick={
                    this.state.category_id.length > 0
                      ? this.handleExpandCollaps
                      : ""
                  }
                >
                  {this.props.t("sub_cat")}{" "}
                  <i className="fa fa-chevron-down"></i>
                </a>

                <ul className="sub_cat">
                  {this.state.FilterListSubCat &&
                    (typeof this.state.FilterListSubCat !== "undefined") &
                    (this.state.FilterListSubCat.length > 0) ? (
                    this.state.FilterListSubCat.map((itemTaskList, m) => (
                      <li key={m}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`${itemTaskList.sub_category_id}`}
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              onChange={this.onChangeSubCategory}
                            />
                          }
                          label={
                            this.props.i18n.language === "en"
                              ? itemTaskList.sub_category_name
                              : itemTaskList.sub_category_name_arabic
                          }
                        />
                      </li>
                    ))
                  ) : (
                    <li className="snodata">No Sub Category Available </li>
                  )}
                </ul>
              </li>
              <li>
                <a
                  href="#"
                  onClick={
                    this.state.category_id.length > 0
                      ? this.handleExpandCollaps
                      : ""
                  }
                >
                  {this.props.t("ALL")} {this.props.t("BRANDS")}{" "}
                  <i className="fa fa-chevron-down"></i>
                </a>
                <ul className="BRANDS">
                  {this.state.FilterListBrand &&
                    (typeof this.state.FilterListBrand !== "undefined") &
                    (this.state.FilterListBrand.length > 0) ? (
                    this.state.FilterListBrand.map((itemTaskList, m) => (
                      <li key={m}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              name={`${itemTaskList.brand_id}`}
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              onChange={this.onChangeBrand}
                            />
                          }
                          label={
                            this.props.i18n.language === "en"
                              ? itemTaskList.brand_name
                              : itemTaskList.brand_name_arabic
                          }
                        />
                      </li>
                    ))
                  ) : (
                    <li className="snodata">No Brand Available </li>
                  )}
                </ul>
              </li>
            </>
          ) : (
            ""
          )}
          {this.state.brand_id.length > 0 ? (
            <li>
              <a
                href="#"
                onClick={
                  this.state.brand_id.length > 0 ? this.handleExpandCollaps : ""
                }
              >
                {this.props.t("ALL")} {this.props.t("MODELS")}{" "}
                <i className="fa fa-chevron-down"></i>
              </a>
              <ul>
                {this.state.FilterListModel &&
                  (typeof this.state.FilterListModel !== "undefined") &
                  (this.state.FilterListModel.length > 0) ? (
                  this.state.FilterListModel.map((itemTaskList, m) => (
                    <li key={m}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`${itemTaskList.model_id}`}
                            icon={icon}
                            checkedIcon={checkedIcon}
                            style={{ marginRight: 8 }}
                            onChange={this.onChangeModel}
                          />
                        }
                        label={
                          this.props.i18n.language === "en"
                            ? itemTaskList.model_name
                            : itemTaskList.model_name_arabic
                        }
                      />
                    </li>
                  ))
                ) : (
                  <li className="snodata">No Model Available </li>
                )}
              </ul>
            </li>
          ) : (
            ""
          )}
          <li>
            <a href="#" onClick={this.handleExpandCollaps}>
              {this.props.t("PRICE_RANGE")}{" "}
              <i className="fa fa-chevron-down"></i>
            </a>
            <ul>
              <li className="p-3 pt-4">
                <Slider
                  onChange={this.handlePriceChange}
                  min={100}
                  max={100000}
                  step={50}
                  defaultValue={0}
                  value={this.state.pricevalue}
                />
                <span className="rangeNum">{this.state.pricevalue}</span>
              </li>
            </ul>
          </li>

          <li>
            <a href="#" onClick={this.handleExpandCollaps}>
              {this.props.t("COUNTRY")} <i className="fa fa-chevron-down"></i>
            </a>

            <ul>
              {this.state.listCountryData &&
                (typeof this.state.listCountryData !== "undefined") &
                (this.state.listCountryData.length > 0) ? (
                this.state.listCountryData.map((itemTaskList, m) => (
                  <li key={m}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`${itemTaskList.country_id}`}
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          onChange={this.onChangeCountry}
                        />
                      }
                      label={
                        this.props.i18n.language === "en"
                          ? itemTaskList.country_name
                          : itemTaskList.country_name_arabic
                      }
                    />
                  </li>
                ))
              ) : (
                <li className="snodata">No Country Available </li>
              )}
            </ul>
          </li>
          <li>
            <a href="#" onClick={this.handleExpandCollaps}>
              {this.props.t("CITY")} <i className="fa fa-chevron-down"></i>
            </a>
            <ul>
              {this.state.listcityData &&
                (typeof this.state.listcityData !== "undefined") &
                (this.state.listcityData.length > 0) ? (
                this.state.listcityData.map((itemTaskList, m) => (
                  <li key={m}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name={`${itemTaskList.city_id}`}
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          onChange={this.onChangeCity}
                        />
                      }
                      label={
                        this.props.i18n.language === "en"
                          ? itemTaskList.city_name
                          : itemTaskList.city_name_arabic
                      }
                    />
                  </li>
                ))
              ) : (
                <li className="snodata">{this.props.t('NoCityAvailable')}</li>
              )}
            </ul>
          </li>
        </ul>
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

export default connect(mapStateToProps)(withTranslation()(SideFilter));