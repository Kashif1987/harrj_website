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
import { withTranslation } from 'react-i18next';
import { YearAdd, YearList, YearInfo, YearUpdate, YearDelete } from "./../../actions/adminYear";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Year extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListYearFun = this.ListYearFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeYear = this.onChangeYear.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoyearFun = this.InfoyearFun.bind(this);

    this.onChangeEditYear = this.onChangeEditYear.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listYearData: [],
        delete_id:0,
        year:'',
        
        year_id:0,
        edit_year:'',

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
    this.ListYearFun();
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

  ListYearFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(YearList())
      .then((response) => {
        this.setState({
            listYearData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
            listYearData: []
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
    dispatch(YearDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
          toast.success( localStorage.getItem("lang") === "En"
          ? response.message
          : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            this.ListYearFun();
            window.location.reload();
        }else{
          toast.error( localStorage.getItem("lang") === "En"
          ? response.message
          : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeYear=(e)=>{
    this.setState({
      year: e.target.value,
    });
  }
   

  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(YearAdd(this.state.year))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success( localStorage.getItem("lang") === "En"
              ? response.message
              : response?.message_arabic,{ position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListYearFun();
              this.setState({ year: '' });
            
              $("#add_form").modal("hide");
              window.location.reload();
            }else{
              toast.error( localStorage.getItem("lang") === "En"
              ? response.message
              : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
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

  InfoyearFun=(year_id)=>{

    const { dispatch, history } = this.props;
    dispatch(YearInfo(year_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              year_id: response.data[0].year_id,
              edit_year: response.data[0].year,
             

            });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditYear=(e)=>{
    this.setState({
      edit_year: e.target.value,
    });
  }
  

  handleUpdateSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Updateform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(YearUpdate(this.state.year_id, this.state.edit_year))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success( localStorage.getItem("lang") === "En"
              ? response.message
              : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListYearFun();
              this.setState({ year_id: 0, edit_year: '' });
              $("#edit_form").modal("hide");
              window.location.reload();
            }else{
              toast.error( localStorage.getItem("lang") === "En"
              ? response.message
              : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
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
                      <h3 class="page-title">{this.props.t('adminYear')}</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/admin/dashboard"}>{this.props.t('adminDashboard')}</Link></li>
                        <li class="breadcrumb-item active">{this.props.t('adminYear')}</li>
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
                            <th>{this.props.t('adminYear')}</th>
                            
                            <th className="text-right">{this.props.t('adminActions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                          if (this.state.listYearData && typeof this.state.listYearData !=="undefined" & this.state.listYearData.length > 0){
                          return (
                          <>
                          {this.state.listYearData && typeof this.state.listYearData !=="undefined" & this.state.listYearData.length > 0 && this.state.listYearData.map((itemYearList,l) => (
                            <tr>
                              <td>{l+1}</td>
                              <td>{itemYearList.year}</td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={() => this.InfoyearFun(itemYearList.year_id)}><i className="fa fa-pencil m-r-5"></i> {this.props.t('adminEdit')}</a>
                                    <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemYearList.year_id)}><i className="fa fa-trash-o m-r-5"></i> {this.props.t('adminDelete')}</a>
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
                        <h4 className="modal-title">{this.props.t('adminAdd')} {this.props.t('adminYear')}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminYear')}:<span style={{color:"red"}}> *</span></label>
                                <input type="number" className="form-control" placeholder={this.props.t('adminYear')} id="year" name="year" value={this.state.year} onChange={this.onChangeYear} required 
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
                          
                          </div>
                        </div>
                        <div className="m-t-20 text-center">
                            <button className="btn btn-primary btn-lg" type="submit">{this.props.t('submit')}</button>
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
                        <h4 className="modal-title">{this.props.t('adminEdit')} {this.props.t('adminYear')}</h4>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label> {this.props.t('adminYear')}:<span style={{color:"red"}}> *</span></label>
                                <input type="number" className="form-control" placeholder={this.props.t('adminYear')} id="edit_year" name="edit_year" value={this.state.edit_year} onChange={this.onChangeEditYear} required 
                                 onInvalid={(e) =>
                                  e.target.setCustomValidity(
                                    this.props.t("input_err_msg")
                                  )
                                }
                                onInput={(e) => e.target.setCustomValidity("")} />
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
                      <h3>{this.props.t('adminDelete')} {this.props.t('adminYear')}</h3>
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

export default connect(mapStateToProps) (withTranslation() (Year));