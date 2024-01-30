import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { withTranslation } from "react-i18next";

import HeroSlider from "./parts/heroSlider";

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

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { GlassMagnifier } from "react-image-magnifiers";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AdminLogin } from "./../../actions/auth";

import { WebLogin } from "./../../actions/website/Home";

import Header from "./Header";
import Footer from "./Footer";

import logoImg from "./../../assets/website/img/logo-01.png";
import productImg from "./../../assets/website/img/product/product1.png";
import coverImg from "./../../assets/website/img/co.jpg";
import reviewImg from "./../../assets/website/img/team-2.jpg";
import logo from "./../../assets/website/img/livebid/logo.png";

toast.configure();
var LiveAuction = "online";
var NormalAuction = "offline";
var product_id = 0;

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      mob_no: 0,
      email_id: "",
      message: "",
      loading: false,
    };

    this.handleContactSubmit = this.handleContactSubmit.bind(this);
    this.onChangetext = this.onChangetext.bind(this);
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {}
  onChangetext = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleContactSubmit = (e) => {
    e.preventDefault();
    this.setState({
      loading: true,
    });
    this.Addliveform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(
        WebLogin(
          this.state.name,
          this.state.email_id,
          this.state.mob_no,
          this.state.message
        )
      ).then((response) => {
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
          this.setState({ name: '', email_id: '', mob_no: '', message: ''});
    
      $("#Full_Name").val("");
      $("#mob_no").val("");
      $("#email").val("");
      $("#contact_disc").val("");
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

  zoomImg = (e) => {
    $("#zoom_img").attr("imageSrc", e.target.src);
  };

  render() {
    const { isLoggedIn, message } = this.props;
    const slider = [
      {
        banner: coverImg,
        title: "",
        description: "",
      },
    ];

    return (
      <React.Fragment>
        <HeroSlider className={"ap-hero"} slides={slider} />
        <section className="middle">
          <div className="container">
            <div className="row">
              <div className="col-md-6">
                <div className="cp-logo">
                  <NavLink exact to="/">
                    <img src={logo} />
                  </NavLink>
                </div>
              </div>
              <div className="col-md-6">
                <div className="prd_details">
                  <div className="add-my-product pt-3">
                    <h1>{this.props.t("Contactus")}</h1>
                    <div className="products-form">
                      <Form
                        onSubmit={this.handleContactSubmit}
                        ref={(d) => {
                          this.Addliveform = d;
                        }}
                      >
                        <div className="row">
                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="text"
                                className="form-control"
                                id="Full_Name"
                                name="name" 
                                placeholder={this.props.t("fullname")}
                                onChange={this.onChangetext}
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

                          <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="tel"
                                className="form-control"
                                name="mob_no"
                                id="mob_no"
                                placeholder={this.props.t("Mobile")}
                                onChange={this.onChangetext}
                                required
                                maxLength="15"
                                pattern="[0-9]+"
                               
                               // title="Mobile No. must contain only digits"
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("input_err_msg_mob")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
                              />
                            </div>
                          </div>
                          {/* <div className="col-md-12">
                            <div className="form-group">
                              <input
                                type="email"
                                className="form-control"
                                name="email_id"
                                id="email_id"
                                placeholder={this.props.t("Email")}
                                required
                                autoComplete="off"
                                onChange={this.onChangetext}
                              
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("input_err_msg_email")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity(" ")}
                              />
                            </div>
                          </div> */}
                          <div className="col-md-12">
                           <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder={this.props.t("Email")}
                        id="email_id"
                        name="email_id"
                        value={this.state.email_id} 
                        required
                        autoComplete="off"
                        onChange={this.onChangetext}
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            this.props.t("input_err_msg_email")
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                      />
                    </div>
                    </div>
                          <div className="col-md-12">
                            <div className="form-group">
                              <textarea
                                name="message"
                                className="form-control mx-0 px-2"
                                placeholder={this.props.t("contactUsDisc")}
                                id="contact_disc"
                                onChange={this.onChangetext}
                                required
                                onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("input_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")}
                              ></textarea>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <div className="post-btn form-group">
                              <input
                                type="submit"
                                value={this.props.t("adminSubmit")}
                                className="btn btn-primary"
                              />
                            </div>
                          </div>

                          <CheckButton
                            style={{ display: "none" }}
                            ref={(d) => {
                              this.checkBtn = d;
                            }}
                          />
                        </div>
                      </Form>
                    </div>
                  </div>
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

export default connect(mapStateToProps)(withTranslation()(Contact));
