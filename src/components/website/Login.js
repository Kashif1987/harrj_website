import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from './../../helpers/history';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import jQuery from 'jquery';
import Popper from 'popper.js';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminLogin } from "./../../actions/auth";

import logoImg from './../../assets/img/logo2.png';

toast.configure();

class Login extends Component {

  constructor(props) {
    super(props);

    this.onChangeEmailID = this.onChangeEmailID.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      email_id: "",
      password: "",
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {

  }

  onChangeEmailID(e) {
    this.setState({
      email_id: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      console.log("AdminLogin")


      dispatch(AdminLogin(this.state.email_id, this.state.password))
        .then((response) => {
          toast.success(this.props.t("successful"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
          history.push("/admin/dashboard");
        })
        .catch(() => {
          this.setState({
            loading: false
          });
          toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        });
    } else {
      this.setState({
        loading: false,
      });
      toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }
  }

  render() {

    const { isLoggedIn, message } = this.props;

    return (
      <React.Fragment>
        <div className="account-page login-page-body" style={{ 'background-color': '#ef493e!important' }}>
          <div className="main-wrapper">
            <div className="account-content">
              {/*<a href="job-list.html" className="btn btn-primary apply-btn">Apply Job</a>*/}
              <div className="container">

                <div className="account-logo">
                  <a href="javascript:void(0)"><img src={logoImg} alt="Harraj" /></a>
                </div>

                <div className="account-box">
                  <div className="account-wrapper">
                    <h3 className="account-title">Admin Login</h3>
                    {/*<p className="account-subtitle">Access to our dashboard</p>*/}

                    <form action="index.html">
                      <div className="form-group">
                        <label>Email</label>
                        <input className="form-control" type="text" />
                      </div>
                      <div className="form-group">
                        <div className="row">
                          <div className="col">
                            <label>Password</label>
                          </div>
                          {/*<div className="col-auto">
                            <a className="text-muted" href="forgot-password.html">
                              Forgot password?
                            </a>
                          </div>*/}
                        </div>
                        <input className="form-control" type="password" />
                      </div>
                      <div className="form-group text-center">
                        <button className="btn btn-primary account-btn" type="submit">Login</button>
                      </div>
                      {/* <div className="account-footer">
                        <p><a href="register.html">Forgot password?</a></p>
                      </div> */}
                      {/*<div className="account-footer">
                        <p>Don't have an account yet? <a href="register.html">Register</a></p>
                      </div>*/}
                    </form>

                  </div>
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
    message
  };
}

export default connect(mapStateToProps)(Login);