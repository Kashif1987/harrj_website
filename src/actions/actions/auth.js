import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  OTP_SUCCESS,
  OTP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  DATA_SUCCESS,
  DATA_FAIL,
} from "./types";

import AuthService from "../services/auth.service";

export const AdminLogin = (email_id, password) => (dispatch) => {
  return AuthService.AdminLogin(email_id, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });
      
      return Promise.resolve(data);
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject(error);
    }
  );
};

export const logout = () => (dispatch) => {
  AuthService.logout();

  dispatch({
    type: LOGOUT,
  });
};