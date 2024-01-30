import React, { Component, Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";

//
import "./../../assets/css/bootstrap.min.css";
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css";
import "./../../assets/css/custom.css";
import "./../../assets/website/css/styles.css";

import Home from "./Home";
import AboutUs from "./AboutUs";
import PrivacyPolicy from "./PrivacyPolicy";
import LiveAuction from "./LiveAuction";
import NormalAuction from "./NormalAuction";
import MyAds from "./MyAds";
import MyBids from "./MyBids";
import ProductInfo from "./ProductInfo";
import Contacts from "./Contact";
import CreateAds from "./CreateAds";
import Header from "./Header";
import Footer from "./Footer";

//website URLs
const WebHome = lazy(() => import("./Home"));
const WebMyAd = lazy(() => import("./MyAds"));
const WebMyBid = lazy(() => import("./MyBids"));
const WebCreateAd = lazy(() => import("./CreateAds"));
const WebProductInfo = lazy(() => import("./ProductInfo"));
const WebLiveAuction = lazy(() => import("./LiveAuction"));
const WebNormalAuction = lazy(() => import("./NormalAuction"));
const Contact = lazy(() => import("./Contact"));

const Website = ({ match }) => {
  return (
    <div id="main-wrapper">
      <Header />
      {/* <Route exact path={`${match.path}`} component={Home} />
      <Route exact path={`${match.path}/about-us`} component={AboutUs} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/about-us" component={AboutUs} />
      {/* <Route
        exact
        path={`${match.path}/privacy-policy`}
        component={PrivacyPolicy}
      /> */}
      <Route exact path="/privacy-policy" component={PrivacyPolicy} />
      {/* <Route
        exact
        path={`${match.path}/live_auction`}
        component={LiveAuction}
      /> */}
       <Route exact path="/live_auction" component={LiveAuction} />
       <Route exact path="/normal_auction" component={NormalAuction} />
      {/* <Route
        exact
        path={`${match.path}/normal_auction`}
        component={NormalAuction}
      /> */}
      <Route exact path="/myads" component={MyAds} />
      <Route exact path="/mybids" component={MyBids} />
      <Route exact path="/createads" component={CreateAds} />

      {/* <Route exact path={`${match.path}/myads`} component={MyAds} />
      <Route exact path={`${match.path}/mybids`} component={MyBids} />
      <Route exact path={`${match.path}/createads`} component={CreateAds} /> */}
      {/* <Route
        exact
        path={`${match.path}/product/info/:product_id`}
        component={ProductInfo}
      /> */}
       <Route exact path="/product/info/:product_id" component={ProductInfo} />
      <Route exact path="/contacts" component={CreateAds} >
      {/* <Route path={`${match.path}/contacts`}> */}
        <Contact />
      </Route>
      {/* <Route exact path={`${match.path}/contacts`} component={Contacts} />  
      <Route path="/web/mybids">
        <WebMyBid />
      </Route>
      <Route path="/web/createads">
        <WebCreateAd />
      </Route>
      
      <Route path="/web/product/info/:product_id">
        <WebProductInfo />
      </Route> */}

      {/* <Route path="/web/normal_auction">
        <WebNormalAuction />
      </Route> */}
      <Footer />
    </div>
  );
};

export default Website;
