import { DATA_SUCCESS, DATA_FAIL, SET_MESSAGE } from "./../types";

import productinfoService from "../../services/website/ProductInfo.service";
export const BidProduct =
  (bidder_id, product_id, bid_amount, customer_id) => (dispatch) => {
    return productinfoService
      .BidProduct(bidder_id, product_id, bid_amount, customer_id)
      .then(
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

export const BidComment =
  (product_id, insert_id, user_id, comment) => (dispatch) => {
    return productinfoService
      .BidComment(product_id, insert_id, user_id, comment)
      .then(
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

export const LiveLogin = (mobno) => (dispatch) => {
  return productinfoService.LiveLogin(mobno).then(
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
export const ProductInfo = (product_id) => (dispatch) => {
  return productinfoService.ProductInfo(product_id).then(
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
