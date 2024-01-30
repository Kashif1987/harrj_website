import {
  DATA_SUCCESS,
  DATA_FAIL,
  SET_MESSAGE,
} from "./../types";

import liveAuctionService from "../../services/website/LiveAuction.service";


export const LiveListFilter = (auction_type,category_id,sub_category_id,year,sort_by) => (dispatch) => {
  return liveAuctionService.LiveListFilter(auction_type,category_id,sub_category_id,year,sort_by).then(
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
