import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";
import { withTranslation } from "react-i18next";
import "./../../assets/website/css/styles.css";

class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {}

  render() {
    const { isLoggedIn, message } = this.props;

    return (
      <React.Fragment>
        <footer className="dark-footer skin-dark-footer">
          <div className="container">
            <div className="row">
              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer-1">
                  <h1 className="footer-heading">
                    {this.props.t("CONTACT_US")}
                  </h1>
                  <ul>
                    <li>
                      <a href="tel: +44 345 678 903 ">+44 345 678 903 </a>
                    </li>
                    <li>
                      <a href="mailto:Harrj@mail.com">info@harrj.app </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer-1">
                  <h1 className="footer-heading">
                    {this.props.t("CUSTOMER_SERVICE")}
                  </h1>
                  <ul>
                    <li>
                      <NavLink exact to="/">
                        {this.props.t("Home")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/live_auction">
                        {this.props.t("liv_Bid")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/normal_auction">
                        {this.props.t("normalBid")}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer-1">
                  <h1 className="footer-heading">
                    {this.props.t("INFORMATION")}
                  </h1>
                  <ul>
                    <li>
                      <NavLink exact to="/about-us">
                        {this.props.t("AboutUs")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/privacy-policy">
                        {this.props.t("PrivacyPolicy")}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to="/contacts">
                        {this.props.t("Contactus")}
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-3 col-sm-6 col-xs-6">
                <div className="footer-1">
                  <h1 className="footer-heading">
                    {this.props.t("Subscribe_to")} {this.props.t("harrj")}{" "}
                    {this.props.t("via_email")}
                  </h1>
                  <p>
                    Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia
                  </p>
                  <form>
                    <input
                      type="email"
                      name="your-email"
                      placeholder={this.props.t("yourEmail")}
                    />
                    <input type="submit" value={this.props.t("SUB_SCRIBE")} />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </footer>
        {/*  ============================ Footer End ==================================  */}

        {/* Log In Modal  */}
        <div
          className="modal fade"
          id="login"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="loginmodal"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-xl login-pop-form" role="document">
            <div className="modal-content" id="loginmodal">
              <div className="modal-headers">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span className="ti-close"></span>
                </button>
              </div>

              <div className="modal-body p-5">
                <div className="text-center mb-4">
                  <h2 className="m-0 ft-regular">Login</h2>
                </div>

                <form>
                  <div className="form-group">
                    <label>User Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Username*"
                    />
                  </div>

                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password*"
                    />
                  </div>

                  <div className="form-group">
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="flex-1">
                        <input
                          id="dd"
                          className="checkbox-custom"
                          name="dd"
                          type="checkbox"
                        />
                        <label htmlFor="dd" className="checkbox-custom-label">
                          Remember Me
                        </label>
                      </div>
                      <div className="eltio_k2">
                        <a href="#">Lost Your Password?</a>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="btn btn-md full-width bg-dark text-light fs-md ft-medium"
                    >
                      Login
                    </button>
                  </div>

                  <div className="form-group text-center mb-0">
                    <p className="extra">
                      Not a member?
                      <a href="#et-register-wrap" className="text-dark">
                        Register
                      </a>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <a id="back2Top" className="top-scroll" title="Back to top" href="#">
          <i className="ti-arrow-up"></i>
        </a>
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

export default connect(mapStateToProps)(withTranslation()(Footer));
