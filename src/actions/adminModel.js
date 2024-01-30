import {
    DATA_SUCCESS,
    DATA_FAIL,
    SET_MESSAGE,
  } from "./types";
  
  import adminModelService from "../services/adminModel.service";
  
  export const ModelAdd = (category_id,sub_category_id,brand_id,model_details) => (dispatch) => {
    return adminModelService.ModelAdd(category_id,sub_category_id,brand_id,model_details).then(
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
  export const ModelList = () => (dispatch) => {
    return adminModelService.ModelList().then(
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
  
  
  export const ModelInfo = (model_id) => (dispatch) => {
    return adminModelService.ModelInfo(model_id).then(
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
  

  export const ModelUpdate = (model_id,category_id,sub_category_id,brand_id, model_name,model_name_arabic,model_description,model_description_arabic) => (dispatch) => {
    return adminModelService.ModelUpdate(model_id,category_id,sub_category_id,brand_id, model_name,model_name_arabic,model_description,model_description_arabic).then(
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
  
  
  
  export const ModelDelete = (model_id) => (dispatch) => {
    return adminModelService.ModelDelete(model_id).then(
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