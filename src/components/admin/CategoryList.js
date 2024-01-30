import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";

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

import DataTable from 'datatables.net';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";

import { CategoryAdd, CategoryList, CategoryInfo, CategoryUpdate, CategoryDelete } from "./../../actions/adminCategory";
import { withTranslation } from 'react-i18next';
import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListCategoryFun = this.ListCategoryFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoCategoryFun = this.InfoCategoryFun.bind(this);

    this.onChangeEditCategory = this.onChangeEditCategory.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listCategoryData: [],
        delete_id:0,
        category_name:'',
        category_name_Arabic:'',
        category_img:"",
        category_id:0,
        edit_category_name:'',
        edit_category_arabic_name:'',
        edit_category_img:'',
        edit_category_img_view:''


    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount=()=>{
    /*$(document).ready(function() {
          $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          } );
    });*/
    this.ListCategoryFun();
  }

  TableDataUpdate=()=>{
    let lang = localStorage.getItem("lang")
    $('#example').DataTable( {
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

 
  ListCategoryFun=()=>{
   
    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
        this.setState({
          listCategoryData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listCategoryData: []
        });

      });
  }
  handleDeleteConfirm =(unique_id)=>{
    this.setState({
        delete_id: unique_id,
      });
    $("#delete_modal").modal("show");
  }

  handleDelete =()=>{
    const { dispatch, history } = this.props;
    dispatch(CategoryDelete(this.state.delete_id))
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
            this.ListCategoryFun();
            window.location.reload();
        }else{
          toast.error(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeCategory=(e)=>{
    this.setState({
      // category_name: e.target.value,
      [e.target.name]:e.target.value
    });
  }
  //   onChangeCategoryImg=(e)=>{
  //   this.setState({
  //     category_img: e.target.files,
  //   });
  // }

  onChangeCategoryImg=(e)=>{

    if (e.target.files && e.target.files.length > 0) {
      if(e.target.files && typeof e.target.files !==undefined && e.target.files.length>0){
  
        var allowedTypes = ['image/jpeg','image/jpg','image/png'];
        var file = e.target.files[0];
        var fileType = file.type;
        if(!allowedTypes.includes(fileType)){
          alert('Please select a valid file format.');
          this.setState({
            category_img: "",
          });
          $("#category_img").val("");
        }else{
          
        
            this.setState({
              category_img: e.target.files,
            });
          
        }
      }
    }
  }
  closeForm=(e)=>{
    this.setState({ category_name: '',category_name_Arabic:'',category_img:'' });
              this.setState({ category_img: null });
              $("#category_img").val(null);
              
  }
  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(CategoryAdd(this.state.category_name,this.state.category_name_Arabic,this.state.category_img))
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
              this.ListCategoryFun();
              this.setState({ category_name: '',category_name_Arabic:'' });
              $("#category_img").val("");
              $("#add_form").modal("hide");
              window.location.reload();
            }else{
              toast.error(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
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

  InfoCategoryFun=(category_id)=>{

    const { dispatch, history } = this.props;
    dispatch(CategoryInfo(category_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              category_id: category_id,
              edit_category_name: response.data[0].category_name,
               edit_category_arabic_name:response.data[0].category_name_arabic,
              edit_category_img_view: response.data[0].category_img

            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditCategory=(e)=>{
    this.setState({
     [ e.target.name]: e.target.value,
    });
  }
  // onChangeEditCategoryImg=(e)=>{
  //   this.setState({
  //     edit_category_img: e.target.files,
  //   });
  // }
  onChangeEditCategoryImg=(e)=>{

    if (e.target.files && e.target.files.length > 0) {
      if(e.target.files && typeof e.target.files !==undefined && e.target.files.length>0){
  
        var allowedTypes = ['image/jpeg','image/jpg','image/png'];
        var file = e.target.files[0];
        var fileType = file.type;
        if(!allowedTypes.includes(fileType)){
          alert('Please select a valid file format.');
          this.setState({
            edit_category_img: "",
          });
          $("#edit_category_img").val("");
        }else{
          
        
            this.setState({
              edit_category_img: e.target.files,
            });
          
        }
      }
    }
  }
  handleUpdateSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Updateform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(CategoryUpdate(this.state.category_id, this.state.edit_category_name,this.state.edit_category_arabic_name, this.state.edit_category_img))
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
              this.ListCategoryFun();
              this.setState({ category_id: 0, edit_category_name: '',edit_category_img: '' });
              $("#edit_form").modal("hide");
              $("#edit_category_img").val("");
              window.location.reload();
            }else{
              toast.error(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
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
                      <h3 class="page-title">{this.props.t('adminCategory')}</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/admin/dashboard"}>{this.props.t('adminDashboard')}</Link></li>
                        <li class="breadcrumb-item active">{this.props.t('adminCategory')}</li>
                      </ul>
                    </div>
                    <div class="col-auto float-right ml-auto">
                      <a href="#" class="btn add-btn" title="Add Category" data-toggle="modal" data-target="#add_form"><i class="fa fa-plus"></i></a>
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
                      <table  id="example" className="table table-striped custom-table mb-0 datatable">
                        <thead>
                          <tr>
                            <th>{this.props.t('Id')}</th>
                            <th>{this.props.t('adminCategory')}</th>
                            <th>{this.props.t('adminCategory')} {this.props.t('In_Arabic')}</th>
                            <th>{this.props.t('adminImage')}</th>
                            <th className="text-right">{this.props.t('adminActions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                          if (this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0){
                          return (
                          <>
                          {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemCategoryList,l) => (
                            <tr>
                              <td>{l+1}</td>
                              <td>{itemCategoryList.category_name}</td>
                              <td>{itemCategoryList.category_name_arabic}</td>
                              <td><img src={itemCategoryList.category_img} width='50px' height="40px"/></td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={() => this.InfoCategoryFun(itemCategoryList.category_id)}><i className="fa fa-pencil m-r-5"></i> {this.props.t('adminEdit')}</a>
                                    <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemCategoryList.category_id)}><i className="fa fa-trash-o m-r-5"></i> {this.props.t('adminDelete')}</a>
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
                        <h4 className="modal-title">{this.props.t('adminAdd')} {this.props.t('adminCategory')}</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={this.closeForm}>&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                          <div className="form-group">
                                <label>{this.props.t('adminCategory')} {this.props.t('name')} :<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control"  placeholder={this.props.t('adminCategory')  + " "+ this.props.t('name')} id="category_name" name="category_name" value={this.state.category_name} onChange={this.onChangeCategory} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
                            </div>
                            <div className="form-group">
                                <label>{this.props.t('adminCategory')} {this.props.t('name')} {this.props.t('In_Arabic')}:<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control"  placeholder={this.props.t('adminCategory')  + " "+ this.props.t('name') + " "+ this.props.t('In_Arabic')} id="category_name" name="category_name_Arabic" value={this.state.category_name_Arabic} onChange={this.onChangeCategory} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminCategory')} {this.props.t('adminImage')}:<span style={{color:"red"}}> *</span></label>
                               <input type="file" className="form-control" id="category_img" accept=".png, .jpg, .jpeg" name="category_img" onChange={this.onChangeCategoryImg} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
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
                        <h4 className="modal-title">{this.props.t('adminEdit')} {this.props.t('adminCategory')}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminCategory')} {this.props.t('name')}:<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control"  placeholder={this.props.t('adminCategory')  + " "+ this.props.t('name')}  id="edit_category_name" name="edit_category_name" value={this.state.edit_category_name} onChange={this.onChangeEditCategory} required 
                                onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
                            </div>
                            <div className="form-group">
                                <label>{this.props.t('adminCategory')} {this.props.t('name')} {this.props.t('In_Arabic')}:<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control"  placeholder={this.props.t('adminCategory')  + " "+ this.props.t('name') + " "+ this.props.t('In_Arabic')} id="edit_category_name" name="edit_category_arabic_name" value={this.state.edit_category_arabic_name} onChange={this.onChangeEditCategory} required 
                                onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")} />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <img src={this.state.edit_category_img_view} alt="Category Image" width="250" height="250" />  
                            </div>
                          </div>
                          </div>
                         <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminCategory')} {this.props.t('adminImage')}:</label>
                               <input type="file" className="form-control" id="edit_category_img" accept=".png, .jpg, .jpeg"  name="edit_category_img" onChange={this.onChangeEditCategoryImg}  />
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
                      <h3>{this.props.t('adminDelete')} {this.props.t('adminCategory')}</h3>
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

export default connect(mapStateToProps) (withTranslation()(Dashboard));