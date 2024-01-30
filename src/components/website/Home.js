import React, { Component } from "react";
import { Link } from "react-router-dom";
import moment from "moment-timezone";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

import $ from "jquery";

import "./../../assets/css/bootstrap.min.css";

// Category slider
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import HeroSlider from "./parts/heroSlider";
import AdBox from "./parts/adBox";
import {
  CategoryList,
  ProductList,
  BannerList,
} from "./../../actions/website/Home";

import { withTranslation } from "react-i18next";
import homebanner from "./../../assets/website/img/auction23_03_22.jpg";

import "./../../assets/website/css/sliderstyle.css";

toast.configure();
var LiveAuction = "golivenow";
var NormalAuction = "offline";
var ScheduleAuction = "online";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategoryData: [],
      listLiveAuctionData: [],
      listNormalAuctionData: [],
      listScheduleAuctionData: [],
      listBannerData: [],
      data: [],
      itemsToShow: 4,
      expanded: false,
      normalToShow: 4,
      normalexpanded: false,
      showPopup: false,
      loading: true,
      liveAuctionDataShow: 4,
      normalAuctionDataShow: 4,
      schAuctionDataShow: 4,
      
    };
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    this.ListCategoryFun();
    this.ListLiveAuctionFun();
    this.ListNormalAuctionFun();
    this.ListScheduleAuctionFun();
    this.ListBannerFun();
  }

  tzFun = (ndate, ntime, nformat) => {
    let localtz = moment.tz.guess();
    let tempDate = moment.tz(`${ndate} ${ntime}`, localtz);
    let formatDate = moment(tempDate._i).format(nformat);
    return formatDate;
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
    const { dispatch, history } = this.props;
    this.setState({
      loading: true,
    });
    dispatch(ProductList(LiveAuction))
      .then((response) => {
        this.setState({
          listLiveAuctionData: response.data,
        });
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          listLiveAuctionData: [],
        });
      });
  };

  ListScheduleAuctionFun = () => {
    const { dispatch, history } = this.props;
    this.setState({
      loading: true,
    });
    dispatch(ProductList(ScheduleAuction))
      .then((response) => {
        this.setState({
          listScheduleAuctionData: response.data,
        });
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          listScheduleAuctionData: [],
        });
      });
  };

  togglePopup(e) {
    e.preventDefault();

    var lang;
    lang = localStorage.getItem("userId");
    // console.log("value of lang is")
    // console.log(lang)
    if (lang != null) {
      let path = `/createads`;
      //history.push(path);
      this.props.history.push(path);
    } else {
      $("#popuplogin").modal("show");
    }
  }

  ListNormalAuctionFun = () => {
    const { dispatch, history } = this.props;
    this.setState({
      loading: true,
    });
    dispatch(ProductList(NormalAuction))
      .then((response) => {
        this.setState({
          listNormalAuctionData: response.data,
        });
        this.setState({
          loading: false,
        });
      })
      .catch(() => {
        this.setState({
          listNormalAuctionData: [],
        });
      });
  };

  showMoreAds(e, adtype) {
    e.preventDefault();
    if (adtype === "live") {
      this.setState({
        liveAuctionDataShow: this.state.listLiveAuctionData.length,
      });
    } else if (adtype === "normal") {
      this.setState({
        normalAuctionDataShow: this.state.listNormalAuctionData.length,
      });
    } else if (adtype === "schedule") {
      this.setState({
        schAuctionDataShow: this.state.listScheduleAuctionData.length,
      });
    }
  }

  showLessAds(e, adtype) {
    e.preventDefault();
    if (adtype === "live") {
      this.setState({
        liveAuctionDataShow: 4,
      });
    } else if (adtype === "normal") {
      this.setState({
        normalAuctionDataShow: 4,
      });
    } else if (adtype === "schedule") {
      this.setState({
        schAuctionDataShow: 4,
      });
    }
  }

  render() {
    // var categorySlider = {
    //   infinite: true,
    //   dots: false,
    //   autoplay: true,
    //   autoplaySpeed: 1000,
    //   slidesToShow: 4,
    //   slidesToScroll: 1,
    //   arrows: false,
    //   responsive: [
    //     {
    //       breakpoint: 1024,
    //       settings: {
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         infinite: true,
    //       },
    //     },
    //     {
    //       breakpoint: 600,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //       },
    //     },
    //     {
    //       breakpoint: 480,
    //       settings: {
    //         slidesToShow: 2,
    //         slidesToScroll: 1,
    //         arrows: false,
    //       },
    //     },
    //   ],
    // };

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

        {/* <section className="Categories">
						<div className="container">
							<div className="row">
								<div className="col-md-12">
									<div className="heading">
										<h2>{this.props.t('Categories')}</h2>
										<div className="bar"></div>
									</div>
								</div>
								{this.state.loading ? (
									"loading..."
								) : (
									<div className="col-md-12">
										<div className="partners-slider slick-logo-slider mt-2 pt-2">
											<Slider {...categorySlider}>
												{this.state.listCategoryData && typeof this.state.listCategoryData !== "undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemCategoryList, indx) => {
													return (
														<div className="our-categories"> 
															<a href="#">
																<img src={itemCategoryList.category_img} style={{ "background-size": "auto" }} alt="" />
																<h2>{itemCategoryList.category_name}</h2>
															</a>
														</div>
													);
												})}
											</Slider>
										</div>
									</div>
								)}
							</div>
						</div> 
					</section> */}

        <section className="live-bid pt-5">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading">
                  <h2>{this.props.t("liv_Bid")}</h2>
                  <div className="bar"></div>
                </div>
              </div>

              <>
                {this.state.loading ? (
                  <div className="col-md-12">
                    <div className="auction-loader">
                      <div className="loader"></div>
                    </div>
                  </div>
                ) : (
                  <>
                    {this.state.listLiveAuctionData.length == 0 &&
                    <> <div className="NoAuctionData">{this.props.t("nad")}</div>
                    </>}
                    {this.state.listLiveAuctionData &&
                    typeof this.state.listLiveAuctionData !== "undefined" &&
                    this.state.listLiveAuctionData.length > 0
                      ? this.state.listLiveAuctionData
                          .slice(0, this.state.liveAuctionDataShow)
                          .map((itemLiveAuctionList, l) => (
                            <div onClick={()=>{if (localStorage.getItem("userId")==null) {
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
                          ))
                      : ""}
                  </>
                )}
              </>
              {!this.state.loading ? (
                this.state.listLiveAuctionData &&
                typeof this.state.listLiveAuctionData !== "undefined" &&
                this.state.listLiveAuctionData.length > 4 ? (
                  <div className="col-md-12">
                    <div className="see-more">
                      {this.state.liveAuctionDataShow > 4 ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            this.showLessAds(e, "live");
                          }}
                        >
                          <span>{this.props.t("showless")}</span>
                        </a>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            this.showMoreAds(e, "live");
                          }}
                        >
                          <span>{this.props.t("showmore")}</span>
                        </a>
                      )}
                      <div className="bar2"></div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </section>

        <section className="live-bid">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading">
                  <h2>{this.props.t("sch_auc")}</h2>
                  <div className="bar"></div>
                </div>
              </div>
              <>
                {this.state.loading ? (
                  <div className="col-md-12">
                    <div className="auction-loader">
                      <div className="loader"></div>
                    </div>
                  </div>
                ) : (
                  <>
                   {this.state.listScheduleAuctionData.length == 0 &&
                    <> <div className="NoAuctionData">{this.props.t("nad")}</div>
                    </>}
                    {this.state.listScheduleAuctionData &&
                    typeof this.state.listScheduleAuctionData !== "undefined" &&
                    this.state.listScheduleAuctionData.length > 0
                      ? this.state.listScheduleAuctionData
                          .slice(0, this.state.schAuctionDataShow)
                          .map((itemLiveAuctionList, l) => (
                            <div onClick={()=>{if (localStorage.getItem("userId")==null) {
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
                                auction_type={itemLiveAuctionList.auction_type}
                                price={itemLiveAuctionList.starting_price}
                                date={`${this.tzFun(
                                  itemLiveAuctionList.start_date_time,
                                  itemLiveAuctionList.start_time,
                                  "DD/MM/YY"
                                )} - ${this.tzFun(
                                  itemLiveAuctionList.end_date_time,
                                  itemLiveAuctionList.end_time,
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
                          ))
                      : ""}
                  </>
                )}
              </>
              {!this.state.loading ? (
                this.state.listScheduleAuctionData &&
                typeof this.state.listScheduleAuctionData !== "undefined" &&
                this.state.listScheduleAuctionData.length > 4 ? (
                  <div className="col-md-12">
                    <div className="see-more">
                      {this.state.schAuctionDataShow > 4 ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            this.showLessAds(e, "schedule");
                          }}
                        >
                          <span>{this.props.t("showless")}</span>
                        </a>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            this.showMoreAds(e, "schedule");
                          }}
                        >
                          <span>{this.props.t("showmore")}</span>
                        </a>
                      )}
                      <div className="bar2"></div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
              )}
            </div>
          </div>
        </section>

        <section className="live-bid">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="heading">
                  <h2>{this.props.t("normalBid")}</h2>
                  <div className="bar"></div>
                </div>
              </div>
              <>
                {this.state.loading ? (
                  <div className="col-md-12">
                    <div className="auction-loader">
                      <div className="loader"></div>
                    </div>
                  </div>
                ) : (
                  <>
                   {this.state.listNormalAuctionData.length == 0 &&
                    <> <div className="NoAuctionData">{this.props.t("nad")}</div>
                    </>}
                    {this.state.listNormalAuctionData &&
                    typeof this.state.listNormalAuctionData !== "undefined" &&
                    this.state.listNormalAuctionData.length > 0
                      ? this.state.listNormalAuctionData
                          .slice(0, this.state.normalAuctionDataShow)
                          .map((itemNormalAuctionList, l) => (
                            <div
                            onClick={()=>{if (localStorage.getItem("userId")==null) {
                              $("#popuplogin").modal("show")
                            }}}
                              className="col-lg-3 col-md-4 col-sm-6 col-xs-12 lbc-outer"
                              key={l}
                            >
                              <AdBox
                                // link={ $("#popuplogin").modal("show")}
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
                          ))
                      : ""}
                  </>
                )}
              </>
              {!this.state.loading ? (
                this.state.listNormalAuctionData &&
                typeof this.state.listNormalAuctionData !== "undefined" &&
                this.state.listNormalAuctionData.length > 4 ? (
                  <div className="col-md-12">
                    <div className="see-more">
                      {this.state.normalAuctionDataShow > 4 ? (
                        <a
                          href="#"
                          onClick={(e) => {
                            this.showLessAds(e, "normal");
                          }}
                        >
                          <span>{this.props.t("showless")}</span>
                        </a>
                      ) : (
                        <a
                          href="#"
                          onClick={(e) => {
                            this.showMoreAds(e, "normal");
                          }}
                        >
                          <span>{this.props.t("showmore")}</span>
                        </a>
                      )}
                      <div className="bar2"></div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              ) : (
                ""
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

export default connect(mapStateToProps)(withTranslation()(Home));
