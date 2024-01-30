import React, { Component } from "react";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

import moment from "moment-timezone";

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

import { withTranslation } from "react-i18next";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import logo from "../../assets/website/img/livebid/logo.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ProductInfo,
  BidProduct,
  BidComment,
  LiveLogin,
} from "./../../actions/website/ProductInfo";

import HeroSlider from "./parts/heroSlider";
import Reviews from "./parts/reviews";

import coverImg from "./../../assets/website/img/co.jpg";

toast.configure();
var LiveAuction = "online";
var NormalAuction = "offline";
var product_id = 0;

class ProductDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ProductData: [],
      product_id: 0,
      bid_amount: "",
      comment: "",
      product_first_img: "",
      prod_img_list: [],
      video: "",
      loading: false,
      register_mob: 0,
      nav1: null,
      nav2: null,
      user_id: "",
      insertId: "",
      showZoomBtn: false,
    
    };

    product_id = props.match.params.product_id;

    this.setState({ product_id: product_id });
    this.handleZoomMeeting = this.handleZoomMeeting.bind(this);
    this.onChangeRegisterMob = this.onChangeRegisterMob.bind(this);
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    let biddata = JSON.parse(localStorage.getItem("userId"));
    if (biddata) {
      this.setState({
        user_id: biddata.data[0].id,
      });
    }

    this.ProductInfoFun();
    this.setState({
      nav1: this.slider1,
      nav2: this.slider2,
    });
  }
  handleLiveLogin = (e) => {
    e.preventDefault();

    const { dispatch, history } = this.props;
    dispatch(LiveLogin(this.state.register_mob))
      .then((response) => {
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
          //  this.ListProductFun();
          this.setState({ register_mob: "" });
          $("#showmobilescreen").modal("hide");
          // history.push("/web")
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
      .catch((error) => {
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
      });
  };
  onChangeRegisterMob = (e) => {
    this.setState({
      register_mob: e.target.value,
    });
  };

  // handleZoomMeeting = (link) => {
  //   if (this.state.ProductData.status === 1) {
  //     if (link) {
  //     } else {
  //       toast.error(this.props.t("zlna"), {
  //         position: "bottom-right",
  //         autoClose: 5000,
  //         hideProgressBar: false,
  //         closeonClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         progress: undefined,
  //       });
  //     }
  //   } else {
  //     toast.error(this.props.t("tmhnsy"), {
  //       position: "bottom-right",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeonClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //   }
  // };

  handleZoomMeeting = () => {
    var localStorageUserData = localStorage.getItem("userId");
    if (localStorageUserData) {
      var dataArry = {
        title: "",
        topic: "HarrjCreat74435",
        name: "9876543210",
        password: "99658",
        roleType: 0,
        product_id: 0,
        isOwner: false,
      };

      dataArry.topic = this.state.ProductData.meeting_id;
      dataArry.password = this.state.ProductData.meeting_password;
      dataArry.title = this.state.ProductData.title;
      dataArry.product_id = this.state.ProductData.product_id;
      dataArry.isOwner = this.state.ProductData.add_by === this.state.user_id;

      localStorageUserData = JSON.parse(localStorageUserData);
      dataArry.name = localStorageUserData.data[0].mobile_no;

      dataArry = JSON.stringify(dataArry);

      var dataEncodedStr = btoa(dataArry);
      if (
        this.state.ProductData.start_date_time &&
        typeof this.state.ProductData.start_date_time !== "undefined" &&
        this.state.ProductData.start_date_time.length > 0
      ) {
        var today = new Date();
        var prod_start_dt = new Date(this.state.ProductData.start_date_time);
        let biddata = JSON.parse(localStorage.getItem("userId"));
        const { dispatch, history } = this.props;

        if (
          today.getUTCDate() === prod_start_dt.getDate() &&
          today.getMonth() === prod_start_dt.getMonth() &&
          today.getUTCFullYear() == prod_start_dt.getFullYear()
        ) {
          if (biddata == null) {
            $("#showmobilescreen").modal("show");
          } else {
             // var zoomUrl = "http://localhost:3000/video?" + dataEncodedStr;
              var zoomUrl = "http://harrj.app/zoom/video?"+dataEncodedStr;
            // var zoomUrl = "http://185.185.83.220:3000/video?" + dataEncodedStr;
            
            window.open(zoomUrl, "_blank");
          }
        } else {
          // Today is before June 3rd
          toast.error(this.props.t("tinld"), {
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
        toast.error(this.props.t("sna"), {
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
      $("#popuplogin").modal("show");
    }
  };

  onChangBidAmount = (e) => {
    this.setState({
      bid_amount: e.target.value,
    });
  };

  onCommentChange = (e) => {
    this.setState({
      comment: e.target.value,
    });
  };

  ProductInfoFun = () => {
    const { dispatch, history } = this.props;
    dispatch(ProductInfo(product_id))
      .then((response) => {
        this.setState(
          {
            ProductData: response.data[0],
          },
          
          () => {
            var array = this.state.ProductData.product_img_list;

            if (
              this.state.ProductData.video &&
              typeof this.state.ProductData.video !== "undefined" &&
              this.state.ProductData.video !== ""
            ) {
              var temp_obj = {
                product_img_id: "",
                product_img: this.state.ProductData.video,
              };
              array.push(temp_obj);
            }
            
            this.setState({
              prod_img_list: array,
            });
              console.log(this.state.ProductData)
          }
        
        );

        let sdt = moment(
          `${response.data[0].start_date_time} ${response.data[0].start_time}`
        );
        let edt = moment(
          `${response.data[0].end_date_time} ${response.data[0].end_time}`
        );
        

        let cstd = moment(moment.duration(moment().diff(sdt)));
        let cetd = moment(moment.duration(moment().diff(edt)));
         console.log("cstd._i._data.minutes++",cstd._i._data.minutes+" "+cetd._i._data.minutes)
        if (cstd._i._data.minutes >= 0) {
          if (cetd._i._data.minutes <= 0) {
            this.setState({
              showZoomBtn: true,
            });
          }
        }
      })
      .catch(() => {
        this.setState({
          ProductData: [],
        });
      });
  };
  handleBidSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Bidform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkUpdateBtn.context._errors.length === 0) {
      let biddata = JSON.parse(localStorage.getItem("userId"));
      dispatch(
        BidProduct(
          biddata.data[0].id,
          this.state.ProductData.product_id,
          this.state.bid_amount,
          this.state.ProductData.add_by
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
          this.setState({ bid_amount: 0 });
          this.setState({ insertId: response.data.insertId });
          this.handleBidBidCmt();
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

  handleBidBidCmt = () => {
    const { dispatch, history } = this.props;
    let biddata = JSON.parse(localStorage.getItem("userId"));
    dispatch(
      BidComment(
        this.state.ProductData.product_id,
        this.state.insertId,
        biddata.data[0].id,
        this.state.comment
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
  };

  tzFun = (ndate, ntime, nformat) => {
    let localtz = moment.tz.guess();
    let tempDate = moment.tz(`${ndate} ${ntime}`, localtz);
    let formatDate = moment(tempDate._i).format(nformat);
    return formatDate;
  };

  zoomImg = (e) => {
    $("#zoom_img").attr("imageSrc", e.target.src);
  };

  handleBidAmt = (e) => {
    let val = e.target.value;
    if (val) {
      if (val > parseInt(this.state.ProductData.max_bid_amount)) {
        if (val < parseInt(this.state.ProductData.max_bid_amount) + 1) {
          e.target.setCustomValidity(
            `${this.props.t("min_err_msg")} ${
              this.state.ProductData.max_bid_amount
            }`
          );
        } else if (val > parseInt(this.state.ProductData.starting_price)) {
          e.target.setCustomValidity(
            `${this.props.t("max_err_msg")} ${
              this.state.ProductData.starting_price
            }`
          );
        } else {
          e.target.setCustomValidity("");
        }
      }
    } else {
      e.target.setCustomValidity(this.props.t("input_err_msg"));
    }
  };

  render() {
    const { isLoggedIn, message } = this.props;

    const slider = [
      {
        banner: coverImg,
        title: "",
        description: "",
        buttonTitle: "",
        handleButtonClick: "",
      },
    ];

    return (
      <React.Fragment>
        <HeroSlider slides={slider} className="product-info-slider" />
        <section className="middle">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <Slider
                  slidesToShow={1}
                  slidesToScroll={1}
                  className="product-slider"
                  asNavFor={this.state.nav2}
                  ref={(slider) => (this.slider1 = slider)}
                >
                  {this.state.prod_img_list &&
                  typeof this.state.prod_img_list !== "undefined" &&
                  this.state.prod_img_list.length > 0 ? (
                    this.state.prod_img_list.map((img_arr, k) => (
                      <div className="ps-info" key={k}>
                        {img_arr.product_img.match(/.(jpg|jpeg|png)$/i) ? (
                          <img
                            className="live-bid-prodimg"
                            src={img_arr.product_img}
                            alt={img_arr.product_img}
                          />
                        ) : (
                          <video className="live-bid-prodimg " controls>
                            <source
                              src={img_arr.product_img}
                              type="video/mp4"
                            />
                          </video>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="ps-info">
                      <img className="live-bid-prodimg" src={logo} alt="" />
                    </div>
                  )}
                </Slider>
                <Slider
                  className="product-slider-nav"
                  asNavFor={this.state.nav1}
                  ref={(slider) => (this.slider2 = slider)}
                  slidesToShow={5}
                  infinite={false}
                  focusOnSelect={true}
                >
                  {this.state.prod_img_list &&
                  typeof this.state.prod_img_list !== "undefined" &&
                  this.state.prod_img_list.length > 0 ? (
                    this.state.prod_img_list.map((img_arr, k) => (
                      <div className="psn-item" key={k}>
                        {img_arr.product_img.match(/.(jpg|jpeg|png|svg)$/i) ? (
                          <img
                            className="live-bid-prodimg"
                            src={img_arr.product_img}
                            alt={img_arr.product_img}
                          />
                        ) : (
                          <video className="live-bid-prodimg ">
                            <source
                              src={img_arr.product_img}
                              type="video/mp4"
                            />
                          </video>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="psn-item">
                      <img className="live-bid-prodimg" src={logo} alt="" />
                    </div>
                  )}
                </Slider>
              </div>

              <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                <div className="products-details-new">
                  {/* <h1 className="mt-0">{this.props.t("Title")}</h1> */}
                  <h1 className="mt-0">{this.state.ProductData.title}</h1>
                  {this.state.ProductData.auction_type !== "golivenow" ? (
                    
                    <>
                      <h5 className="mt-0 mb-2">
                        {this.props.t("adminCategory")}:{" "}
                        {localStorage.getItem("lang") === "English"
                          ? this.state.ProductData.category_name
                          : this.state.ProductData.category_name_arabic}
                      </h5>
                      <h5
                        className={`mt-0 ${
                          this.state.ProductData.auction_type === "offline"
                            ? "mb-0"
                            : "mb-2"
                        }`}
                      >
                        {this.props.t("adminBrand")}:{" "}
                        {localStorage.getItem("lang") === "English"
                          ? this.state.ProductData.brand_name
                          : this.state.ProductData.brand_name_arabic}
                      </h5>
                    </>
                  ) : (
                    ""
                  )}
                  {this.state.ProductData.auction_type === "offline" ? (
                    <>
                      <h2 className="mt-2 mb-2">
                        {this.props.t("cur_price")}:{" "}
                        {this.state.ProductData.max_bid_amount}
                      </h2>
                      <h2 className="mt-2 mb-2">
                        {this.props.t("max_price")}:{" "}
                        {this.state.ProductData.starting_price}
                      </h2>
                    </>
                  ) : (
                    ""
                  )}

                  {this.state.ProductData.auction_type !== "offline" ? (
                    <>
                      <h5 className="mt-0">
                        {this.props.t("adminStartDate")}:{" "}
                        {this.tzFun(
                          this.state.ProductData.start_date_time,
                          this.state.ProductData.start_time,
                          "DD/MM/YY"
                        )}
                        {" -  "}
                        {this.props.t("adminEndDate")}:{" "}
                        {this.tzFun(
                          this.state.ProductData.start_date_time,
                          this.state.ProductData.start_time,
                          "DD/MM/YY"
                        )}
                      </h5>
                      <h5 className="mt-0">
                        {this.props.t("adminStartTime")}:{" "}
                        {this.tzFun(
                          this.state.ProductData?.start_date_time,
                          this.state.ProductData?.start_time,
                          "h:mmA"
                        )}
                        {" - "}
                        {this.props.t("adminEndTime")}:{" "}
                        {this.tzFun(
                          this.state.ProductData?.end_date_time,
                          this.state.ProductData?.end_time,
                          "h:mmA"
                        )}
                      </h5>
                    </>
                  ) : null}
                  <div className="bid-form mb-4">
                    {this.state.ProductData.auction_type === "offline" ? (
                      this.state.ProductData.add_by !== this.state.user_id ? (
                        <Form
                          onSubmit={this.handleBidSubmit}
                          ref={(c) => {
                            this.Bidform = c;
                          }}
                        >
                          <input
                            type="number"
                            className="custom-height form-control"
                            placeholder={this.props.t("eyba")}
                            value={this.state.bid_amount}
                            onChange={this.onChangBidAmount}
                            //required
                            min={
                              (parseInt(
                                this.state.ProductData.max_bid_amount
                              ) || 0) + 1
                            }
                            max={
                              parseInt(this.state.ProductData.starting_price) >
                              0
                                ? parseInt(
                                    this.state.ProductData.starting_price
                                  )
                                : parseInt(
                                    this.state.ProductData.max_bid_amount
                                  ) || ""
                            }
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={this.handleBidAmt}
                          />
                          <textarea
                            className="form-control"
                            name="comment"
                            required
                            placeholder={this.props.t("wcmt")}
                            value={this.state.comment}
                            onChange={this.onCommentChange}
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          ></textarea>
                          <button type="submit">{this.props.t("bid")}</button>
                          <CheckButton
                            style={{ display: "none" }}
                            ref={(c) => {
                              this.checkUpdateBtn = c;
                            }}
                          />
                        </Form>
                      ) : (
                        ""
                      )
                    ) : (
                      <>
                        {this.state.ProductData.add_by === this.state.user_id &&
                        this.state.ProductData.meeting_status === 0 ? (
                          <>
                            {this.state.showZoomBtn ? (
                              <div className="join-btn">
                                <button
                                  data-toggle="button"
                                  onClick={this.handleZoomMeeting}
                                >
                                  {this.props.t("join_meeting")}
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                        {this.state.ProductData.add_by !== this.state.user_id &&
                        this.state.ProductData.meeting_status === 1 ? (
                          <>
                            {this.state.showZoomBtn ? (
                              <div className="join-btn">
                                <button
                                  data-toggle="button"
                                  onClick={this.handleZoomMeeting}
                                >
                                  {this.props.t("join_meeting")}
                                </button>
                              </div>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    )}
                  </div>
                  <div className="mb-4">
                    <p>{this.state.ProductData.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {this.state.ProductData.auction_type === "offline" ? (
          <Reviews
            product_id={this.state.ProductData.product_id}
            userID={this.state.user_id}
            addBy={this.state.ProductData.add_by}
          />
        ) : (
          ""
        )}
        <div
          className="modal fade"
          id="showmobilescreen"
          data-keyboard="false"
          data-backdrop="static"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content-mob">
              <div className="modal-header border-0 pb-0">
                <button type="button" className="close" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="container">
                <form onSubmit={this.handleLiveLogin}>
                  <div className="row mt-3">
                    <div className="col-md-4 ">
                      <label>{this.props.t("enter_mobile")}:</label>
                    </div>

                    <div className="col-md-8 ">
                      <input
                        className="form-control"
                        type="text"
                        name="Phone Number"
                        pattern="[0-9]{10}"
                        required
                      />
                    </div>
                  </div>
                  <div className="text-center pt-3">
                    <button type="submit" className="btn btn-primary">
                      {this.props.t("adminSubmit")}
                    </button>
                  </div>
                </form>
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

export default connect(mapStateToProps)(withTranslation()(ProductDetails));
