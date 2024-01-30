import React, { Component } from "react";
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

import moment from "moment-timezone";

import HeroSlider from "./parts/heroSlider";
import AdBox from "./parts/adBox";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
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

import { BannerList } from "./../../actions/website/Home";

import Sidefilter from "./SideFilter";
import homebanner from "./../../assets/website/img/liveauc23_03_22.jpg";

toast.configure();

class LiveAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      live_auction: "online",
      itemsToShow: 4,
      listLiveAuctionData: [],
      filterArray: [],
      normalexpanded: false,
      loading: true,
      searchString: "",
    };

    this.onChangeSearch = this.onChangeSearch.bind(this);
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {}

  togglePopup(e) {
    e.preventDefault();
    var lang;
    lang = localStorage.getItem("userId");
    console.log("value of lang is");
    console.log(lang);
    if (lang != null) {
      let path = `/createads`;
      //history.push(path);
      this.props.history.push(path);
    } else {
      $("#popuplogin").modal("show");
    }
  }
  showMore = () => {
    this.state.itemsToShow === 4
      ? this.setState({
          itemsToShow: this.state.listLiveAuctionData.length,
          normalexpanded: true,
        })
      : this.setState({ itemsToShow: 4, normalexpanded: false });
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

  ListLiveAuctionFilter = (data) => {
    this.setState({
      listLiveAuctionData: data,
      filterArray: data,
    });
  };

  ListLiveAuctionFilterLoader = (loader) => {
    this.setState({
      loading: loader,
    });
  };

  tzFun = (ndate, ntime, nformat) => {
    let localtz = moment.tz.guess();
    let tempDate = moment.tz(`${ndate} ${ntime}`, localtz);
    let formatDate = moment(tempDate._d).format(nformat);
    return formatDate;
  };

  onChangeSearch = (e) => {
    let inputVal = e.target.value;
    if (inputVal.length > 0) {
      this.setState({
        searchString: inputVal,
      });
    } else {
      this.setState({
        filterArray: this.state.listLiveAuctionData,
      });
    }
  };
  onEnterSearch = (e) => {
    if (e.key === "Enter") {
      let searchString = e.target.value;
      let responseData = [];
      if (searchString.length > 0) {
        responseData = this.state.listLiveAuctionData.filter((val) =>
          val.title.toLowerCase().includes(searchString.toLowerCase())
        );
      } else {
        responseData = this.state.listLiveAuctionData;
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
      responseData = this.state.listLiveAuctionData.filter((val) =>
        val.title.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      responseData = this.state.listLiveAuctionData;
    }
    this.setState({
      filterArray: responseData,
    });
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

        <section className="live-bid live-bid-page normal-ads pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="heading">
                  <h2>{this.props.t("live_bid")}</h2>
                  <div className="bar"></div>
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
              <div className="col-md-3">
                <div className="sidebar-navigation">
                  <Sidefilter
                    auctiontype={"online"}
                    liveads={this.ListLiveAuctionFilter}
                    loadeads={this.ListLiveAuctionFilterLoader}
                  />
                </div>
              </div>
              {this.state.loading ? (
                <div className="col-md-9">
                  <div className="auction-loader">
                    <div className="loader"></div>
                  </div>
                </div>
              ) : (
                <div className="col-md-9">
                  {this.state.filterArray &&
                  typeof this.state.filterArray !== "undefined" &&
                  this.state.filterArray.length > 0 ? (
                    <>
                      <div className="row ">
                        {this.state.filterArray
                          .slice(0, this.state.itemsToShow)
                          .map((itemLiveAuctionList, l) => (
                            <div
                            onClick={()=>{if (localStorage.getItem("userId")==null) {
                              $("#popuplogin").modal("show")
                            }}}
                              className="col-lg-3 col-md-4 col-sm-6 col-xs-12 lbc-outer"
                              key={l}
                            >
                              <AdBox
                               link={localStorage.getItem("userId")==null ? "":`/product/info/${itemLiveAuctionList.product_id}`}
                                // link={`/product/info/${itemLiveAuctionList.product_id}`}
                                image={itemLiveAuctionList.product_img}
                                liveLable={true}
                                bidCount={itemLiveAuctionList.bidCount}
                                title={itemLiveAuctionList.title}
                                brandLabel={this.props.t("adminBrand")}
                                brand_name={itemLiveAuctionList.brand_name}
                                priceLabel={this.props.t("price")}
                                price={itemLiveAuctionList.starting_price}
                                auction_type={itemLiveAuctionList.auction_type}
                                date={`${this.tzFun(
                                  itemLiveAuctionList.start_date_time,
                                  itemLiveAuctionList.start_time,
                                  "DD/MM/YY"
                                )} - ${this.tzFun(
                                  itemLiveAuctionList.start_date_time,
                                  itemLiveAuctionList.start_time,
                                  "DD/MM/YY"
                                )}`}
                                time={`${this.tzFun(
                                  itemLiveAuctionList.start_date_time,
                                  itemLiveAuctionList.start_time,
                                  "h:mmA"
                                )} - ${this.tzFun(
                                  itemLiveAuctionList.end_date_time,
                                  itemLiveAuctionList.end_time,
                                  "h:mmA"
                                )}`}
                                location={`${itemLiveAuctionList.city_name} - ${itemLiveAuctionList.country_name}`}
                              />
                            </div>
                          ))}
                      </div>
                      {this.state.filterArray &&
                      typeof this.state.filterArray !== "undefined" &&
                      this.state.filterArray.length > 4 ? (
                        <div className="row">
                          <div className="col-md-12">
                            <div className="see-more">
                              <a onClick={this.showMore}>
                                {this.state.normalexpanded ? (
                                  <span>{this.props.t("showless")}</span>
                                ) : (
                                  <span>{this.props.t("showmore")}</span>
                                )}
                              </a>
                              <div className="bar2"></div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                    </>
                  ) : (
                    <div className="NoAuctionData">{this.props.t("nad")}</div>
                  )}
                </div>
              )}
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

export default connect(mapStateToProps)(withTranslation()(LiveAuction));
