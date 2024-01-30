import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";
import moment from "moment-timezone";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

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
import Sidefilter from "./SideFilter";

import offlinebid from "./../../assets/website/img/normalbid23_03_22.jpg";

toast.configure();

class NormalAuction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategoryData: [],
      listSubCategoryData: [],
      listNormalAuctionData: [],
      listBannerData: [],
      category_id: [],
      sub_category_id: [],
      listBrandData: [],
      listYearData: [],
      year: [],
      normal_auction: "offline",
      activeCollapse: "",
      sort_by: "",
      showPopup: false,
      normalToShow: 4,
      normalexpanded: false,
      loading: true,
      filterArray: [],
      searchString: "",
    };
    this.onChangeSearch = this.onChangeSearch.bind(this);
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  togglePopup(e) {
    e.preventDefault();
    var lang;
    lang = localStorage.getItem("userId");
    if (lang != null) {
      let path = `/createads`;
      this.props.history.push(path);
    } else {
      $("#popuplogin").modal("show");
    }
  }
  ListNormalAuctionFun = (data) => {
    this.setState({
      listNormalAuctionData: data,
      filterArray: data,
    });
  };
  showMore = () => {
    this.state.normalToShow === 4
      ? this.setState({
          normalToShow: this.state.listNormalAuctionData.length,
          normalexpanded: true,
        })
      : this.setState({ normalToShow: 4, normalexpanded: false });
  };

  ListNormalAuctionFilterLoader = (loader) => {
    this.setState({
      loading: loader,
    });
  };

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

  render() {
    const { isLoggedIn, message } = this.props;

    const slider = [
      {
        banner: offlinebid,
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
        <section className="live-bid live-bid-page normal-ads  pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="heading">
                  <h2>{this.props.t("normal_bid")}</h2>
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
                    auctiontype={"offline"}
                    liveads={this.ListNormalAuctionFun}
                    loadeads={this.ListNormalAuctionFilterLoader}
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
                      <div className="row">
                        {this.state.filterArray
                          .slice(0, this.state.normalToShow)
                          .map((itemNormalAuctionList, l) => (
                            <div
                            onClick={()=>{if (localStorage.getItem("userId")==null) {
                              $("#popuplogin").modal("show")
                            }}}
                              className="col-lg-3 col-md-4 col-sm-6 col-xs-12 lbc-outer"
                              key={l}
                            >
                              <AdBox
                                link={localStorage.getItem("userId")==null ? "":`/product/info/${itemNormalAuctionList.product_id}`}
                                // link={`/product/info/${itemNormalAuctionList.product_id}`}
                                image={itemNormalAuctionList.product_img}
                                liveLable={false}
                                bidCount={itemNormalAuctionList.bidCount}
                                title={itemNormalAuctionList.title}
                                brandLabel={this.props.t("adminBrand")}
                                brand_name={itemNormalAuctionList.brand_name}
                                auction_type={
                                  itemNormalAuctionList.auction_type
                                }
                                priceLabel={this.props.t("price")}
                                price={
                                  itemNormalAuctionList.max_bid_amount || 0
                                }
                                date={`${moment(
                                  itemNormalAuctionList.start_date_time
                                ).format("DD/MM/YY")}`}
                                location={`${itemNormalAuctionList.city_name} - ${itemNormalAuctionList.country_name}`}
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

export default connect(mapStateToProps)(withTranslation()(NormalAuction));
