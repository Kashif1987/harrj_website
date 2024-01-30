import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link, NavLink } from "react-router-dom";

import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";

import { connect } from "react-redux";
import { clearMessage } from "./../../actions/message";
import { history } from './../../helpers/history';
import { withTranslation } from 'react-i18next';
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
import { CategoryList } from "./../../actions/adminCategory";
import { SubCategoryListByCategory } from "../../actions/adminSubcategory";
import { SubCatBrandList } from "./../../actions/adminBrand";
import { ModelAdd, ModelList, ModelInfo, ModelUpdate, ModelDelete } from "./../../actions/adminModel";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Model extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListModelFun = this.ListModelFun.bind(this);
    this.ListBrandFun = this.ListBrandFun.bind(this);
    this.ListCategoryFun = this.ListCategoryFun.bind(this);
    this.ListSubCategoryFun = this.ListSubCategoryFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeModel = this.onChangeModel.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoModelFun = this.InfoModelFun.bind(this);

    this.onChangeEditModel = this.onChangeEditModel.bind(this);
    this.onChangeEditModelArabic = this.onChangeEditModelArabic.bind(this);
    this.onChangeEditModelDesc = this.onChangeEditModelDesc.bind(this);
    this.onChangeEditModelDescArabic = this.onChangeEditModelDescArabic.bind(this);
    this.onChangeEditCategory = this.onChangeEditCategory.bind(this);
    this.onChangeEditSubCategory = this.onChangeEditSubCategory.bind(this);
    this.onChangeEditBrand = this.onChangeEditBrand.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
      listModelData: [],
      listBrandData: [],
      listCategoryData: [],
      listSubCategoryData: [],
      category_id: 0,
      edit_category_id: 0,
      sub_category_id: 0,
      edit_sub_category_id: 0,
      delete_id: 0,
      model_name: '',
      model_desc: "",
      model_id: 0,
      edit_model_name: '',
      edit_model_desc: '',
      edit_model_desc_view: '',
      addModelList: [],

      edit_model_name_arabic: '',
      edit_model_description: '',
      edit_model_description_arabic: '',
      edit_brand_id: '',
      delete_id: 0,
      delete_true: false,

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
    var temp_arry = [];

    var temp_obj = { 'tmidx': 0, 'model_name': '', 'model_name_arabic': '', 'model_description': '', 'model_description_arabic': '' }

    temp_arry.push(temp_obj);

    this.setState({
      addModelList: temp_arry
    });
    this.ListCategoryFun();
    // this.ListBrandFun();
    this.ListModelFun();
  }
  handleAddModel = () => {
    var array = this.state.addModelList;
    if (array == 0) {
      var temp_arry = [];

      var temp_obj = { 'tmidx': 0, 'model_name': '', 'model_name_arabic': '', 'model_description': '', 'model_description_arabic': '' }

      temp_arry.push(temp_obj);

      this.setState({
        addModelList: temp_arry
      });
    } else {
      var array = this.state.addModelList;

      var temp_obj = { 'tmidx': array.length, 'model_name': '', 'model_name_arabic': '', 'model_description': '', 'model_description_arabic': '' }
      array.push(temp_obj);

      this.setState({
        addModelList: array
      });

    }
  }
  handleRemoveModel = (tmidx) => {
    console.log("remove brand")
    console.log(this.state.addModelList)
    var id = parseInt(tmidx)
    console.log(id)
    let filteredArray = this.state.addModelList.filter(item => item.tmidx !== id)
    this.setState({ addModelList: filteredArray });
  }
  onChangeEditCategory = (e) => {
    var catid = e.target.value
    this.setState({
      edit_category_id: e.target.value,
    }, () => {
      this.ListSubCategoryFun(catid)

    });
  }

  onChangeEditSubCategory = (e) => {
    var subcatid = e.target.value
    this.setState({
      edit_sub_category_id: e.target.value,
    }, () => {

      this.ListBrandFun(subcatid);
    });
  }

  onChangeEditBrand = (e) => {
    this.setState({
      edit_brand_id: e.target.value,
    });
  }

  ListSubCategoryFun = (categoryId) => {
    console.log("now categorylist ")

    const { dispatch, history } = this.props;
    dispatch(SubCategoryListByCategory(categoryId))
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: []
        });
      });
  }
  ListCategoryFun = () => {
    console.log("now categorylist ")

    const { dispatch, history } = this.props;
    dispatch(CategoryList())
      .then((response) => {
        this.setState({
          listCategoryData: response.data
        });
      })
      .catch(() => {
        this.setState({
          listCategoryData: []
        });
      });
  }
  ListBrandFun = (subcat_id) => {
    console.log("now brandlist ")
    const { dispatch, history } = this.props;
    dispatch(SubCatBrandList(subcat_id))
      .then((response) => {
        console.log("brand list now ")
        console.log(response.data)
        this.setState({
          listBrandData: response.data
        });

      })
      .catch(() => {
        this.setState({
          listBrandData: []
        });
      });
  }


  TableDataUpdate = () => {
    let lang = localStorage.getItem("lang")
    if (!this.state.delete_true) {
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
  }
  ListModelFun = () => {

    const { dispatch, history } = this.props;
    dispatch(ModelList())
      .then((response) => {
        this.setState({
          listModelData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listModelData: []
        });
      });
  }
  onChangeCategory = (e) => {
    var catid = e.target.value
    this.setState({
      category_id: e.target.value,
    }, () => {
      this.ListSubCategoryFun(catid)

    });
  }

  onChangeSubCategory = (e) => {
    var subcatid = e.target.value
    this.setState({
      sub_category_id: e.target.value,
    }
      , () => {

        this.ListBrandFun(subcatid);
      });
  }
  onChangeBrand = (e) => {
    console.log("brand sel")
    console.log(e.target.value)
    this.setState({
      brand_id: e.target.value,
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
    dispatch(ModelDelete(this.state.delete_id))
      .then((response) => {
        if (response.success || response.success === "true" || response.success === true) {
          toast.success( localStorage.getItem("lang") === "En"
          ? response.message
          : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
          this.setState({
            delete_id: 0,
          });
          this.setState({ delete_id: 0, delete_true: true }, () => {
            this.ListModelFun();
          });
          window.location.reload();
          this.ListModelFun();
        } else {
          toast.error( localStorage.getItem("lang") === "En"
          ? response.message
          : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }
  onChangeArabicModel = (e) => {
    // this.setState({
    //   model_name: e.target.value,
    // });

    var id = parseInt(e.target.id)
    let updatedItemList = this.state.addModelList.map((item) => {


      if (item.tmidx === id) {
        item = { ...item, model_name_arabic: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
    });
    console.log(updatedItemList)
    this.setState({
      addModelList: updatedItemList,
    }, () => {

      console.log("now subcategory array lis ist")
      console.log(this.state.addModelList)
    });
  }


  onChangeModel = (e) => {
    // this.setState({
    //   model_name: e.target.value,
    // });

    var id = parseInt(e.target.id)
    let updatedItemList = this.state.addModelList.map((item) => {


      if (item.tmidx === id) {
        item = { ...item, model_name: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
    });
    console.log(updatedItemList)
    this.setState({
      addModelList: updatedItemList,
    }, () => {

      console.log("now subcategory array lis ist")
      console.log(this.state.addModelList)
    });
  }

  onChangArabicModelDesc = (e) => {
    // this.setState({
    //   category_img: e.target.files,
    // });
    var id = parseInt(e.target.id)
    let updatedItemList = this.state.addModelList.map((item) => {
      if (item.tmidx === id) {
        item = { ...item, model_description_arabic: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
    });
    console.log(updatedItemList)
    this.setState({
      addModelList: updatedItemList,
    }, () => {


    });
  }
  onChangModelDesc = (e) => {
    // this.setState({
    //   category_img: e.target.files,
    // });
    var id = parseInt(e.target.id)
    let updatedItemList = this.state.addModelList.map((item) => {


      if (item.tmidx === id) {
        item = { ...item, model_description: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
    });
    console.log(updatedItemList)
    this.setState({
      addModelList: updatedItemList,
    }, () => {


    });
  }
  // closeForm=(e)=>{
  //   var temp_arry = [];

  //   var temp_obj = {'tmidx':0, 'model_name':'','model_name_arabic':'','model_description':'','model_description_arabic':''}

  //     temp_arry.push(temp_obj);

  //     this.setState({ 
  //       addModelList: temp_arry
  //     });
  //   //  this.setState({category_id:'',sub_category_id:'',brand_id:'',addModelList:''})
  //    $("#add_form").modal("hide");
  // }
  closeForm = (e) => {
    var temp_arry = [];

    var temp_obj = { 'tmidx': 0, 'model_name': '', 'model_name_arabic': '', 'model_description': '', 'model_description_arabic': '' }

    temp_arry.push(temp_obj);

    this.setState({
      addModelList: temp_arry,
      category_id: ''
    });
    this.setState({ category_id: '', sub_category_id: '', brand_id: '' });


    $(".model_name").val("");
    $(".model_name_arabic").val("");
    $(".model_description").val("");
    $(".model_description_arabic").val("");
    $("#add_form").modal("hide");

  }
  handleSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(ModelAdd(this.state.category_id, this.state.sub_category_id, this.state.brand_id, this.state.addModelList))
        .then((response) => {
          if (response.success || response.success === "true" || response.success === true) {
            toast.success(
              localStorage.getItem("lang") === "En"
                ? response.message
                : response?.message_arabic, 
            { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.ListModelFun();
            var temp_arry = [];

            // var temp_obj = {'tmidx':0, 'model_name':'','model_description':''}
            var temp_obj = { 'tmidx': 0, 'model_name': '', 'model_name_arabic': '', 'model_description': '', 'model_description_arabic': '' }
            temp_arry.push(temp_obj);

            this.setState({ category_id: '', sub_category_id: '', brand_id: '', addModelList: temp_arry });
            $("#add_form").modal("hide");
            window.location.reload();
          } else {
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
    var temp_arry = [];
    var temp_obj = { 'tmidx': 0, 'model_name': '', 'model_name_arabic': '', 'model_description': '', 'model_description_arabic': '' }
    // var temp_obj = {'tmidx':0, 'model_name':'','model_description':''}

    temp_arry.push(temp_obj);

    this.setState({
      addModelList: temp_arry
    });
  }

  InfoModelFun = (model_id) => {
    console.log("info model 1")
    const { dispatch, history } = this.props;
    dispatch(ModelInfo(model_id))
      .then((response) => {
        if (response.data && typeof response.data !== "undefined" && response.data.length > 0) {
          console.log("info model")
          this.setState({
            model_id: model_id,
            edit_category_id: response.data[0].category_id,
            edit_sub_category_id: response.data[0].sub_category_id,
            edit_brand_id: response.data[0].brand_id,
            edit_model_name: response.data[0].model_name,
            edit_model_name_arabic: response.data[0].model_name_arabic,
            edit_model_description: response.data[0].model_description,
            edit_model_description_arabic: response.data[0].model_description_arabic,
            edit_model_desc_view: response.data[0].model_desc

          }, () => {
            console.log("values of Info")
            console.log(this.state.edit_category_id);
            console.log(this.state.edit_sub_category_id);
            this.ListSubCategoryFun(response.data[0].category_id)
            this.ListBrandFun(response.data[0].sub_category_id)

          });
          $("#edit_form").modal("show");
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditModel = (e) => {
    this.setState({
      edit_model_name: e.target.value,
    });
  }
  onChangeEditModelArabic = (e) => {
    this.setState({
      edit_model_name_arabic: e.target.value,
    });
  }
  onChangeEditModelDesc = (e) => {
    this.setState({
      edit_model_description: e.target.value,
    });
  }
  onChangeEditModelDescArabic = (e) => {
    this.setState({
      edit_model_description_arabic: e.target.value,
    });
  }
  onChangeEditBrandImg = (e) => {
    this.setState({
      edit_model_desc: e.target.value,
    });
  }
  closeUpdateForm = (e) => {


  }
  handleUpdateSubmit = (e) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Updateform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkUpdateBtn.context._errors.length === 0) {
      dispatch(ModelUpdate(this.state.model_id, this.state.edit_category_id, this.state.edit_sub_category_id, this.state.edit_brand_id, this.state.edit_model_name, this.state.edit_model_name_arabic, this.state.edit_model_description, this.state.edit_model_description_arabic))
        .then((response) => {
          if (response.success || response.success === "true" || response.success === true) {
            toast.success( localStorage.getItem("lang") === "En"
            ? response.message
            : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.ListModelFun();
            this.setState({ category_id: 0, edit_category_name: '', edit_category_img: '', edit_brand_id: '', edit_model_name: '', edit_model_name_arabic: '', edit_model_description: '', edit_model_description_arabic: '' });
            $("#edit_form").modal("hide");
            window.location.reload();
          } else {
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
                    <h3 class="page-title">{this.props.t('adminModel')}</h3>
                    <ul class="breadcrumb">
                      <li class="breadcrumb-item"><Link to={"/admin/dashboard"}>{this.props.t('adminDashboard')}</Link></li>
                      <li class="breadcrumb-item active">{this.props.t('adminModel')}</li>
                    </ul>
                  </div>
                  <div class="col-auto float-right ml-auto">
                    <a href="#" class="btn add-btn" title="Add Brand" data-toggle="modal" data-target="#add_form"><i class="fa fa-plus"></i></a>
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
                          <th>{this.props.t('adminCategory')}</th>
                          <th>{this.props.t('adminSubCat')}</th>
                          <th>{this.props.t('adminBrand')}</th>
                          <th>{this.props.t('adminModel')} {this.props.t('name')}</th>
                          {/* <th>{this.props.t('adminModel')} {this.props.t('discp')}</th> */}
                          <th className="text-right">{this.props.t('adminActions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          if (this.state.listModelData && typeof this.state.listModelData !== "undefined" & this.state.listModelData.length > 0) {
                            return (
                              <>
                                {this.state.listModelData && typeof this.state.listModelData !== "undefined" & this.state.listModelData.length > 0 && this.state.listModelData.map((itemModelList, l) => (
                                  <tr>
                                    <td>{l + 1}</td>
                                    <td>{itemModelList.category_name}</td>
                                    <td>{itemModelList.sub_category_name}</td>
                                    <td>{itemModelList.brand_name}</td>
                                    <td>{itemModelList.model_name}</td>
                                    {/* <td>{itemModelList.model_description}</td> */}
                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" onClick={() => this.InfoModelFun(itemModelList.model_id)}><i className="fa fa-pencil m-r-5"></i> {this.props.t('adminEdit')}</a>
                                          <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemModelList.model_id)}><i className="fa fa-trash-o m-r-5"></i> {this.props.t('adminDelete')}</a>
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
                  <h4 className="modal-title">{this.props.t('adminAdd')} {this.props.t('adminModel')}</h4>
                  <button type="button" className="close" data-dismiss="modal" onClick={this.closeForm}>&times;</button>
                </div>
                <div class="modal-body">
                  <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                    <div class="row">
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminCategory')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder="Category" id="category_id" name="category_id" value={this.state.category_id} onChange={this.onChangeCategory} required  onInvalid={(e) =>
                                    e.target.setCustomValidity(
                                      this.props.t("input_err_msg")
                                    )
                                  }
                                  onInput={(e) => e.target.setCustomValidity("")} >
                            <option value="">{this.props.t('select')} {this.props.t('adminCategory')}</option>
                            {this.state.listCategoryData && typeof this.state.listCategoryData !== "undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList, m) => (
                              <option value={itemTaskList.category_id}>
                                {this.props.i18n.language === 'en' ? itemTaskList.category_name : itemTaskList.category_name_arabic}
                                {/* {itemTaskList.category_name} */}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminSubCat')}  {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder="Sub Category" id="sub_category_id" name="sub_category_id" value={this.state.sub_category_id} onChange={this.onChangeSubCategory} required 
                           onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")} >
                            <option value="">{this.props.t('select')} {this.props.t('adminSubCat')}</option>
                            {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !== "undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList, m) => (
                              <option value={itemTaskList.sub_category_id}>
                                {this.props.i18n.language === 'en' ? itemTaskList.sub_category_name : itemTaskList.sub_category_name_arabic}
                                {/* {itemTaskList.sub_category_name} */}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminBrand')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder={this.props.t('adminModel') + " " + this.props.t('name')} id="brand_id" name="brand_id" value={this.state.brand_id} onChange={this.onChangeBrand} required 
                           onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")} >
                            <option value="">{this.props.t('select')} {this.props.t('adminBrand')}</option>
                            {this.state.listBrandData && typeof this.state.listBrandData !== "undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList, m) => (
                              <option value={itemTaskList.brand_id}>
                                {this.props.i18n.language === 'en' ? itemTaskList.brand_name : itemTaskList.brand_name_arabic}
                                {/* {itemTaskList.brand_name} */}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>


                    </div>
                    {this.state.addModelList.map((itemaddModelList, tmidx) => (
                      <div class="row">
                        <div class="col-sm-12">
                          <div className="form-group">
                            <label>{this.props.t('adminModel')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                            <input type="text" className="form-control model_name" placeholder={this.props.t('adminModel') + " " + this.props.t('name')} id={tmidx} name="model_name" value={itemaddModelList.model_name} onChange={this.onChangeModel} required 
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")} />
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div className="form-group">
                            <label>{this.props.t('adminModel')} {this.props.t('name')} {this.props.t('In_Arabic')}:<span style={{ color: "red" }}> *</span></label>
                            <input type="text" className="form-control model_name_arabic" placeholder={this.props.t('adminModel') + " " + this.props.t('name') + " " + this.props.t('In_Arabic')} id={tmidx} name="model_name" value={itemaddModelList.model_name_arabic} onChange={this.onChangeArabicModel} required 
                             onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")} />
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div className="form-group">
                            <label>{this.props.t('adminModel')} {this.props.t('discp')}:<span style={{ color: "red" }}> *</span></label>
                            <textarea className="form-control model_description" id={tmidx} name="model_desc" placeholder={this.props.t('adminModel') + " " + this.props.t('discp')} value={itemaddModelList.model_description} onChange={this.onChangModelDesc} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")} />
                          </div>
                        </div>
                        <div class="col-sm-12">
                          <div className="form-group">
                            <label>{this.props.t('adminModel')} {this.props.t('discp')} {this.props.t('In_Arabic')}:<span style={{ color: "red" }}> *</span></label>
                            <textarea className="form-control model_description_arabic" id={tmidx} name="model_desc" placeholder={this.props.t('adminModel') + " " + this.props.t('discp') + " " + this.props.t('In_Arabic')} value={itemaddModelList.model_description_arabic} onChange={this.onChangArabicModelDesc} required 
                            onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")} />
                          </div>
                        </div>

                        {(() => {
                          if (tmidx === this.state.addModelList.length - 1) {
                            return (
                              <div class="col-sm-3">
                                <div className="form-group">
                                  <a class="text-success font-18" title="Add">
                                    <i class="fa fa-plus" onClick={this.handleAddModel} ></i>
                                  </a>
                                </div>
                              </div>
                            )
                          }
                        })()}
                        {(() => {
                          if (tmidx > 0 && tmidx === this.state.addModelList.length - 1) {
                            return (
                              <div class="col-sm-3">
                                <div className="form-group">
                                  <a class="text-danger font-18" title="Remove">
                                    <i class="fa fa-trash-o" onClick={() => this.handleRemoveModel(tmidx)} ></i>
                                  </a>
                                </div>
                              </div>
                            )
                          }
                        })()}
                      </div>
                    ))}
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
                  <h4 className="modal-title">{this.props.t('adminEdit')} {this.props.t('adminModel')}</h4>
                  <button type="button" className="close" data-dismiss="modal" onClick={this.closeUpdateForm}>&times;</button>
                </div>
                <div class="modal-body">
                  <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                    <div class="row">
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminCategory')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder="Category" id="edit_category_id" name="edit_category_id" value={this.state.edit_category_id} onChange={this.onChangeEditCategory} required
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}  >
                            <option value="">{this.props.t('select')} {this.props.t('adminCategory')}</option>
                            {this.state.listCategoryData && typeof this.state.listCategoryData !== "undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList, m) => (
                              <option value={itemTaskList.category_id}>
                                {this.props.i18n.language === 'en' ? itemTaskList.category_name : itemTaskList.category_name_arabic}
                                {/* {itemTaskList.category_name} */}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminSubCat')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder="Sub Category" id="edit_sub_category_id" name="edit_sub_category_id" value={this.state.edit_sub_category_id} onChange={this.onChangeEditSubCategory} required 
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")} >
                            <option value="">{this.props.t('select')} {this.props.t('adminSubCat')}</option>
                            {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !== "undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList, m) => (
                              <option value={itemTaskList.sub_category_id}>
                                {this.props.i18n.language === 'en' ? itemTaskList.sub_category_name : itemTaskList.sub_category_name_arabic}
                                {/* {itemTaskList.sub_category_name} */}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminBrand')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder="Brand" id="edit_brand_id" name="edit_brand_id" value={this.state.edit_brand_id} onChange={this.onChangeEditBrand} required 
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")}  >
                            <option value="">{this.props.t('select')} {this.props.t('adminBrand')}</option>
                            {this.state.listBrandData && typeof this.state.listBrandData !== "undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemTaskList, m) => (
                              <option value={itemTaskList.brand_id}>
                                {this.props.i18n.language === 'en' ? itemTaskList.brand_name : itemTaskList.brand_name_arabic}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminModel')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <input type="text" className="form-control" placeholder={this.props.t('adminModel') + " " + this.props.t('name')} id="edit_model_name" name="model_name" value={this.state.edit_model_name} onChange={this.onChangeEditModel} required 
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")} />
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminModel')} {this.props.t('name')} {this.props.t('In_Arabic')}:<span style={{ color: "red" }}> *</span></label>
                          <input type="text" className="form-control" placeholder={this.props.t('adminModel') + " " + this.props.t('name') + " " + this.props.t('In_Arabic')} id="edit_model_name_arabic" name="model_name" value={this.state.edit_model_name_arabic} onChange={this.onChangeEditModelArabic} required 
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")} />
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label> {this.props.t('adminModel')} {this.props.t('discp')}:<span style={{ color: "red" }}> *</span></label>
                          <textarea className="form-control" placeholder={this.props.t('adminModel') + " " + this.props.t('discp')} id="edit_model_description" name="model_name" value={this.state.edit_model_description} onChange={this.onChangeEditModelDesc} required 
                          onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                          onInput={(e) => e.target.setCustomValidity("")} />
                        </div>
                      </div>
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label> {this.props.t('adminModel')} {this.props.t('discp')} {this.props.t('In_Arabic')} :<span style={{ color: "red" }}> *</span></label>
                          <textarea className="form-control" placeholder={this.props.t('adminModel') + " " + this.props.t('discp') + " " + this.props.t('In_Arabic')} id="edit_model_description_arabic" name="model_name" value={this.state.edit_model_description_arabic} onChange={this.onChangeEditModelDescArabic} required 
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
                    <h3>{this.props.t('adminDelete')} {this.props.t('adminModel')}</h3>
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

export default connect(mapStateToProps)(withTranslation()(Model));