import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";
import { withTranslation } from 'react-i18next';
import { connect } from "react-redux";
import { clearMessage } from "./../../actions/message";
import { history } from './../../helpers/history';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import jQuery from 'jquery';
import Popper from 'popper.js';

import DataTable from 'datatables.net';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";

import { BannerAdd, BannerList, BannerInfo, BannerUpdate, BannerDelete } from "./../../actions/adminBanner";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListBannerFun = this.ListBannerFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeBanner = this.onChangeBanner.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoBannerFun = this.InfoBannerFun.bind(this);

    this.onChangeEditBanner = this.onChangeEditBanner.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
      listBannerData: [],
      delete_id: 0,
      banner_img: '',
      banner_id: 0,
      banner_page: 0,
      edit_banner_name: "",
      edit_banner_img: '',
      edit_banner_img_view: '',
      lang: ""
    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount = () => {
    /*$(document).ready(function() {
          $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          } );
    });*/
    this.ListBannerFun();
  }



  TableDataUpdate = () => {

    let lang = localStorage.getItem("lang")

    $('#example').DataTable({
      dom: 'Bfrtip',
      buttons: [
        'copy', 'csv', 'excel', 'pdf', 'print'
      ],
      retrieve: true,
      language: {
        search: lang === 'Ar' ? this.props.t("Search") : "Search",
        pagingType: lang === 'Ar' ? this.props.t("Previous") : "Previous",
        info: lang === 'Ar' ? this.props.t("Showing 1 to 10 of 30 entries") : "Showing 1 to 10 of 30 entries",
        // sinfo: lang === 'Ar' ? this.props.t("Showing") : "Showing",
        paginate: {
          next: lang === 'Ar' ? this.props.t("Next") : "Next", // or '→'
          previous: lang === 'Ar' ? this.props.t("Previous") : "Previous", // or '←' 
        }

        //  "search":this.props.t("Search")
      }

    });
  }

  ListBannerFun = () => {

    const { dispatch, history } = this.props;
    dispatch(BannerList())
      .then((response) => {
        this.setState({
          listBannerData: response.data,
          // lang:localStorage.getItem("lang")
        });
        this.TableDataUpdate();

      })
      .catch(() => {
        this.setState({
          listBannerData: []
        });
      });
  }

  handleDeleteConfirm = (unique_id) => {
    this.setState({
      delete_id: unique_id,
    });
    $("#delete_modal").modal("show");
  }

  handleDelete = () => {
    const { dispatch, history } = this.props;
    dispatch(BannerDelete(this.state.delete_id))
      .then((response) => {
        if (response.success === true) {
          toast.success(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeonClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          this.setState({
            delete_id: 0,
          });
          this.ListBannerFun();
          window.location.reload();
        } else {
          toast.error(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeBanner = (e) => {
    var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    var file = e.target.files[0];
    var fileType = file.type;
    if (!allowedTypes.includes(fileType)) {
      alert('Please select a valid file format.');

      this.setState({
        banner_img: "",
      });
      $("#banner_img").val("");
    }
    else {

      this.setState({
        banner_img: e.target.files,
      });

    }
    let img = new Image()
    let product_img = e.target.files;

    img.src = window.URL.createObjectURL(product_img[0])

    img.onload = () => {

      console.log("img++++ ");
      console.log(img);

      if (img.width === 1500 && img.height === 500) {
        this.setState({
          banner_img: product_img,
        });
        //alert(`Nice, image is the right size. It can be uploaded`)
        toast.success(this.props.t("ImageSuccess"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        // upload logic here
      } else {
        this.setState({
          banner_img: null,
        });

        $("#banner_img").val(null);

        toast.error(this.props.t("ImageError"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        // e.target.value = null
      }
    }

  }
  changeBannerPage = (e) => {
    this.setState({
      banner_page: e.target.value,
    });
  }
  changeEditBannerPage = (e) => {
    this.setState({
      edit_banner_name: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(BannerAdd(this.state.banner_img, this.state.banner_page))
        .then((response) => {
          if (response.success === true) {
            toast.success(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeonClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.ListBannerFun();
            this.setState({ banner_img: '' });
            document.getElementById("banner_img").value = "";
            $("#add_form").modal("hide");
            window.location.reload();
          } else {
            toast.error(
              localStorage.getItem("lang") === "En"
                ? response.message
                : response?.message_arabic,
              { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
          }
        })
        .catch((error) => {
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

  InfoBannerFun = (banner_id) => {

    const { dispatch, history } = this.props;
    dispatch(BannerInfo(banner_id))
      .then((response) => {
        if (response.data && typeof response.data !== "undefined" && response.data.length > 0) {
          this.setState({
            banner_id: banner_id,

            edit_banner_img: response.data[0].banner_img,
            edit_banner_name: response.data[0].page_name,
            edit_banner_img_view: response.data[0].banner_img
          });
          $("#edit_form").modal("show");
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditBanner = (e) => {


    var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    var file = e.target.files[0];
    var fileType = file.type;
    if (!allowedTypes.includes(fileType)) {
      alert('Please select a valid file format.');

      this.setState({
        edit_banner_img: "",
      });
      $("#edit_banner_img").val("");
    }
    else {

      this.setState({
        edit_banner_img: e.target.files,
      });

    }
    let img = new Image()
    let product_img = e.target.files;

    img.src = window.URL.createObjectURL(product_img[0])

    img.onload = () => {

      console.log("img++++ ");
      console.log(img);

      if (img.width === 1500 && img.height === 500) {
        this.setState({
          edit_banner_img: product_img,
        });
        //alert(`Nice, image is the right size. It can be uploaded`)
        toast.success(this.props.t("ImageSuccess"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        // upload logic here
      } else {
        this.setState({
          edit_banner_img: null,
        });

        $("#edit_banner_img").val(null);

        toast.error(this.props.t("ImageError"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        // e.target.value = null
      }
    }
  }

  handleUpdateSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Updateform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(BannerUpdate(this.state.banner_id, this.state.edit_banner_img, this.state.edit_banner_name))
        .then((response) => {
          if (response.success === true) {
            toast.success(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeonClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            this.ListBannerFun();
            this.setState({ banner_id: 0, edit_banner_img: '', edit_banner_name: '' });
            document.getElementById("edit_banner_img").value = "";
            $("#edit_form").modal("hide");
            $("#edit_banner_img").val("");
            window.location.reload();
          } else {
            toast.error(
              localStorage.getItem("lang") === "En"
                ? response.message
                : response?.message_arabic,
              { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
          }
        })
        .catch((error) => {
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
        <div className="main-wrapper">
          <Header />
          <SideBar />

          <div className="page-wrapper">

            <div className="content container-fluid">

              <div class="page-header">
                <div class="row align-items-center">
                  <div class="col">
                    <h3 class="page-title">{this.props.t('adminBanner')}</h3>
                    <ul class="breadcrumb">
                      <li class="breadcrumb-item"><Link to={"/admin/dashboard"}>{this.props.t('adminDashboard')}</Link></li>
                      <li class="breadcrumb-item active">{this.props.t('adminBanner')}</li>
                    </ul>
                  </div>
                  <div class="col-auto float-right ml-auto">
                    <a href="#" class="btn add-btn" data-toggle="modal" title="Add Banner" data-target="#add_form"><i class="fa fa-plus"></i></a>
                    <div class="view-icons">
                      {/*<NavLink to={"/proposal/dashboard"} href="employees.html" class="grid-view btn btn-link"><i class="fa fa-th"></i></NavLink>
                        <a href="#" class="list-view btn btn-link active"><i class="fa fa-bars"></i></a>*/}
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="table-responsive">
                    <table id="example" className="table table-striped custom-table mb-0 datatable">
                      <thead>
                        <tr>
                          <th>{this.props.t('Id')}</th>
                          <th>{this.props.t('adminBanner')}</th>
                          <th>{this.props.t('adminBanner')} {this.props.t('adminImage')}</th>
                          <th className="text-right">{this.props.t('adminActions')}</th>
                        </tr>
                      </thead>
                      <tbody>

                        {(() => {
                          if (this.state.listBannerData && typeof this.state.listBannerData !== "undefined" & this.state.listBannerData.length > 0) {
                            return (
                              <>
                                {this.state.listBannerData && typeof this.state.listBannerData !== "undefined" & this.state.listBannerData.length > 0 && this.state.listBannerData.map((itemCategoryList, l) => (
                                  <tr>
                                    <td>{l + 1}</td>
                                    <td>{itemCategoryList.page_name}</td>
                                    <td><img src={itemCategoryList.banner_img} alt="Banner Image" width="50" height="50" /></td>
                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" onClick={() => this.InfoBannerFun(itemCategoryList.banner_id)}><i className="fa fa-pencil m-r-5"></i> {this.props.t('adminEdit')}</a>
                                          <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemCategoryList.banner_id)}><i className="fa fa-trash-o m-r-5"></i> {this.props.t('adminDelete')}</a>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </>
                            )
                          }
                        })()}



                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>


          </div>



          <div id="add_form" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">  {this.props.t('adminAdd')} {this.props.t('adminBanner')}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                    <div class="row">
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminBanner')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" id="banner_page" name="banner_page" value={this.state.banner_page} onChange={this.changeBannerPage} required
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          >
                            <option value="">{this.props.t('select')} {this.props.t('adminBanner')}</option>
                            <option value="Home">Home</option>
                            <option value="Live">Live Ad Page</option>
                            <option value="Normal">Normal Ad Page</option>
                            <option value="MyBid">My Bid</option>
                            <option value="MyAd">My Ad</option>
                            <option value="Contact">Contact</option>
                            <option value="Info">Product Info</option>
                          </select>

                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminBanner')} {this.props.t('adminImage')}:<span style={{ color: "red" }}> *</span></label>
                          <input type="file" className="form-control" id="banner_img" name="banner_img" accept=".png, .jpg, .jpeg" onChange={this.onChangeBanner} required
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}
                          />
                          <span style={{ color: "red" }}>Image size should be 1500 x 500</span>
                        </div>
                      </div>

                    </div>
                    <div className="m-t-20 text-center">
                      <button className="btn btn-primary btn-lg" type="submit">{this.props.t('adminSubmit')}</button>
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
          </div>



          <div id="edit_form" className="modal custom-modal fade" role="dialog">
            <div className="modal-dialog modal-dialog-centered modal-md">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">{this.props.t('adminEdit')} {this.props.t('adminBanner')}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                    <div class="row">
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminBanner')}:</label>
                          <select className="form-control" id="banner_page" name="banner_page" value={this.state.edit_banner_name} onChange={this.changeEditBannerPage}>
                            <option value="">{this.props.t('select')} {this.props.t('adminBanner')}</option>
                            {/* <select className="form-control" value={this.state.edit_banner_name} onChange={this.changeEditBannerPage}  required>
                                  <option value=" ">{this.props.t('select')} {this.props.t('adminBanner')}</option> */}
                            <option value="Home">Home</option>
                            <option value="Live">Live Ad Page</option>
                            <option value="Normal">Normal Ad Page</option>
                            <option value="MyBid">My Bid</option>
                            <option value="MyAd">My Ad</option>
                            <option value="Contact">Contact</option>
                            <option value="Info">Product Info</option>
                          </select>

                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <img src={this.state.edit_banner_img_view} alt="Banner Image" width="250" height="250" />
                        </div>
                      </div>

                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminBanner')} {this.props.t('adminImage')}:</label>
                          <input type="file" className="form-control" id="edit_banner_img" name="edit_banner_img" accept=".png, .jpg, .jpeg" onChange={this.onChangeEditBanner} />
                          <span style={{ color: "red" }}>Image size should be 1500 x 500</span>
                        </div>
                      </div>

                    </div>
                    <div className="m-t-20 text-center">
                      <button className="btn btn-primary btn-lg" type="submit">{this.props.t('adminUpdate')}</button>
                    </div>
                    <CheckButton
                      style={{ display: "none" }}
                      ref={(c) => {
                        this.checkUpdateBtn = c;
                      }}
                    />
                  </Form>
                </div>
              </div>
            </div>
          </div>


          <div className="modal custom-modal fade" id="delete_modal" role="dialog">
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-body">
                  <div className="form-header">
                    <h3>{this.props.t('adminDelete')}</h3>
                    <p>{this.props.t('adminDeleteConfirmationMessage')}?</p>
                  </div>
                  <div className="modal-btn delete-action">
                    <div className="row">
                      <div className="col-6">
                        <a type="button" className="btn btn-primary continue-btn" data-dismiss="modal" onClick={() => this.handleDelete()} >{this.props.t('adminDelete')}</a>
                      </div>
                      <div className="col-6">
                        <a type="button" className="btn btn-primary cancel-btn" data-dismiss="modal">{this.props.t('adminCancel')}</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>





          {/*<Footer />*/}
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(withTranslation()(Dashboard));