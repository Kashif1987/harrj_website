import {
    DATA_SUCCESS,
    DATA_FAIL,
    SET_MESSAGE,
  } from "./types";
  
  import adminBrandService from "../services/adminBrand.service";
  
  export const BrandAdd = (cat_id,sub_cat_id,brand_name,brand_arabicname,brand_img) => (dispatch) => {
    return adminBrandService.BrandAdd(cat_id,sub_cat_id,brand_name,brand_arabicname,brand_img).then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const BrandList = () => (dispatch) => {
    return adminBrandService.BrandList().then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const BrandModelLst = (brand_id) => (dispatch) => {
    return adminBrandService.BrandModelLst(brand_id).then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const SubCatBrandList= (sub_cat_id) => (dispatch) => {
    return adminBrandService.SubCatBrandList(sub_cat_id).then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  export const BrandOfCatList = (cat_id) => (dispatch) => {
    return adminBrandService.BrandOfCatList(cat_id).then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const BrandInfo = (brand_id) => (dispatch) => {
    return adminBrandService.BrandInfo(brand_id).then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  export const BrandUpdate = (brand_id, brand_name,brand_arabicname,brand_img,cat_id,sub_cat_id) => (dispatch) => {
    return adminBrandService.BrandUpdate(brand_id, brand_name,brand_arabicname,brand_img,cat_id,sub_cat_id).then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };
  
  
  export const BrandDelete = (brand_id) => (dispatch) => {
    return adminBrandService.BrandDelete(brand_id).then(
      (response) => {
        dispatch({
          type: DATA_SUCCESS,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: response.data.message,
        });
  
        return Promise.resolve(response);
      },
      (error) => {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
  
        dispatch({
          type: DATA_FAIL,
        });
  
        dispatch({
          type: SET_MESSAGE,
          payload: message,
        });
  
        return Promise.reject();
      }
    );
  };