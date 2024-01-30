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

import DataTable from 'datatables.net';

import './../../assets/css/bootstrap.min.css'
import "./../../assets/css/font-awesome.min.css";
import "./../../assets/css/style.css"
import "./../../assets/css/custom.css"
//import "./../../App.css";

import { withTranslation } from 'react-i18next';

import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import { CategoryList } from "./../../actions/adminCategory";
import { SubCategoryAdd, SubCategoryList, SubCategoryInfo, SubCategoryUpdate, SubCategoryDelete } from "./../../actions/adminSubcategory";

import Header from './Header';
import SideBar from './SideBar';


import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const checkedIcon = <CheckBoxIcon fontSize="small" />;
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;

toast.configure();

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListCategoryFun = this.ListCategoryFun.bind(this);
    this.ListSubCategoryFun = this.ListSubCategoryFun.bind(this);

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory = this.onChangeSubCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoSubCategoryFun = this.InfoSubCategoryFun.bind(this);

    this.onChangeEditCategory = this.onChangeEditCategory.bind(this);
    this.onChangeEditSubCategory = this.onChangeEditSubCategory.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);
    this.handleAddSubCategory = this.handleAddSubCategory.bind(this);
    this.state = {
      listCategoryData: [],
      listSubCategoryData: [],
      delete_id: 0,
      category_id: 0,

      sub_category_name: '',
      sub_category_img: '',

      sub_category_id: 0,
      edit_selected: 0,
      edit_category_id: 0,
      edit_sub_category_name: '',
      edit_sub_cat_arabic_name: '',
      edit_sub_category_img: '',
      edit_sub_category_view_img: '',
      edit_year_applies: 0,
      selected: 0,
      addSubCatList: [],
      delete_true: false,
      delete_id: 0,

    };

    history.listen((location) => {
      props.dispatch(clearMessage()); // clear message when changing location
    });
  }

  componentDidMount() {
    /*$(document).ready(function() {
          $('#example').DataTable( {
              dom: 'Bfrtip',
              buttons: [
                  'copy', 'csv', 'excel', 'pdf', 'print'
              ]
          } );
      } );*/

    var temp_arry = [];

    var temp_obj = { 'tmidx': 0, 'sub_cat': '', 'sub_cat_arabic': '', 'subcat_img': '', 'needchec': '' }

    temp_arry.push(temp_obj);

    this.setState({
      addSubCatList: temp_arry
    });
    this.ListCategoryFun();
    this.ListSubCategoryFun();
  }

  // TableDataUpdate=()=>{

  //   if(!this.state.delete_true){
  //     $('#example').DataTable( {
  //       dom: 'Blfrtip',
  //       buttons: [
  //           'copy', 'csv', 'excel', 'pdf', 'print'
  //       ],
  //       retrieve: true,
  //     });
  //   }

  // }
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

  handleAddSubCategory = () => {
    var array = this.state.addSubCatList;
    if (array == 0) {
      var temp_arry = [];

      var temp_obj = { 'tmidx': 0, 'sub_cat': '', 'sub_cat_arabic': '', 'subcat_img': '', 'needchec': '' }

      temp_arry.push(temp_obj);

      this.setState({
        addSubCatList: temp_arry
      });
    } else {
      var array = this.state.addSubCatList;
      console.log("array len")
      console.log(array.length)
      var temp_obj = { 'tmidx': array.length, 'sub_cat': '', 'sub_cat_arabic': '', 'subcat_img': '', 'needchec': '' }
      array.push(temp_obj);

      this.setState({
        addSubCatList: array
      });
      // array.push({ tmidx: array.length + 1 });
      // this.setState({ addSubCatList: array });
      console.log("now ")
      console.log(this.state.addSubCatList)
    }
  }
  handleRemoveSubCat = (tmidx) => {
    var id = parseInt(tmidx)

    console.log(this.state.addSubCatList)
    let filteredArray = this.state.addSubCatList.filter(item => item.tmidx !== id)
    this.setState({ addSubCatList: filteredArray });

  }
  ListCategoryFun = () => {

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

  ListSubCategoryFun = () => {

    const { dispatch, history } = this.props;
    dispatch(SubCategoryList())
      .then((response) => {
        this.setState({
          listSubCategoryData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
          listSubCategoryData: []
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
    dispatch(SubCategoryDelete(this.state.delete_id))
      .then((response) => {
        if (response.success || response.success === "true" || response.success === true) {
          toast.success(localStorage.getItem("lang") === "En"
            ? response.message
            : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
          this.setState({
            delete_id: 0,
          });
          this.setState({ delete_id: 0, delete_true: true }, () => {
            this.ListSubCategoryFun();
          });
          window.location.reload();
        } else {
          toast.error(localStorage.getItem("lang") === "En"
            ? response.message
            : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeCategory = (e) => {
    this.setState({
      category_id: e.target.value,
    });
  }
  onChangeSubCategoryArabic = (e) => {
    // this.setState({
    //   sub_category_name: e.target.value,
    // });
    var id = parseInt(e.target.id)
    let updatedItemList = this.state.addSubCatList.map((item) => {


      if (item.tmidx === id) {
        item = { ...item, sub_cat_arabic: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
    });
    console.log(updatedItemList)
    this.setState({
      addSubCatList: updatedItemList,
    }, () => {

      console.log("now subcategory array lis ist")
      console.log(this.state.addSubCatList)
    });
  }
  onChangeSubCategory = (e) => {
    // this.setState({
    //   sub_category_name: e.target.value,
    // });
    var id = parseInt(e.target.id)
    let updatedItemList = this.state.addSubCatList.map((item) => {


      if (item.tmidx === id) {
        item = { ...item, sub_cat: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
    });
    console.log(updatedItemList)
    this.setState({
      addSubCatList: updatedItemList,
    }, () => {

      console.log("now subcategory array lis ist")
      console.log(this.state.addSubCatList)
    });
  }

  onChangeSubCategoryImg = (e) => {

    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files && typeof e.target.files !== undefined && e.target.files.length > 0) {

        var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        var file = e.target.files[0];
        var fileType = file.type;
        if (!allowedTypes.includes(fileType)) {
          alert('Please select a valid file format.');
          this.setState({
            subcat_img: "",
          });
          $("#subcat_img").val("");
        } else {


          this.setState({
            subcat_img: e.target.files,
          });

        }
      }
    }
  }
  onChangeSubCategoryImg = (e) => {
    // this.setState({
    //   sub_category_img: e.target.files,
    // });
    var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    var file = e.target.files[0];
    var fileType = file.type;
    if (!allowedTypes.includes(fileType)) {
      alert('Please select a valid file format.');

      this.setState({
        subcat_img: "",
      });
      $(".subcat_img").val("");
    }
    else {

      this.setState({
        subcat_img: e.target.files,
      });

    }
    console.log("image event fired")
    var id = parseInt(e.target.id)
    var id = parseInt(e.target.id)
    console.log("id")
    console.log(id)
    console.log(e.target.files[0])
    let updatedItemList = this.state.addSubCatList.map((item) => {

      if (item.tmidx === id) {
        item = { ...item, subcat_img: e.target.files[0] };
        // return { ...item, sub_cat: e.target.value };
        console.log("now item")
        console.log(item)
      }
      return item;
    });

    this.setState({
      addSubCatList: updatedItemList,
    }
    );
  }
  Yearchecked = event => {
    console.log("now selected")
    console.log(event.target.checked)
    this.setState({ selected: event.target.checked ? 1 : 0 })
    var id = parseInt(event.target.id)
    let updatedItemList = this.state.addSubCatList.map((item) => {

      if (item.tmidx === id) {
        item = { ...item, needchec: event.target.checked ? 1 : 0 };

      }
      return item;
    });
    console.log(updatedItemList)
    this.setState({
      addSubCatList: updatedItemList,
    }
    );
  }
  EditYearchecked = event => {
    console.log("checked value")
    console.log(event.target.checked)
    this.setState({ edit_selected: event.target.checked ? 1 : 0 })
  }
  closeForm = (e) => {
    var temp_arry = [];

    var temp_obj = { 'tmidx': 0, 'sub_cat': '', 'sub_cat_arabic': '', 'subcat_img': '', 'needchec': '' }

    temp_arry.push(temp_obj);

    this.setState({
      addSubCatList: temp_arry,
      category_id: ''
    });
    this.setState({ category_id: '', addSubCatList: [{}], subCategoryNameVar: '', subCategoryArabicNameVar: '', subCategoryImgArry: '', subCategoryyearVar: '' });
    $(".add_subcat_img").val(null);
    $(".add_year").prop("checked", false);

    $("#add_form").modal("hide");
    $(".add_subcat_name_arabic").val("");
    // $("#needchec").prop("checked", false);
  }



  handleSubmit = (e) => {
    e.preventDefault();

    var subCategoryNameVar = $(".add_subcat_name").map(function () { return $(this).val(); }).get();
    var subCategoryArabicNameVar = $(".add_subcat_name_arabic").map(function () { return $(this).val(); }).get();
    // var subCategoryyearVar = $(".add_year").map(function () { return $(this).val(); }).get();
    // var subCategoryyearVar = $(".add_year").map(function() {
    //   return $(this).is(':checked');
    // }).get();
    var addSubCatList = this.state.addSubCatList
    var subCategoryyearVar = []
    for (var i = 0; i < addSubCatList.length; i++) {
      subCategoryyearVar.push(addSubCatList[i].needchec)
      console.log("addSubCatList____" + subCategoryyearVar);
    }


    console.log("subCategoryyearVar+++" + subCategoryyearVar)
    var subCategoryImgArry = [];
    $('.add_subcat_img').each(function (index, element) {
      console.log("element: ")
      console.log(element.files[0])
      subCategoryImgArry.push(element.files[0]);
    });


    this.Addform.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      dispatch(SubCategoryAdd(this.state.category_id, subCategoryNameVar, subCategoryArabicNameVar, subCategoryImgArry, subCategoryyearVar))
        .then((response) => {
          if (response.success || response.success === "true" || response.success === true) {
            toast.success(localStorage.getItem("lang") === "En"
              ? response.message
              : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            //  this.setState({ category_id: '', sub_category_name: '' });
            //   var temp_obj = {'tmidx':0, 'sub_cat':'','subcat_img':'','needchec':''}

            // temp_arry.push(temp_obj);

            // this.setState({
            //   addSubCatList: temp_arry,
            //   category_id:''
            // });
            // this.setState({ category_id:0, addSubCatList:[] });
            $("#add_form").modal("hide");
            $(".subcat_img").val("");
            $(".add_year").prop("checked", false);
            $(".add_subcat_name").val("");
            $(".add_subcat_name_arabic").val("");
            //  $("#needchec").val(null);
            this.ListSubCategoryFun();
            this.setState({ category_id: '', addSubCatList: [{}], subCategoryNameVar: '', subCategoryArabicNameVar: '', subCategoryImgArry: '', subCategoryyearVar: '' });
            window.location.reload();
          } else {
            toast.error(localStorage.getItem("lang") === "En"
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
    // var temp_arry = [];

    //   var temp_obj = {'tmidx':0, 'sub_cat':'','subcat_img':'','needchec':''}

    //   temp_arry.push(temp_obj);

    // this.setState({
    // addSubCatList: temp_arry,
    // category_id:''
    // });

    $(".add_subcat_img").val(null);

  }

  InfoSubCategoryFun = (sub_category_id) => {

    const { dispatch, history } = this.props;
    dispatch(SubCategoryInfo(sub_category_id))
      .then((response) => {
        if (response.data && typeof response.data !== "undefined" && response.data.length > 0) {
          this.setState({
            sub_category_id: sub_category_id,
            edit_category_id: response.data[0].category_id,
            edit_sub_category_name: response.data[0].sub_category_name,
            edit_sub_cat_arabic_name: response.data[0].sub_category_name_arabic,
            edit_sub_category_view_img: response.data[0].sub_category_img,
            edit_sub_category_img: response.data[0].sub_category_img,
            edit_selected: response.data[0].sub_category_year_applies == 1 ? 1 : 0,


          });
          this.ListSubCategoryFun(response.data[0].category_id);
          $("#edit_form").modal("show");
        }
      })
      .catch((error) => {
      });
  }

  // onChangeEditCategory=(e)=>{
  //   this.setState({
  //     edit_category_id: e.target.value,
  //   });
  // }
  onChangeEditCategory = (e) => {
    var catid = e.target.value
    this.setState({
      edit_category_id: e.target.value,
    }, () => {
      this.ListSubCategoryFun(catid);
    });

  }
  onChangeEditSubCategory = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeEditSubCategoryImg = (e) => {

    if (e.target.files && e.target.files.length > 0) {
      if (e.target.files && typeof e.target.files !== undefined && e.target.files.length > 0) {

        var allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
        var file = e.target.files[0];
        var fileType = file.type;
        if (!allowedTypes.includes(fileType)) {
          alert('Please select a valid file format.');
          this.setState({
            edit_sub_category_img: "",
          });
          $("#edit_sub_category_img").val("");
        } else {


          this.setState({
            edit_sub_category_img: e.target.files,
          });

        }
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
      dispatch(SubCategoryUpdate(this.state.sub_category_id, this.state.edit_category_id, this.state.edit_sub_category_name, this.state.edit_sub_cat_arabic_name, this.state.edit_sub_category_img, this.state.edit_selected))
        .then((response) => {
          if (response.success || response.success === "true" || response.success === true) {
            toast.success(localStorage.getItem("lang") === "En"
              ? response.message
              : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.ListSubCategoryFun();
            this.setState({ sub_category_id: 0, edit_category_id: 0, edit_sub_category_name: '', edit_sub_cat_arabic_name: '' });
            $("#edit_form").modal("hide");
            $("#edit_sub_category_img").val("");
            window.location.reload();
          } else {
            toast.error(localStorage.getItem("lang") === "En"
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
    var tmidx = 0

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
                    <h3 class="page-title">{this.props.t('adminSubCat')}</h3>
                    <ul class="breadcrumb">
                      <li class="breadcrumb-item"><Link to={"/admin/dashboard"}>{this.props.t('adminDashboard')}</Link></li>
                      <li class="breadcrumb-item active">{this.props.t('adminSubCat')}</li>
                    </ul>
                  </div>
                  <div class="col-auto float-right ml-auto">
                    <a href="#" class="btn add-btn" data-toggle="modal" title="Add Subcategory" data-target="#add_form"><i class="fa fa-plus"></i></a>
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
                          <th>{this.props.t('adminSubCat')} {this.props.t('In_Arabic')}</th>
                          <th>{this.props.t('adminImage')}</th>
                          <th className="text-right">{this.props.t('adminActions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(() => {
                          if (this.state.listSubCategoryData && typeof this.state.listSubCategoryData !== "undefined" & this.state.listSubCategoryData.length > 0) {
                            return (
                              <>
                                {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !== "undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemSubCategoryList, l) => (
                                  <tr>
                                    <td>{l + 1}</td>
                                    <td>{itemSubCategoryList.category_name}</td>
                                    <td>{itemSubCategoryList.sub_category_name}</td>
                                    <td>{itemSubCategoryList.sub_category_name_arabic}  </td>

                                    <td><img src={itemSubCategoryList.sub_category_img} width='50px' height="40px" /></td>
                                    <td className="text-right">
                                      <div className="dropdown dropdown-action">
                                        <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                        <div className="dropdown-menu dropdown-menu-right">
                                          <a className="dropdown-item" onClick={() => this.InfoSubCategoryFun(itemSubCategoryList.sub_category_id)}><i className="fa fa-pencil m-r-5"></i> {this.props.t('adminEdit')}</a>
                                          <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemSubCategoryList.sub_category_id)}><i className="fa fa-trash-o m-r-5"></i> {this.props.t('adminDelete')}</a>
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
                  <h4 className="modal-title">{this.props.t('adminAdd')} {this.props.t('adminSubCat')}</h4>
                  <button type="button" className="close" data-dismiss="modal" onClick={this.closeForm}>&times;</button>
                </div>
                <div class="modal-body">
                  <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                    <div class="row">
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminCategory')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder={this.props.t('adminCategory') + " " + this.props.t('name')} id="category_id" name="category_id" value={this.state.category_id} onChange={this.onChangeCategory} required onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                            onInput={(e) => e.target.setCustomValidity("")}  >
                            <option value="">{this.props.t('select')} {this.props.t('adminCategory')}</option>
                            {this.state.listCategoryData && typeof this.state.listCategoryData !== "undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList, m) => (
                              <option value={itemTaskList.category_id}>
                                {this.props.i18n.language === 'en' ? itemTaskList.category_name : itemTaskList.category_name_arabic}



                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                    {/*  <div class="col-sm-12">
                            <div className="form-group">
                                <label>Sub Category:</label>
                                <input type="text" className="form-control" placeholder="Sub Category" id="sub_category_name" name="sub_category_name" value={this.state.sub_category_name} onChange={this.onChangeSubCategory} required />
                            </div>
                          </div>
                        </div> */}
                    {/* <div class="row">
                          <div class="col-sm-6">
                            <div className="form-group">
                                <label>Sub Category Image:</label>
                               <input type="file" className="form-control" id="sub_category_img" name="sub_category_img" onChange={this.onChangeSubCategoryImg} required />
                            </div>
                          </div>
                        </div> */}
                    {/* <div class="row">
                          <div class="col-sm-4">
                            <div className="form-group">
                                <label>Need Year?:</label>

                               </div>
                               </div>
                               <div class="col-sm-4">
                               <Checkbox

              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
			  selectedId={this.state.selected}

			  onChange = {this.Yearchecked}
            />
                            </div>

                         <div class="col-sm-4">
                          <div className="form-group">
                                  <a class="text-success font-18" title="Add">
                                    <i class="fa fa-plus" onClick={this.handleAddSubCategory} ></i>
                                  </a>
                                </div>
                                </div>
                          </div> */}
                    {this.state.addSubCatList.map((itemaddProductList, tmidx) => (
                      <div>
                        <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>{this.props.t('adminSubCat')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                              <input type="text" className="form-control add_subcat_name" placeholder={this.props.t('adminSubCat') + " " + this.props.t('name')} id={tmidx} name="sub_category_name" value={itemaddProductList.sub_cat} onChange={this.onChangeSubCategory} required onInvalid={(e) =>
                                e.target.setCustomValidity(
                                  this.props.t("input_err_msg")
                                )
                              }
                                onInput={(e) => e.target.setCustomValidity("")} />
                            </div>
                            <div className="form-group">
                              <label>{this.props.t('adminSubCat')} {this.props.t('name')} {this.props.t('In_Arabic')}:<span style={{ color: "red" }}> *</span></label>
                              <input type="text" className="form-control add_subcat_name_arabic" placeholder={this.props.t('adminSubCat') + " " + this.props.t('name') + " " + this.props.t('In_Arabic')} id={tmidx} name="sub_category_name" value={itemaddProductList.sub_cat_arabic} onChange={this.onChangeSubCategoryArabic} required onInvalid={(e) =>
                                e.target.setCustomValidity(
                                  this.props.t("input_err_msg")
                                )
                              }
                                onInput={(e) => e.target.setCustomValidity("")} />
                            </div>
                          </div>

                        </div>
                        <div class="row">
                          <div class="col-sm-6">
                            <div className="form-group">
                              <label>{this.props.t('adminSubCat')} {this.props.t('adminImage')}:<span style={{ color: "red" }}> *</span></label>
                              <input type="file" className="form-control add_subcat_img subcat_img " id={tmidx} name="sub_category_img" accept=".png, .jpg, .jpeg" onChange={this.onChangeSubCategoryImg} required onInvalid={(e) =>
                                e.target.setCustomValidity(
                                  this.props.t("input_err_msg")
                                )
                              }
                                onInput={(e) => e.target.setCustomValidity("")} />
                            </div>
                          </div>
                        </div>
                        <div class="row">
                          <div class="col-sm-3">
                            <div className="form-group">
                              <label>{this.props.t('adminNeedYear')}?:</label>
                              {/* <input type="file" className="form-control" id="sub_category_img" name="sub_category_img" onChange={this.onChangeSubCategoryImg} required /> */}
                            </div>
                          </div>
                          <div class="col-sm-3">
                            <Checkbox
                              id={tmidx}
                              icon={icon}
                              checkedIcon={checkedIcon}
                              style={{ marginRight: 8 }}
                              selectedId={this.state.selected}
                              className="add_year"
                              onChange={this.Yearchecked}
                            />
                          </div>
                          {(() => {
                            if (tmidx === this.state.addSubCatList.length - 1) {
                              return (
                                <div class="col-sm-3">
                                  <div className="form-group">
                                    <a class="text-success font-18" title="Add">
                                      <i class="fa fa-plus" onClick={this.handleAddSubCategory} ></i>
                                    </a>
                                  </div>
                                </div>
                              )
                            }
                          })()}
                          {(() => {
                            if (tmidx > 0 && tmidx === this.state.addSubCatList.length - 1) {
                              return (
                                <div class="col-sm-3">
                                  <div className="form-group">
                                    <a class="text-danger font-18" title="Remove">
                                      <i class="fa fa-trash-o" onClick={() => this.handleRemoveSubCat(tmidx)} ></i>
                                    </a>
                                  </div>
                                </div>
                              )
                            }
                          })()}
                        </div>
                      </div>
                      // <div class="row" id={"add_pro_div_"+tmidx}>
                      //     <div class="col-sm-3">
                      //     <div className="form-group">
                      //         <label>Sub Category:</label>
                      //         <input type="file" className="form-control add_product_img" id={"product_img_add_"+tmidx} name="product_img"  required />
                      //     </div>
                      //   </div>
                      //   <div class="col-sm-3">
                      //     <div className="form-group">
                      //         <label>Subcategory Images:</label>
                      //         <input type="file" className="form-control add_product_img" id={"product_img_add_"+tmidx} name="product_img"  required />
                      //     </div>
                      //   </div>

                      // </div>
                    ))}

                    {/* <div class="col-sm-3">
                              {(() => {
                               if(tmidx===0) {
                               return(
                                <div className="form-group">
                                  <a class="text-success font-18" title="Add">
                                    <i class="fa fa-plus"  ></i>
                                  </a>
                                </div>
                               )
                               }else{
                               return(
                                <div className="form-group">
                                  <a class="text-danger font-18" title="Remove">
                                    <i class="fa fa-trash-o"  ></i>
                                  </a>
                                </div>
                               )
                               }
                               })()}
                            </div> */}


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
                  <h4 className="modal-title">{this.props.t('adminEdit')} {this.props.t('adminSubCat')}</h4>
                  <button type="button" className="close" data-dismiss="modal">&times;</button>
                </div>
                <div class="modal-body">
                  <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                    <div class="row">
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminCategory')} {this.props.t('name')}:<span style={{ color: "red" }}> *</span></label>
                          <select className="form-control" placeholder={this.props.t('adminCategory') + " " + this.props.t('name')} id="edit_category_id" name="edit_category_id" value={this.state.edit_category_id} onChange={this.onChangeEditCategory} required onInvalid={(e) =>
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
                          <input type="text" className="form-control" placeholder={this.props.t('adminSubCat') + " " + this.props.t('name')} id="edit_sub_category_name" name="edit_sub_category_name" value={this.state.edit_sub_category_name} onChange={this.onChangeEditSubCategory} required onInvalid={(e) =>
                            e.target.setCustomValidity(
                              this.props.t("input_err_msg")
                            )
                          }
                            onInput={(e) => e.target.setCustomValidity("")} />
                        </div>
                        <div className="form-group">
                          <label>{this.props.t('adminSubCat')} {this.props.t('name')} {this.props.t('In_Arabic')}:<span style={{ color: "red" }}> *</span></label>
                          <input type="text" className="form-control" placeholder={this.props.t('adminSubCat') + " " + this.props.t('name') + " " + this.props.t('In_Arabic')} id="edit_sub_category_name" name="edit_sub_cat_arabic_name" value={this.state.edit_sub_cat_arabic_name} onChange={this.onChangeEditSubCategory} required onInvalid={(e) =>
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
                          <img src={this.state.edit_sub_category_view_img} alt="Sub Category Image" width="250" height="250" />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-sm-12">
                        <div className="form-group">
                          <label>{this.props.t('adminSubCat')} {this.props.t('adminImage')}:</label>
                          <input type="file" className="form-control" id="edit_sub_category_img" name="edit_sub_category_img" accept=".png, .jpg, .jpeg" onChange={this.onChangeEditSubCategoryImg} />
                        </div>
                      </div>
                    </div>
                    {/* <div class="row">
                          <div class="col-sm-6">
                            <div className="form-group">
                                <label>{this.props.t('adminNeedYear')}?:<span style={{color:"red"}}> *</span></label>

                               </div>
                               <div class="col-sm-6">
                               <Checkbox

              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
			  selectedId={0}

			  onChange = {this.EditYearchecked}
            />
                            </div>
                          </div>
                        </div> */}
                    <div class="row">
                      <div class="col-sm-3">
                        <div className="form-group">
                          <label>{this.props.t('adminNeedYear')}?:</label>
                          {/* <input type="file" className="form-control" id="sub_category_img" name="sub_category_img" onChange={this.onChangeSubCategoryImg} required /> */}
                        </div>
                      </div>
                      <div class="col-sm-3">
                        <Checkbox

                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          selectedId={0}
                          checked={this.state.edit_selected}
                          onChange={this.EditYearchecked}
                        />
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
                    <h3>{this.props.t('adminDelete')} {this.props.t('adminSubCat')} </h3>
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