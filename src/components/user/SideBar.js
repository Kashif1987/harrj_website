import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

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
import "./../../App.css";

class SideBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    
  }

  render() {

    const { isLoggedIn, message } = this.props;

    return (
      <React.Fragment>

        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li class="menu-title"> 
                  <span>Welcome User</span>
                </li>
                <li> 
                  <NavLink to={"/dashboard"}><i class="fa fa-tachometer" aria-hidden="true"></i> <span>Dashboard</span></NavLink>
                </li>


                <li> 
                  <NavLink to={"/master/designation"}><i class="fa fa-ticket" aria-hidden="true"></i> <span>Sub Category</span></NavLink>
                </li>

               

              </ul>
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

export default connect(mapStateToProps)(SideBar);