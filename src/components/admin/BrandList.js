import React, { Component } from "react";
import { Redirect, Router, Switch, Route, Link ,NavLink} from "react-router-dom";

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
import {SubCategoryListByCategory} from "./../../actions/adminSubcategory"

import { BrandAdd, BrandList, BrandInfo, BrandUpdate, BrandDelete } from "./../../actions/adminBrand";

import Header from './Header';
import SideBar from './SideBar';
import Footer from './Footer';

import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

class Brand extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.TableDataUpdate = this.TableDataUpdate.bind(this);

    this.ListBrandFun = this.ListBrandFun.bind(this);
    this.ListCategoryFun = this.ListCategoryFun.bind(this);
    this.ListSubCategoryFun=this.ListSubCategoryFun.bind(this)

    this.handleDeleteConfirm = this.handleDeleteConfirm.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.onChangeSubCategory=this.onChangeSubCategory.bind(this);
    this.handleDelete = this.handleDelete.bind(this);

    this.onChangeBrand = this.onChangeBrand.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.InfoBrandFun = this.InfoBrandFun.bind(this);

    this.onChangeEditBrand = this.onChangeEditBrand.bind(this);
    this.onChangeEditCategory = this.onChangeEditCategory.bind(this);
    this.onChangeEditSubCategory=this.onChangeEditSubCategory.bind(this);
    this.handleUpdateSubmit = this.handleUpdateSubmit.bind(this);

    this.state = {
        listBrandData: [],
        listCategoryData: [],
        listSubCategoryData:[],
        category_id:0,
        sub_category_id:0,
        edit_category_id:0,
        edit_sub_category_id:0,
        delete_id:0,
        brand_name:'',
        brand_img:"",
        brand_id:0,
        edit_brand_name:'',
        edit_brand_arabicname:'',
        edit_brand_img:'',
        edit_brand_img_view:'',
        addBrandList : [],


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
    var temp_arry = [];
    
      var temp_obj = {'tmidx':0, 'brand_name':'','brand_name_arabic':'','brand_img':''}
  
      temp_arry.push(temp_obj);
  
      this.setState({
        addBrandList: temp_arry
      });
    this.ListCategoryFun();
    this.ListBrandFun();
  }
  handleAddBrand=()=>{
    var array = this.state.addBrandList;
    if(array==0){
      var temp_arry = [];
    
    var temp_obj = {'tmidx':0, 'brand_name':'','brand_name_arabic':'','brand_img':''}

    temp_arry.push(temp_obj);

    this.setState({
      addBrandList: temp_arry
    });
    }else{
      var array = this.state.addBrandList;
     
      var temp_obj = {'tmidx':array.length, 'brand_name':'','brand_name_arabic':'','brand_img':''}
      array.push(temp_obj);

      this.setState({
        addBrandList: array
      });
    
    }
  }

  handleRemoveBrand=(tmidx)=>{
console.log("remove brand")
console.log(this.state.addBrandList)
    var id=parseInt(tmidx)
    console.log(id)
    let filteredArray = this.state.addBrandList.filter(item => item.tmidx !== id)
    this.setState({addBrandList: filteredArray});
  }
//   TableDataUpdate=()=>{
//     if(!this.state.delete_true){
//     $('#example').DataTable( {
//       dom: 'Bfrtip',
//       buttons: [
//           'copy', 'csv', 'excel', 'pdf', 'print'
//       ],
//       retrieve: true,
//     });
//   }
// }
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
  onChangeEditCategory=(e)=>{
    var cat_id=e.target.value
    this.setState({
      edit_category_id: e.target.value,
    }, () => {
      this.ListSubCategoryFun(cat_id);
  });
  }
  onChangeCategory=(e)=>{
    var cat_id=e.target.value
    this.setState({
      category_id: e.target.value,
    }, () => {
      this.ListSubCategoryFun(cat_id);
  });
  }
  onChangeEditSubCategory=(e)=>{
    this.setState({
      edit_sub_category_id: e.target.value,
    });
  }
  onChangeSubCategory=(e)=>{
    
    this.setState({
      sub_category_id: e.target.value,
    });
  }
  ListCategoryFun=()=>{

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

  ListSubCategoryFun=(catid)=>{

    const { dispatch, history } = this.props;
    dispatch(SubCategoryListByCategory(catid))
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
  ListBrandFun=()=>{

    const { dispatch, history } = this.props;
    dispatch(BrandList())
      .then((response) => {
        this.setState({
          listBrandData: response.data
        });
        this.TableDataUpdate();
      })
      .catch(() => {
        this.setState({
            listBrandData: []
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
    dispatch(BrandDelete(this.state.delete_id))
      .then((response) => {
        if(response.success || response.success ==="true" || response.success ===true){
          toast.success(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
            this.setState({
            delete_id: 0,
            });
            
            this.setState({delete_id: 0, delete_true:true}, () => {
              this.ListBrandFun();
            });
            window.location.reload();
        }else{
          toast.error(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
        }
      })
      .catch(() => {
        toast.error(this.props.t("sww"), { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
      });
  }

  onChangeBrandArabic=(e)=>{
    // this.setState({
    //   brand_name: e.target.value,
    // });
    var id=parseInt(e.target.id)
    let updatedItemList = this.state.addBrandList.map((item) => {
      
      
      if (item.tmidx === id) {
        item={ ...item, brand_name_arabic: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
   });
   console.log(updatedItemList)
   this.setState({
    addBrandList: updatedItemList,
  }, () => {
     
   
});
  }
  onChangeBrand=(e)=>{
    // this.setState({
    //   brand_name: e.target.value,
    // });
    var id=parseInt(e.target.id)
    let updatedItemList = this.state.addBrandList.map((item) => {
      
      
      if (item.tmidx === id) {
        item={ ...item, brand_name: e.target.value };
        // return { ...item, sub_cat: e.target.value };
        console.log("item now ")
        console.log(item)
      }
      return item;
   });
   console.log(updatedItemList)
   this.setState({
    addBrandList: updatedItemList,
  }, () => {
     
   
});
  }
    onChangeBrandImg=(e)=>{
    // this.setState({
    //   brand_img: e.target.files,
    // });
    var allowedTypes = ['image/jpeg','image/jpg','image/png'];
    var file = e.target.files[0];
    var fileType = file.type;
    if(!allowedTypes.includes(fileType)){
      alert('Please select a valid file format.');

      this.setState({
        brand_img: "",
      });
      $(".brand_img").val("");
    }
  else{
          
        
    this.setState({
      brand_img: e.target.files,
    });
  
}
    console.log("image event fired")
var id=parseInt(e.target.id)
    var id=parseInt(e.target.id)
    console.log("id")
console.log(id)
console.log(e.target.files[0])
    let updatedItemList = this.state.addBrandList.map((item) => {
           
      if (item.tmidx === id) {
        item={ ...item, brand_img: e.target.files[0] };
        // return { ...item, sub_cat: e.target.value };
       console.log("now item")
       console.log(item)
      }
      return item;
   });
  
   this.setState({
    addSubCatList: updatedItemList,
  });
  }
  CloseForm=(e)=>{
    console.log("close triggered")
    /*var temp_arry = [];
    
    var temp_obj = {'tmidx':0, 'brand_name':'','brand_img':''}

    temp_arry.push(temp_obj);

    this.setState({
      addBrandList: temp_arry
    });
   
    this.myRef.current.files = null;*/

    var temp_arry = [];
    
    var temp_obj = {'tmidx':0, 'brand_name':'','brand_name_arabic':'','brand_img':''}

    temp_arry.push(temp_obj);

    this.setState({
      addBrandList: temp_arry,
      category_id:'',
      sub_category_id:''
      
    });

    $(".add_brand_img").val(null);
    $(".brand_img").val(null);
  }
  handleSubmit=(e)=>{
    e.preventDefault();

    this.setState({
      loading: true,
    });

    this.Addform.validateAll();

    const { dispatch, history } = this.props;
    let brandImgList = this.state.addSubCatList.map((item) => {
           
      
      return item.brand_img;
   });
   let brandNameList = this.state.addSubCatList.map((item) => {
           
      
    return item.brand_name;
 });
 let brandArabicNameList = this.state.addSubCatList.map((item) => {
           
      
  return item.brand_name_arabic;
});
 
    if (this.checkBtn.context._errors.length === 0) {
      console.log("now param")
      console.log(this.state.category_id)
      dispatch(BrandAdd(this.state.category_id,this.state.sub_category_id,brandNameList,brandArabicNameList,  brandImgList))
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
              // this.ListBrandFun();
              // this.setState({ brand_name: '' });
              let temp_arry = [];
              var temp_obj = {'tmidx':0, 'brand_name':'','brand_name_arabic':'','brand_img':''}

              temp_arry.push(temp_obj);
          
             
              this.setState({
                 brand_name: '',brand_arabicname:'',brand_img: '',addBrandList:temp_arry
              });
              $("#add_form").modal("hide");
              $(".brand_img").val("");
              this.ListBrandFun();
              window.location.reload();
            }else{
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

    var temp_arry = [];
    
    var temp_obj = {'tmidx':0, 'brand_name':'','brand_img':''}

    temp_arry.push(temp_obj);

    this.setState({
      addBrandList: temp_arry,
      category_id:'',
      sub_category_id:''
      
    });

    $(".add_brand_img").val(null);
  }

  InfoBrandFun=(brand_id)=>{

    const { dispatch, history } = this.props;
    dispatch(BrandInfo(brand_id))
      .then((response) => {
        if(response.data && typeof response.data !=="undefined" && response.data.length>0){
            this.setState({
              brand_id: brand_id,
              edit_brand_name: response.data[0].brand_name,
              edit_brand_arabicname:response.data[0].brand_name_arabic,
              edit_brand_img_view: response.data[0].brand_img,
              edit_category_id:response.data[0].category_id,
              edit_sub_category_id:response.data[0].sub_category_id

            }, () => {
              console.log("cat id got")
              console.log(response.data[0].category_id)
              this.ListSubCategoryFun(response.data[0].category_id)
             
          });
            $("#edit_form").modal("show"); 
        }
      })
      .catch((error) => {
      });
  }

  onChangeEditBrand=(e)=>{
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  onChangeEditBrandImg=(e)=>{
    // this.setState({
    //   edit_brand_img: e.target.files,
    // });
    var allowedTypes = ['image/jpeg','image/jpg','image/png'];
    var file = e.target.files[0];
    var fileType = file.type;
    if(!allowedTypes.includes(fileType)){
      alert('Please select a valid file format.');

      this.setState({
        edit_brand_img: "",
      });
      $("#edit_brand_img").val("");
    }
  else{
          
        
    this.setState({
      edit_brand_img: e.target.files,
    });
  
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
      dispatch(BrandUpdate(this.state.brand_id, this.state.edit_brand_name,this.state.edit_brand_arabicname, this.state.edit_brand_img,this.state.edit_category_id,this.state.edit_sub_category_id))
        .then((response) => {
            if(response.success || response.success ==="true" || response.success ===true){
              toast.success(localStorage.getItem("lang") === "En" ? response.message : response?.message_arabic, { position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
              this.ListBrandFun();
              this.setState({
                brand_id: 0, edit_brand_name: '',edit_brand_arabicname:'',edit_brand_img: '',edit_category_id:0,edit_sub_category_id:0,
              });
              $("#edit_brand_img").val(null);
              $("#edit_form").modal("hide");
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
      toast.error("something went wrong..!!", {position: "bottom-right", autoClose: 5000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, });
    }
  }

  render() {

    const { isLoggedIn, message } = this.props;

    return (
    <React.Fragment>{this.props.t('adminCity')}
        <div className="main-wrapper">
            <Header />
            <SideBar />
            
            <div className="page-wrapper">
        
              <div className="content container-fluid">
              
                <div class="page-header">
                  <div class="row align-items-center">
                    <div class="col">
                      <h3 class="page-title">{this.props.t('adminBrand')}</h3>
                      <ul class="breadcrumb">
                        <li class="breadcrumb-item"><Link to={"/admin/dashboard"}>{this.props.t('adminDashboard')}</Link></li>
                        <li class="breadcrumb-item active">{this.props.t('adminBrand')}</li>
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
                      <table  id="example" className="table table-striped custom-table mb-0 datatable">
                        <thead>
                          <tr>
                            <th>{this.props.t('Id')}</th>
                            <th>{this.props.t('adminCategory')}</th>
                            <th>{this.props.t('adminSubCat')}</th>
                            <th>{this.props.t('adminBrand')}</th>
                            <th>{this.props.t('adminBrand')} {this.props.t('In_Arabic')}</th>
                            <th>{this.props.t('adminImage')}</th>
                            <th className="text-right">{this.props.t('adminActions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(() => {
                          if (this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0){
                          return (
                          <>
                          {this.state.listBrandData && typeof this.state.listBrandData !=="undefined" & this.state.listBrandData.length > 0 && this.state.listBrandData.map((itemBrandList,l) => (
                            <tr>
                              <td>{l+1}</td>
                              <td>{itemBrandList.category_name}</td>
                              <td>{itemBrandList.sub_category_name}</td>
                              <td>{itemBrandList.brand_name}</td>
                              <td>{itemBrandList.brand_name_arabic}</td>
                              <td><img src={itemBrandList.brand_img} width='50px' height="40px"/></td>
                              <td className="text-right">
                                <div className="dropdown dropdown-action">
                                  <a href="#" className="action-icon dropdown-toggle" data-toggle="dropdown" aria-expanded="false"><i className="material-icons">more_vert</i></a>
                                  <div className="dropdown-menu dropdown-menu-right">
                                    <a className="dropdown-item" onClick={() => this.InfoBrandFun(itemBrandList.brand_id)}><i className="fa fa-pencil m-r-5"></i> {this.props.t('adminEdit')}</a>
                                    <a className="dropdown-item" onClick={() => this.handleDeleteConfirm(itemBrandList.brand_id)}><i className="fa fa-trash-o m-r-5"></i> {this.props.t('adminDelete')}</a>
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
                        <h4 className="modal-title">{this.props.t('adminAdd')} {this.props.t('adminBrand')}</h4>
                        <button type="button" className="close" data-dismiss="modal" onClick={this.CloseForm}>&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleSubmit} ref={(c) => { this.Addform = c; }}>
                        <div class="row">
                        <div class="col-sm-12">
                            <div className="form-group">
                              <label>{this.props.t('adminCategory')}:<span style={{color:"red"}}> *</span></label>
                              <select className="form-control" placeholder="Category" id="category_id" name="category_id" value={this.state.category_id} onChange={this.onChangeCategory} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}>
                                  <option value="">{this.props.t('select')} {this.props.t('adminCategory')}</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>
                                      {this.props.i18n.language   ==='en'?
                                      itemTaskList.category_name:itemTaskList.category_name_arabic}
                                      
                                      </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>{this.props.t('adminSubCat')}:<span style={{color:"red"}}> *</span></label>
                              <select className="form-control" placeholder="Sub Category" id="sub_category_id" name="sub_category_id" value={this.state.sub_category_id} onChange={this.onChangeSubCategory} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}>
                                  <option value="">{this.props.t('select')} {this.props.t('adminSubCat')}</option>
                                  {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.sub_category_id}>
                                      {this.props.i18n.language   ==='en'? itemTaskList.sub_category_name :itemTaskList.sub_category_name_arabic}
                                      </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          
                          
                        </div>
                        {this.state.addBrandList.map((itemaddBrandList, tmidx) => (
                          <div>
                        <div class="row">
                        <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminBrand')} {this.props.t('name')}:<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control"  placeholder={this.props.t('adminBrand')  + " "+ this.props.t('name')} id={tmidx} name="brand_name" value={itemaddBrandList.brand_name} onChange={this.onChangeBrand} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
                            </div>
                            <div className="form-group">
                                <label>{this.props.t('adminBrand')} {this.props.t('name')} {this.props.t('In_Arabic')}:<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control"   placeholder={this.props.t('adminBrand')  + " "+ this.props.t('name') + " "+ this.props.t('In_Arabic')} id={tmidx} name="brand_name" value={itemaddBrandList.brand_name_arabic} onChange={this.onChangeBrandArabic} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminBrand')} {this.props.t('adminImage')}:<span style={{color:"red"}}> *</span></label>
                               <input type="file" className="form-control add_brand_img brand_img" ref={this.myRef} id={tmidx} name="brand_img" accept=".png, .jpg, .jpeg" onChange={this.onChangeBrandImg} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
                            </div>
                          </div>
                          {(() => {
                          if(tmidx===this.state.addBrandList.length-1){
                                 return(
                          <div class="col-sm-3">
                          <div className="form-group">
                                  <a class="text-success font-18" title="Add">
                                    <i class="fa fa-plus" onClick={this.handleAddBrand} ></i>
                                  </a>
                                </div>
                                </div>
                                 )
                                }
                               })()}
                                {(() => {
				                       if(tmidx>0 &&tmidx===this.state.addBrandList.length-1){
                                 return(
                                <div class="col-sm-3">
                                <div className="form-group">
                                  <a class="text-danger font-18" title="Remove">
                                    <i class="fa fa-trash-o" onClick={() => this.handleRemoveBrand(tmidx)} ></i>
                                  </a>
                                </div>
                                </div>
                                 )
         }
        })()}
                        </div>
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
                        <h4 className="modal-title">{this.props.t('adminEdit')} {this.props.t('adminBrand')}</h4>
                        <button type="button" className="close" data-dismiss="modal" >&times;</button>
                    </div>
                    <div class="modal-body">
                      <Form onSubmit={this.handleUpdateSubmit} ref={(c) => { this.Updateform = c; }}>
                        <div class="row">
                        <div class="col-sm-12">
                            <div className="form-group">
                              <label>{this.props.t('adminCategory')}:<span style={{color:"red"}}> *</span></label>
                              <select className="form-control" placeholder="Category" id="edit_category_id" name="edit_category_id" value={this.state.edit_category_id} onChange={this.onChangeEditCategory} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}>
                                  <option value="">{this.props.t('select')} {this.props.t('adminCategory')}</option>
                                  {this.state.listCategoryData && typeof this.state.listCategoryData !=="undefined" & this.state.listCategoryData.length > 0 && this.state.listCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.category_id}>
                                        {this.props.i18n.language   ==='en'?
                                      itemTaskList.category_name:itemTaskList.category_name_arabic}
                                      {/* {itemTaskList.category_name} */}
                                      </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                              <label>{this.props.t('adminSubCat')}:<span style={{color:"red"}}> *</span></label>
                              <select className="form-control" placeholder="Sub Category" id="sub_category_id" name="sub_category_id" value={this.state.edit_sub_category_id} onChange={this.onChangeEditSubCategory} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}>
                                  <option value="">{this.props.t('select')} {this.props.t('adminSubCat')}</option>
                                  {this.state.listSubCategoryData && typeof this.state.listSubCategoryData !=="undefined" & this.state.listSubCategoryData.length > 0 && this.state.listSubCategoryData.map((itemTaskList,m) => (
                                    <option value={itemTaskList.sub_category_id}>
                                       {this.props.i18n.language   ==='en'? itemTaskList.sub_category_name :itemTaskList.sub_category_name_arabic}
                                      {/* {itemTaskList.sub_category_name} */}
                                      </option>
                                  ))}
                              </select>
                            </div>
                          </div>
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminBrand')} {this.props.t('name')}:<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control" placeholder={this.props.t('adminBrand')  + " "+ this.props.t('name') }  id="edit_brand_name" name="edit_brand_name" value={this.state.edit_brand_name} onChange={this.onChangeEditBrand} required onInvalid={(e) =>
                              e.target.setCustomValidity(
                                this.props.t("input_err_msg")
                              )
                            }
                            onInput={(e) => e.target.setCustomValidity("")}/>
                            </div>
                            <div className="form-group">
                                <label>{this.props.t('adminBrand')} {this.props.t('name')}  {this.props.t('In_Arabic')}:<span style={{color:"red"}}> *</span></label>
                                <input type="text" className="form-control"  placeholder={this.props.t('adminBrand')  + " "+ this.props.t('name') + " "+ this.props.t('In_Arabic')} id="edit_brand_arabicname" name="edit_brand_arabicname" value={this.state.edit_brand_arabicname} onChange={this.onChangeEditBrand} required onInvalid={(e) =>
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
                              <img src={this.state.edit_brand_img_view} alt="Brand Image" width="250" height="250" />  
                            </div>
                          </div>
                          </div>
                         <div class="row">
                          <div class="col-sm-12">
                            <div className="form-group">
                                <label>{this.props.t('adminBrand')} {this.props.t('adminImage')}:</label>
                               <input type="file" className="form-control" id="edit_brand_img" name="edit_brand_img" accept=".png, .jpg, .jpeg"  onChange={this.onChangeEditBrandImg}  />
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
                      <h3>{this.props.t('adminBrand')} </h3>
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

export default connect(mapStateToProps) (withTranslation()(Brand));