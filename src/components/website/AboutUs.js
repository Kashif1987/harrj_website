import React, { Component } from "react";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";

import { clearMessage } from "./../../actions/message";

import { history } from "./../../helpers/history";

import HeroSlider from "./parts/heroSlider";
import coverImg from "./../../assets/website/img/co.jpg";
import logo from "./../../assets/website/img/livebid/logo.png";

import "./../../assets/css/bootstrap.min.css";

// Category slider
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { withTranslation } from "react-i18next";
import "./../../assets/website/css/sliderstyle.css";

toast.configure();

class AboutUs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {}

  render() {
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
              <div className="col-md-4">
                <div className="abu-logo">
                  <NavLink exact to="/">
                    <img src={logo} />
                  </NavLink>
                </div>
              </div>
              <div className="col-md-8">
                <h2 className="abu-title">{this.props.t("AboutUs")}</h2>
                {localStorage.getItem("lang") === "English" ? (
                  <div className="abu-content">
                    <p>
                      Harrj is an application, platform and new concept for sale
                      and purchase through live auctions through direct
                      broadcasting You can also view and buy goods by
                      traditional ads Which guarantee the user see and buy and
                      communicate with the advertiser in easy way
                    </p>
                  </div>
                ) : (
                  <div className="abu-content">
                    <p>
                      Hanj هو تطبيق ومنصة ومفهوم جديد للبيع والشراء من خلال
                      المزادات الحية من خلال البث المباشر كما يمكنك مشاهدة
                      البضائع وشرائها عن طريق الإعلانات التقليدية التي تضمن
                      للمستخدم رؤيتها وشرائها والتواصل مع المعلن بطريقة سهلة
                    </p>
                  </div>
                )}
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

export default connect(mapStateToProps)(withTranslation()(AboutUs));
