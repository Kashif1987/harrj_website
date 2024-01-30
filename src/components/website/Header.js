import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { withTranslation } from "react-i18next";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

import $ from "jquery";

import "./../../assets/website/css/styles.css";

import "./../../assets/website/css/styles.css";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

import "./../../assets/css/bootstrap.min.css";

import logo from "./../../assets/website/img/livebid/logo.png";
import Language from "./LanguageSelection";

import HomeIcon from "./../../assets/website/img/home_icon.png";
import LivebidIcon from "./../../assets/website/img/livebid.png";
import MyAdsIcon from "./../../assets/website/img/MyAds.png";
import MyBidIcon from "./../../assets/website/img/MyBid.png";
import NormalBidIcon from "./../../assets/website/img/NormalBid.png";
import ContactIcon from "./../../assets/website/img/Contact.png";

import {
  UserLogin,
  register,
  ForgotPassword,
  OTPCheck,
  UpdatePassword,
  GoogleLoginUser,
  Notifications,
} from "./../../actions/website/Home";
import { toast } from "react-toastify";
import GoogleLogin from "react-google-login";
class Header extends Component {
  constructor(props) {
    super(props);

    // this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
    this.ShowNotification = this.ShowNotification.bind(this);
    this.handleLoginwithgoogle = this.handleLoginwithgoogle.bind(this);
    this.onChangeEmailID = this.onChangeEmailID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.handleOtpCheckForgot = this.handleOtpCheckForgot.bind(this);
    this.handleSavePasswordSubmit = this.handleSavePasswordSubmit.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeSavePassword = this.onChangeSavePassword.bind(this);
    this.onChangeConfirmSavePassword = this.onChangeConfirmSavePassword.bind(this);
    this.onChangeOtpOneForgot = this.onChangeOtpOneForgot.bind(this);
    this.handlSubmitForgotPassword = this.handlSubmitForgotPassword.bind(this);
    this.onChangeRegiserMobile = this.onChangeRegiserMobile.bind(this);
    this.onChangeRegisterEmailID = this.onChangeRegisterEmailID.bind(this);
    this.onChangeRegisterPassword = this.onChangeRegisterPassword.bind(this);
    this.onChangeForgotMail = this.onChangeForgotMail.bind(this);

    this.state = {
      showPopup: false,
      showMobMenu: false,
      email_id: "",
      listNotification: [],
      forgot_mail: "",
      otponeforgot: "",
      mailWithOtp: "",
      password: "",
      mobile_no: "",
      name: "",
      register_email_id: "",
      showactivemenu: "",
      register_mobile_no: "",
      register_password: "",
      save_password: "",
      confirm_save_password: "",
      isNotification: " ",
      isShowNotification: " ",
      invalidOtp: false,
      emailphoneerror: false,
      passminlenError: false,
      firebase_token: "A",
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    var lang = localStorage.getItem("userId");
    if (lang != null) {
      this.setState({
        showPopup: true,
      });
    }
    this.ShowNotification();
  }

  ShowNotification = () => {
    const { dispatch, history } = this.props;

    dispatch(Notifications())
      .then((response) => {
        this.setState({
          listNotification: response.data ? response.data : [],
        });
      })
      .catch((response) => {
        toast.error(this.props.t("swwpta"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeonClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };

  onChangeEmailID(e) {
    var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{15})+$/;
    var mobformat = /^\d+$/
    if (!mailFormat.test(e.target.value)) {
      this.setState({
        email_id: e.target.value,
        mobile_no: e.target.value,
        emailphoneerror: true
      });

    }
    else {
      this.setState({
        email_id: e.target.value,
        mobile_no: e.target.value,
        emailphoneerror: false
      });
    }



  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }
  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }
  onChangeRegiserMobile(e) {
    this.setState({
      register_mobile_no: e.target.value,
    });
  }
  onChangeRegisterEmailID(e) {
    this.setState({
      register_email_id: e.target.value,
    });
    //var mailFormat ='/^[^\s@]+@[^\s@]+\.[^\s@]+$/'; 
    //if(!e.target.value.match(mailformat)){
    // if(!e.target.value.match(mailFormat)){
    //   this.setState({
    //     register_email_id: e.target.value,

    //     emailphoneerror:true
    //   });
    //   e.target.setCustomValidity(this.props.t("input_err_msg"))     
    // }
    // else{
    //   this.setState({
    //     emailregister_email_id_id: e.target.value,

    //     emailphoneerror:false
    //   });
    //   e.target.setCustomValidity("")
    // }
    //   this.setState({

    //     emailphoneerror:true
    //   });
    //   this.setState({
    //     register_email_id: e.target.value,
    //   });

    // }
    // else{
    //   this.setState({

    //     emailphoneerror:false
    //   });

    //}

  }
  onChangeRegisterPassword(e) {

    let pwd = e.target.value

    // var regEx=/^[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    var regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])(?!.*\s).{8,}$/;


    if (!pwd.match(regEx)) {
      this.setState({
        passminlenError: true,
        register_password: e.target.value,
      })
    }
    else {
      this.setState({
        passminlenError: false,
        register_password: e.target.value,
      })
    }


  }
  onChangeMobile(e) {
    this.setState({
      mobile_no: e.target.value,
    });
  }
  onChangeOtpOneForgot(e) {
    //// console.log("one");
    //// console.log(e.target.value);
    this.setState({
      otponeforgot: e.target.value,
    });

    $("#otptwoforgot").focus();
  }
  onChangeForgotMail(e) {
    //// console.log("one");
    //// console.log(e.target.value);
    this.setState({
      forgot_mail: e.target.value,
      mailWithOtp: e.target.value,
    });
  }
  onChangeSavePassword(e) {
    // this.setState({
    //   save_password: e.target.value,
    // });
    let pwd = e.target.value

    // var regEx=/^[a-zA-Z0-9!@#$%^&*]{8,15}$/;
    var regEx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?])(?!.*\s).{8,}$/;


    if (!pwd.match(regEx)) {
      this.setState({
        passminlenError: true,
        save_password: e.target.value,
      })
    }
    else {
      this.setState({
        passminlenError: false,
        save_password: e.target.value,
      })
    }
  }

  onChangeConfirmSavePassword(e) {
    this.setState({
      confirm_save_password: e.target.value,
    });
  }

  handleSavePasswordSubmit(e) {
    // console.log("save password");
    e.preventDefault();
    var isValid = true;
    // this.setState({
    //   loading: true,
    // });
    console.log("hgsahsga+++", this.state.save_password + " ,"
      + this.state.confirm_save_password + " ,"
      + this.state.mailWithOtp + " ,"
      + this.state.forgot_pass_token)
    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (
      typeof this.state.save_password !== "undefined" &&
      typeof this.state.confirm_save_password !== "undefined"
    ) {
      if (this.state.save_password != this.state.confirm_save_password) {
        isValid = false;
      }
    }
    // var validation_str=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,20}$/;

    if (isValid) {
      if (this.checkBtnOtpForgotSend.context._errors.length === 0) {
        // console.log("entering now update");
        dispatch(
          UpdatePassword(
            this.state.mailWithOtp,
            this.state.save_password,
            this.state.confirm_save_password,

            this.state.forgot_pass_token
          )
        )
          .then((response) => {
            this.setState({
              save_password: "",
              confirm_save_password: "",
            });

            $("#savePasswordModal").modal("hide");
            toast.success(this.props.t("successful"), {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            // this.setState({
            //   loading: false,
            // });
          })
          .catch((response) => {
            this.setState({
              forgot_pass_token: "",
            });

            toast.error(this.props.t("swwpta"), {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeonClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            // this.setState({
            //   loading: false
            // });
          });
      } else {
        this.setState({
          forgot_pass_token: "",
        });
        toast.error(this.props.t("swwpta"), {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeonClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        // this.setState({
        //   loading: false,
        // });
      }
    } else {
      //let error_msg_str = "1. Your password must be between 8 and 20 characters.<br/>2. Your password must contain at least one uppercase, or capital, letter (ex: A, B, C, etc.)<br/>3. Your password must contain at least one lowercase letter (ex: a, b, c, etc.)<br/>4. Your password must contain at least one number digit (ex: 0, 1, 2, 3, etc.)<br/>5. Your password must contain at least one special character -for example: $, #, @, !,%,^,&,*,(,)";

      //let error_msg_str = "Password should be between 8-20 characters and should have atleast one uppercase, one lowercase, one numerical and one special character.";
      let error_msg_str = this.props.t("pdm");
      $("#save_password_error_message").html(error_msg_str).css("color", "red");

      // this.setState({
      //     loading: false,
      // });
    }
  }
  handleLoginwithgoogle = (response) => {
    // console.log("response from goggle login");
    // console.log(response);
    const { dispatch, history } = this.props;

    // response.profileObj.email
    dispatch(GoogleLoginUser("john@test.com"))
      .then((response) => {
        this.setState({
          loading: false,
        });

        // console.log("response:");
        // console.log(response);

        if (
          response &&
          typeof response !== "undefined" &&
          response.length > 0
        ) {
          // if(response[0].type==='user'){
          //   history.push("/web");
          // }else{
          //   if(response[0].type==='ngo'){
          //     history.push("/ngo/home");
          //   }else{
          //     history.push("/");
          //   }
          // }
        } else {
          history.push("/");
        }
        window.location.reload();
      })
      .catch(() => {
        this.setState({
          loading: false,
        });
      });
  };

  handleLoginSubmit(e) {
    e.preventDefault();
    const { dispatch, history } = this.props;
    if (this.checkBtn.context._errors.length === 0) {
      dispatch(
        UserLogin(
          this.state.email_id,
          this.state.mobile_no,
          this.state.password,
	  this.state.firebase_token
        )
      ).then((response) => {
        if (
          response.success ||
          response.success === "true" ||
          response.success === true
        ) {
          toast.success(this.props.t("successful"), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            showPopup: true,
            email_id: "",
            mobile_no: "",
            password: "",
          });
          $("#popuplogin").modal("hide");
          $(".modal-backdrop").remove();
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
          this.setState({
            showPopup: false,
            email_id: "",
            mobile_no: "",
            password: "",
          });
          $("#popuplogin").modal("hide");
          $(".modal-backdrop").remove();
        }
      });
    } else {
      toast.error(this.props.t("sww"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.setState({
        showPopup: false,
        email_id: "",
        password: "",
      });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();
    $("#createad").modal("hide");
    $(".modal-backdrop").remove();
  };

  handleOtpCheckForgot(e) {
    this.setState({
      invalidOtp: false,
    });
    e.preventDefault();

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtnOtpForgotSend.context._errors.length === 0) {
      dispatch(OTPCheck(this.state.otponeforgot, this.state.mailWithOtp)).then(
        (response) => {
          if (response.success || response.success === "true") {
            this.setState({
              otponeforgot: "",
            });
            $("#otpModalForgot").modal("hide");
            $(".modal-backdrop").remove();
            $("#savePasswordModal").modal("show");
          } else {
            toast.error(this.props.t("invalid_otp"), {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeonClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      );
    }
  }

  ForgotPasswordcloseForm=(e)=>{
    this.setState({  forgot_mail:'' });
    $("#ForgotPassModal").modal("hide");            
  }

  handlSubmitForgotPassword(e) {
    debugger
    e.preventDefault();

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtnForgot.context._errors.length === 0) {
      dispatch(ForgotPassword(this.state.forgot_mail)).then((response) => {
        if (response.success || response.success === "true") {
          $("#ForgotPassModal").modal("hide");
          $(".modal-backdrop").remove();
          $("#otpModalForgot").modal("show");
          this.setState({
            forgot_mail: "",
          });
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
    }
  }

  RegistercloseForm=(e)=>{
    this.setState({  name: '', register_mobile_no: '', register_email_id: '',register_password:'' });
    $("#popupregister").modal("hide");               
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });
    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(
        register(
          this.state.name,
          this.state.register_mobile_no,
          this.state.register_email_id,

          this.state.register_password
        )
      ).then((response) => {
        if (
          response.success ||
          response.success === "true" ||
          response.success === true
        ) {
          toast.success(this.props.t("successful"), {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            name: "",
            register_email_id: "",
            register_mobile_no: "",
            register_password: "",
          });
          $("#popupregister").modal("hide");
          $(".modal-backdrop").remove();
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
          this.setState({
            name: "",
            register_email_id: "",
            register_mobile_no: "",
            register_password: "",
          });
          $("#popupregister").modal("hide");
          $(".modal-backdrop").remove();
        }
      });
    } else {
      toast.error(this.props.t("sww"), {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.setState({
        name: "",
        register_email_id: "",
        register_mobile_no: "",
        register_password: "",
      });
      $("#popupregister").modal("hide");
      $(".modal-backdrop").remove();
    }

    $("#popupregister").modal("hide");
    $(".modal-backdrop").remove();
  };

  showRegister = (e) => {
    $("#popuplogin").modal("hide");
    $(".modal-backdrop").remove();
    $("#popupregister").modal("show");
  };

  showActive = (id) => {
    this.setState({
      showactivemenu: id,
    });
  };
  showLogin = (e) => {
    this.setState({ email_id: "", password: "" }, () => {
      $("#popuplogin").modal("show");
    });
    $("#popuplogin").modal("show");
  };
  showLogout = () => {
    localStorage.removeItem("userId");
    this.setState({
      showPopup: false,
    });
    if (
      (window.location.pathname = "/createads") ||
      (window.location.pathname = "/myads") ||
      (window.location.pathname = "/mybids")
    ) {
      history.push("/");
    }
  };

  notificationFun = () => { };

  handleHeaderNav = (e) => {
    e.preventDefault();
    this.setState({
      showMobMenu: !this.state.showMobMenu,
    });
  };

  render() {
    const { isLoggedIn, message } = this.props;

    return (
      <React.Fragment>
        <header>
          <div className="bottom-header">
            <div className="container">
              <div className="row">
                <div className="col-md-2 menu-logo pr-0">
                  <div className="logo">
                    <a href="/">
                      <img src={logo} alt="" />
                    </a>
                  </div>
                </div>
                <div className="menulist-item col-md-10 px-0" id="mySidenav">
                  <div className="mic-inner">
                    <nav id="cssmenu">
                      <div id="head-mobile"></div>
                      <div
                        className="button"
                        onClick={this.handleHeaderNav}
                      ></div>
                      <ul
                        className={
                          this.state.showMobMenu ? "openMob" : "closeMob"
                        }
                      >
                        <li>
                          <NavLink
                            exact
                            to="/"
                            activeClassName="main-menu-selected-active"
                          >
                            <img src={HomeIcon} /> {this.props.t("Home")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/live_auction"
                            activeClassName="main-menu-selected-active"
                          >
                            <img src={LivebidIcon} /> {this.props.t("liveBid")}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink
                            exact
                            to="/normal_auction"
                            activeClassName="main-menu-selected-active"
                          >
                            <img src={NormalBidIcon} />{" "}
                            {this.props.t("NormalAds")}
                          </NavLink>
                        </li>
                        {this.state.showPopup === true ? (
                          <>
                            <li>
                              <NavLink
                                exact
                                to="/myads"
                                activeClassName="main-menu-selected-active"
                              >
                                <img src={MyAdsIcon} />{" "}
                                {this.props.t("myProducts")}
                              </NavLink>
                            </li>
                            <li>
                              <NavLink
                                exact
                                to="/mybids"
                                activeClassName="main-menu-selected-active"
                              >
                                <img src={MyBidIcon} /> {this.props.t("MyBids")}
                              </NavLink>
                            </li>
                          </>
                        ) : null}
                        <li>
                          <NavLink
                            exact
                            to="/contacts"
                            activeClassName="main-menu-selected-active"
                          >
                            <img src={ContactIcon} /> {this.props.t("contact")}{" "}
                          </NavLink>
                        </li>
                      </ul>
                    </nav>
                    {this.state.showPopup === false ? (
                      <div className="signup-btn">
                        <a onClick={this.showLogin}>{this.props.t("Login")}</a>
                      </div>
                    ) : (
                      <div className="signup-btn">
                        <a onClick={this.showLogout}>
                          {this.props.t("logout")} 
                        </a>
                      </div>
                    )}
                    <div className="user-menu">
                      <Language />
                    </div>
                    <div className="notifications-box">
                      <a
                        // data-toggle="dropdown"
                        onClick={(e) => {
                          if (
                            !this.state.isNotification === " show" ||
                            this.state.isNotification === "" ||
                            this.state.isNotification === " " ||
                            this.state.isNotification.trim() === ""
                          ) {
                            this.setState({ isNotification: " show" });
                          } else {
                            this.setState({ isNotification: " " });
                          }
                        }}
                      >
                        <i className="fa fa-bell-o fa-2x fabell"></i>{" "}
                        <span className="badge badge-pill">
                          {this.state.listNotification.length}
                        </span>
                      </a>

                      <div
                        className={
                          "dropdown-menu dropdown-menu-right notifications" +
                          this.state.isNotification
                        }
                      >
                        <div className="topnav-dropdown-header">
                          <span className="notification-title">
                            {this.props.t("Notifications_")}
                          </span>
                          {/* {this.state.listNotification.length > 0 ? (
                            <a href="#" className="clear-noti">
                              {this.props.t("clear_all")}
                            </a>
                          ) : (
                            ""
                          )} */}
                        </div>
                        <div className="noti-content">
                          {this.state.listNotification &&
                            typeof this.state.listNotification !== "undefined" &&
                            this.state.listNotification.length > 0 ? (
                            <ul className="notification-list">
                              {this.state.listNotification.map((itemmsg, l) => (
                                //  <div onClick={()=>{if (localStorage.getItem("userId")==null) {
                                //   $("#popuplogin").modal("show")
                                // }}}
                               
                                //   key={l}
                                // >
                                localStorage.getItem("userId")==null ?
                                <li className="notification-message" key={l}>
                                <a
                                  onClick={()=>{
                                    $("#popuplogin").modal("show")
                                  }}
                               
                                >
                                  <div className="media">
                                    <span className="avatar-ws">
                                      {itemmsg.product_img.length > 0 ? (
                                        <img
                                          alt=""
                                          src={itemmsg.product_img}
                                        />
                                      ) : (
                                        <img alt="" src={logo} />
                                      )}
                                    </span>
                                    <div className="media-body"
                                    >
                                      <div className="nb-title">
                                        {itemmsg.title}
                                      </div>
                                      <div className="nb-stitle" onClick={()=>{if (localStorage.getItem("userId")==null) {
                            $("#popuplogin").modal("show")
                        
                          }}}>
                            
                                        {this.props.t("View_")}
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </li>
                                :

                                <li className="notification-message" key={l}>
                                <a
                                  href={
                                    "/product/info/" + itemmsg.product_id
                                  }
                               
                                >
                                  <div className="media">
                                    <span className="avatar-ws">
                                      {itemmsg.product_img.length > 0 ? (
                                        <img
                                          alt=""
                                          src={itemmsg.product_img}
                                        />
                                      ) : (
                                        <img alt="" src={logo} />
                                      )}
                                    </span>
                                    <div className="media-body"
                                    >
                                      <div className="nb-title">
                                        {itemmsg.title}
                                      </div>
                                      <div className="nb-stitle" onClick={()=>{if (localStorage.getItem("userId")==null) {
                            $("#popuplogin").modal("show")
                          }}}>
                                        {this.props.t("View_")}
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </li>
                                
                               
                                // </div>
                              ))}
                            </ul>
                          ) : (
                            <div className="noti-no-content">
                              {this.props.t("nna")}
                            </div>
                          )}
                        </div>
                        {/* {this.state.listNotification.length > 0 ? (
                          <div className="topnav-dropdown-footer">
                            <a href="#">{this.props.t("van")}</a>
                          </div>
                        ) : (
                          ""
                        )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="createad"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog modal-dialog-centered modal-sm">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <Form
                  onSubmit={this.handleSubmit}
                  ref={(c) => {
                    this.Addform = c;
                  }}
                  autoComplete="off"
                >
                  <div className="modal-header border-0 pb-0">
                    <input
                      type="text"
                      className="form-control"
                      placeholder={this.props.t("Mobile")}
                      required
                    />
                    <button className="btn btn-primary " type="submit">
                      {this.props.t("adminSubmit")}
                    </button>
                  </div>
                  <div className="modal-body text-center pb-5 pt-0"></div>
                </Form>
              </div>
            </div>
          </div>
          <div className="modal fade" id="popuplogin" data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content reg-log-form-outer-box">
                <div className="modal-header">
                  <div className="login-form-logo">
                    <img className="login-form-logo-img" src={logo} />
                  </div>
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>

                <Form onSubmit={this.handleLoginSubmit} autoComplete="off">
                  <div className="login-form-inner-s1">
                    <>
                      <div className="lf-input1">
                        <input
                          type="text"
                          className="form-control"
                          placeholder={this.props.t("email_mob_no")}
                          id="description"
                          name="edit_description"
                          value={this.state.email_id}
                          onChange={this.onChangeEmailID}
                          required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                        />
                        {/* {this.state.emailphoneerror==true&&
                          <>
                          <p style={{color:"red",fontSize:"12px"}}>Email Address / Phone number is not valid, Please provide a valid Email or phone number</p>
                          </>
                        } */}
                      </div>
                      <div className="lf-input2">
                        <input
                          type="password"
                          className="form-control"
                          placeholder={this.props.t("Password")}
                          id="description"
                          name="edit_description"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg_password")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                        />
                      </div>
                    </>
                    <div className="lf-lw">
                      <div className="lflw-submit-btn">
                        <button
                          className="btn btn-primary account-btn"
                          type="submit"
                        >
                          {this.props.t("Login")}
                        </button>
                      </div>
                      {/* <div className="lflw-line">
                        {this.props.t("Or")} {this.props.t("Login")}{" "}
                        {this.props.t("using")}
                      </div>
                      <div className="lflw-gm">
                        <GoogleLogin
                          clientId="717053916277-ilet50nnp42igetfdgv5m5apcr50u43c.apps.googleusercontent.com"
                          buttonText={this.props.t("Google")}
                          className="gmail-icon"
                          onSuccess={this.handleLoginwithgoogle}
                          onFailure={this.handleLoginwithgoogle}
                          cookiePolicy={"single_host_origin"}
                        />
                      </div> */}
                    </div>
                    <div className="create-account-wrap">
                      {this.props.t("Not_a_mem")}?{" "}
                      <a
                        href="#"
                        onClick={this.showRegister}
                        data-dismiss="modal"
                      >
                        {this.props.t("create_acc")}
                      </a>
                    </div>
                    <div className="account-footer">
                      <a
                        href=""
                        data-toggle="modal"
                        data-target="#ForgotPassModal"
                        data-dismiss="modal"
                      >
                        {this.props.t("ForgotPs")}
                      </a>
                    </div>
                  </div>
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="savePasswordModal"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content pt-0 pb-4 px-3">
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <div className="container">
                  <Form
                    onSubmit={this.handleSavePasswordSubmit}
                    ref={(c) => {
                      this.form = c;
                    }}
                    autoComplete="off"
                  >
                    <h3 className="size18 mt-0">{this.props.t("snp")}</h3>
                    <div className="row">
                      <div className="col-md-12 pb-3">
                        <input
                          type="password"
                          className="form-control h-small"
                          placeholder={this.props.t("New_Password")}
                          name="save_password"
                          id="save_password"
                          onChange={this.onChangeSavePassword}
                          value={this.state.save_password}
                          autoComplete="off"
                          required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                        />
                        {this.state.passminlenError == true &&
                          <>
                            <div style={{ color: "red", fontSize: "10px" }}>

                              {this.props.t('The password field must be greater than 8 letters')}
                              <br />
                              {this.props.t('The field  password  must contain a number')}
                              <br />
                              {this.props.t('The field password must contain a upper case')}
                              <br />
                              {this.props.t('The field password must contain a lower case')}
                              <br />
                              {this.props.t('The field password must contain a spacial character')}
                              <br />
                              {this.props.t('The field password must contain a number')}

                            </div>
                          </>
                        }
                      </div>
                      <div className="col-md-12 pb-3">
                        <input
                          type="password"
                          className="form-control h-small"
                          placeholder={this.props.t("cnp")}
                          name="confirm_save_password"
                          id="confirm_save_password"
                          onChange={this.onChangeConfirmSavePassword}
                          value={this.state.confirm_save_password}
                          autoComplete="off"
                          required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}
                        />

                      </div>
                      <span id="save_password_error_message"></span>
                    </div>
                    <div className="row mx-0 text-right ">
                      <div className="post-icons d-flex flex-wrap justify-content-end">
                        {this.state.passminlenError == true &&
                          <button className="btn btn-primary" disabled>
                            {this.props.t("Change_Password")}
                          </button>
                        }
                        {this.state.passminlenError == false &&
                          <button className="btn btn-primary" >
                            {this.props.t("Change_Password")}
                          </button>
                        }
                      </div>
                    </div>

                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtnChangePassword = c;
                      }}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="otpModalForgot"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                  <button type="button" className="close" data-dismiss="modal">
                    &times;
                  </button>
                </div>
                <h3 className="size18 mt-0">{this.props.t("enter_otp")}</h3>
                <Form
                  onSubmit={this.handleOtpCheckForgot}
                  ref={(c) => {
                    this.form = c;
                  }}
                  autoComplete="off"
                >
                  <div className="d-inline-block container">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      id="otponeforgot"
                      value={this.state.otponeforgot}
                      onChange={this.onChangeOtpOneForgot}
                      autoComplete="off"
                      required
                      onInvalid={(e) =>
                        e.target.setCustomValidity(
                          this.props.t("input_err_msg")
                        )
                      }
                      onInput={(e) => e.target.setCustomValidity("")}
                    />
                  </div>
                  <button className="btn btn-primary mt-3 mx-auto d-block">
                    {this.props.t("adminSubmit")}
                  </button>
                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtnOtpForgotSend = c;
                    }}
                  />
                </Form>
              </div>
            </div>
          </div>

          <div
            className="modal fade"
            id="ForgotPassModal"
            data-keyboard="false"
            data-backdrop="static"
          >
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header border-0 pb-0">
                <button type="button" className="close" data-dismiss="modal" onClick={this.ForgotPasswordcloseForm}>&times;</button>
                </div>

                <div className="modal-body text-center pb-5 pt-0">
                  <h3>{this.props.t("ForgotPass")}</h3>
                  <p id="forgotpwdlbl">{this.props.t("_email_add")}</p>
                  <Form
                    onSubmit={this.handlSubmitForgotPassword}
                    ref={(c) => {
                      this.form = c;
                    }}
                    autoComplete="off"
                  >
                    <div className="form-group">
                      <input
                        type="email"
                        className="form-control"
                        placeholder={this.props.t("Email")}
                        id="forgot_mail"
                        name="forgot_mail"
                        value={this.state.forgot_mail}
                       
                        autoComplete="off"
                        onChange={this.onChangeForgotMail}
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            this.props.t("input_err_msg_email")
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        required/>
                    </div>
                    <button className="btn btn-primary mt-3 mx-auto d-block">
                      {this.props.t("adminSubmit")}
                    </button>

                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkBtnForgot = c;
                      }}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>
          <div className="modal fade" id="popupregister" data-keyboard="false">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content reg-log-form-outer-box">
                <div className="modal-header">
                  <div className="login-form-logo">
                    <img className="login-form-logo-img" alt="" src={logo} />
                  </div>
                  <button type="button" className="close" data-dismiss="modal" onClick={this.RegistercloseForm}>&times;</button>
                 
                </div>
                <Form onSubmit={this.handleRegisterSubmit} autoComplete="off">
                  <div className="login-form-inner-s1">
                    <div className="lf-input1">
                      <input
                        type="text"
                        className="form-control"
                        placeholder={this.props.t("name")}
                        id="description"
                        name="edit_description"
                        value={this.state.name}
                        onChange={this.onChangeName}
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            this.props.t("input_err_msg")
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        autoComplete="off"
                      />
                    </div>
                    <div className="lf-input2">
                      <input
                        type="tel"
                        className="form-control"
                        placeholder={this.props.t("Mobile_No")}
                        id="register_mobile_no"
                        name="register_mobile_no"
                        value={this.state.register_mobile_no}
                        onChange={this.onChangeRegiserMobile}
                        required
                        pattern="[0-9]+"
                        maxLength="15"
                        //title="Mobile No. must contain 15 numbers"

                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            this.props.t("input_err_msg_mob")
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        autoComplete="off"
                      />
                    </div>
                    <div className="lf-input3">
                      <input
                        type="email"
                        className="form-control"
                        placeholder={this.props.t("Email")}
                        id="register_email_id"
                        name="register_email_id"
                        value={this.state.register_email_id}
                        onChange={this.onChangeRegisterEmailID}
                        //  pattern="/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/"
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            this.props.t("input_err_msg_email")
                          )
                        }
                        title={this.props.t("input_err_msg_email")}
                        onInput={(e) => e.target.setCustomValidity("")}
                        autoComplete="off"
                      />

                    </div>
                    <div className="lf-input5">
                      <input
                        type="password"
                        className="form-control"
                        placeholder={this.props.t("Password")}
                        id="register_password"
                        name="register_password"
                        value={this.state.register_password}
                        onChange={this.onChangeRegisterPassword}
                        required
                        onInvalid={(e) =>
                          e.target.setCustomValidity(
                            this.props.t("input_err_msg_password")
                          )
                        }
                        onInput={(e) => e.target.setCustomValidity("")}
                        autoComplete="off"


                      />
                      {this.state.passminlenError == true &&
                        <>
                          <div style={{ color: "red", fontSize: "10px" }}>

                            {this.props.t('The password field must be greater than 8 letters')}
                            <br />
                            {this.props.t('The field  password  must contain a number')}
                            <br />
                            {this.props.t('The field password must contain a upper case')}
                            <br />
                            {this.props.t('The field password must contain a lower case')}
                            <br />
                            {this.props.t('The field password must contain a spacial character')}
                            <br />
                            {this.props.t('The field password must contain a number')}

                          </div>
                        </>
                      }
                    </div>
                    {this.state.passminlenError == true &&
                      <div className="form-group text-center">
                        <button
                          className="btn btn-primary account-btn mt-4"
                          type="submit"
                          disabled
                        >
                          {this.props.t("Register")}
                        </button>
                      </div>
                    }
                    {this.state.passminlenError == false &&
                      <div className="form-group text-center">
                        <button
                          className="btn btn-primary account-btn mt-4"
                          type="submit"
                        >
                          {this.props.t("Register")}
                        </button>
                      </div>
                    }
                  </div>

                  <CheckButton
                    style={{ display: "none" }}
                    ref={(c) => {
                      this.checkBtn = c;
                    }}
                  />
                </Form>
              </div>
            </div>
          </div>
        </header>
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

export default connect(mapStateToProps)(withTranslation()(Header));
