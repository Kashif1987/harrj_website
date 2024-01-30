import React, { Component } from "react";
import { withTranslation } from "react-i18next";
import { connect } from "react-redux";

import moment from "moment-timezone";

import HeroSlider from "./parts/heroSlider";

import { history } from "../../helpers/history";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { BidderLstById } from "./../../actions/website/Home";

import $ from "jquery";

import "./../../assets/css/bootstrap.min.css";
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/website/css/styles.css";
// import homebanner from './../../assets/website/img/auction.jpg'
import homebanner from "./../../assets/website/img/mybid23_03_22.jpg";

import logo from "./../../assets/website/img/livebid/logo.png";
import { toast } from "react-toastify";
import { ProductDelete } from "../../actions/website/LiveAuction";
class MyBids extends Component {
  constructor(props) {
    super(props);
    this.ListBidFun = this.ListBidFun.bind(this);
    this.state = {
      listBidData: [],
      itemsToShow: 4,
      expanded: false,
      filterArray: [],
      searchString: "",
      loading: true,
    };
    this.showMore = this.showMore.bind(this);
    this.filterArrayfunc = this.filterArrayfunc.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }
  componentDidMount() {
    this.ListBidFun();
  }
  showMore = (e) => {
    e.preventDefault();
    this.state.itemsToShow === 4
      ? this.setState({
        itemsToShow: this.state.filterArray.length,
        normalexpanded: true,
      })
      : this.setState({ itemsToShow: 4, normalexpanded: false });
  };
  ListBidFun = () => {
    let biddata = JSON.parse(localStorage.getItem("userId"));
    const { dispatch, history } = this.props;
    this.setState({
      loading: true,
    });
    if (biddata == null) {
      history.push("/");
    } else {
      const { dispatch, history } = this.props;
      dispatch(BidderLstById(biddata.data[0].id))
        .then((response) => {
          this.setState({
            listBidData: response.data,
            filterArray: response.data,
          });
          this.setState({
            loading: false,
          });
        })
        .catch(() => {
          this.setState({
            listBidData: [],
            filterArray: [],
          });
        });
    }
  };
  onChangeSearch = (e) => {
    let inputVal = e.target.value;
    if (inputVal.length > 0) {
      this.setState({
        searchString: inputVal,
      });
    } else {
      this.setState({
        filterArray: this.state.listBidData,
      });
    }
  };
  onEnterSearch = (e) => {
    if (e.key === "Enter") {
      let searchString = e.target.value;
      let responseData = [];
      if (searchString.length > 0) {
        responseData = this.state.listBidData.filter((val) =>
          val.title.toLowerCase().includes(searchString.toLowerCase())
        );
      } else {
        responseData = this.state.listBidData;
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
      responseData = this.state.listBidData.filter((val) =>
        val.title.toLowerCase().includes(searchString.toLowerCase())
      );
    } else {
      responseData = this.state.listBidData;
    }
    this.setState({
      filterArray: responseData,
    });
  };
  togglePopup(e) {
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
  handleDelete = (id) => {
    const { dispatch, history } = this.props;
    dispatch(ProductDelete(id))
      .then((response) => {
        if (response.success === true) {
          toast.success(localStorage.getItem("lang") === "English" ? response.message : response?.message_arabic, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeonClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.ListBidFun();
        } else {
          toast.error(localStorage.getItem("lang") === "English" ? response.message : response?.message_arabic, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeonClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
  tzFun = (ndate, nformat) => {
    let dateTimeArr = ndate.split(" ");
    let ndateArr = dateTimeArr[0].split("-");
    let ntime = moment(dateTimeArr[1], ["h:mm A"]).format("HH:mm:ss");
    let localtz = moment.tz.guess();
    let tempDate = moment.tz(
      `${ndateArr[2]}-${ndateArr[1]}-${ndateArr[0]} ${ntime}`,
      localtz
    );
    let formatDate = moment(tempDate._d).format(nformat);
    return formatDate;
  };

  render() {
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

        <section className="bose-quiet">
          <div className="container">
            <div className="row">
              <div className="col-md-6 col-sm-6 col-xs-12">
                <div className="bose-heading">
                  <h1>{this.props.t("my_bidss")}</h1>
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
                        .map((itemLiveAuctionList, l) => (
                          <div
                            className="col-md-12 col-sm-12 col-xs-12 bid-list-bose-comfrt"
                            key={l}
                          >
                            <div className="col-md-2 col-sm-2 col-xs-4 bid-list-img">
                              {itemLiveAuctionList.product_img.length > 0 ? (
                                <img
                                  className="live-bid-img"
                                  src={itemLiveAuctionList.product_img}
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
                                {itemLiveAuctionList.title}
                              </span>
                              <div className="mob-push-up">
                                <span className="bid-list-p">
                                  {this.props.t("status")}{" "}:{" "}
                                  {itemLiveAuctionList.bid_status.toLowerCase()=="accepted"?
                                  <>
                                   {this.props.t("Awarded")}
                                  </>
                                  :
                                  <>
                                  {this.props.t(
                                    itemLiveAuctionList.bid_status.toLowerCase()
                                  )}
                                  </>
  }
                                </span>
                              </div>
                              <div className="mob-push-up">
                                <span className="bid-list-p">
                                {this.props.t("Bid_Amount")}{" "}:{" "}
                                {itemLiveAuctionList.bid_amount}
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
                                      {this.tzFun(
                                        itemLiveAuctionList.add_dt,
                                        "DD/MM/YY"
                                      )}
                                    </span>
                                  </li>
                                  <li className="bid-list-li">
                                    <i
                                      className="fa fa-clock-o bid-list-icon"
                                      aria-hidden="true"
                                    ></i>
                                    <span className="bid-list-date">
                                      {this.tzFun(
                                        itemLiveAuctionList.add_dt,
                                        "h:mmA"
                                      )}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-4 bid-list-sec3">
                              {this.state.edit_auction_type === "offline" ?
                                <span className="bid-list-h1">
                                  {this.props.t("Bid_Amount")}:{" "}
                                  {itemLiveAuctionList.bid_amount}
                                </span> : ""}
                            </div>
                            <div className="col-md-2 col-sm-2 col-xs-4 bid-list-sec4">
                              <ul className="bid-list-event">
                                <li>
                                  <a
                                    href="#"
                                    onClick={(e) => {
                                      this.handleDelete(
                                        itemLiveAuctionList.product_id
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
                          <div className="see-more my-bid-see">
                            <a href="#" onClick={this.showMore}>
                              {this.state.normalexpanded ? (
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
export default connect(mapStateToProps)(withTranslation()(MyBids));
