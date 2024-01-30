import { DATA_SUCCESS, DATA_FAIL, SET_MESSAGE } from "./../types";

import liveAuctionService from "../../services/website/LiveAuction.service";

export const ClientProductList = (client_id) => (dispatch) => {
  return liveAuctionService.ClientProductList(client_id).then(
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
export const AwardBid =
  (customer_id, bid_id, bid_status, product_id) => (dispatch) => {
    return liveAuctionService
      .AwardBid(customer_id, bid_id, bid_status, product_id)
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
export const ProductwiseBidderList = (product_id) => (dispatch) => {
  return liveAuctionService.ProductwiseBidderList(product_id).then(
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
  return liveAuctionService.ProductInfo(product_id).then(
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
export const ProductUpdate =
  (
    userId,
    product_id,
    title,
    name,
    description,
    keywords,
    category_id,
    brand_id,
    model_id,
    country_id,
    city_id,
    sub_category_id,
    start_date_time,
    end_date_time,
    auction_type,
    starting_price,
    high_price,
    final_price,
    refund,
    refund_days,
    youtube_link,
    product_img,
    video,
    start_time,
    end_time
  ) =>
  (dispatch) => {
    return liveAuctionService
      .ProductUpdate(
        userId,
        product_id,
        title,
        name,
        description,
        keywords,
        category_id,
        brand_id,
        model_id,
        country_id,
        city_id,
        sub_category_id,
        start_date_time,
        end_date_time,
        auction_type,
        starting_price,
        high_price,
        final_price,
        refund,
        refund_days,
        youtube_link,
        product_img,
        video,
        start_time,
        end_time
      )
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
export const ProductDelete = (userId, productId) => (dispatch) => {
  return liveAuctionService.ProductDelete(userId, productId).then(
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

export const LiveListFilter =
  (
    auction_type,
    category_id,
    sub_category_id,
    brand_id,
    model_id,
    pricevalue,
    year,
    country_id,
    city_id,
    sort_by
  ) =>
  (dispatch) => {
    return liveAuctionService
      .LiveListFilter(
        auction_type,
        category_id,
        sub_category_id,
        brand_id,
        model_id,
        pricevalue,
        year,
        country_id,
        city_id,
        sort_by
      )
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
