import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class AuthService {
  AdminLogin(email_id, password) {

    const insertData = new FormData();
    insertData.set('email_id', email_id);
    insertData.set('password', password);
//loginadmin
    return axios
    //  .post(API_URL + "login", insertData )
    .post(API_URL + "login/loginadmin", insertData )
      .then((response) => {
        console.log("loging resp")
        console.log(response)
        if (response.data.token && typeof response.data.token !=="undefined" && response.data.token!=="") {

          console.log("auth token")
          console.log(JSON.stringify(response.data))
          localStorage.setItem("user", JSON.stringify(response.data));
        
        }else{
          localStorage.removeItem("user");
        }  
        return response.data;
      });


    // const insertData = new FormData();
   
  
    // return axios
    //   //.post(API_URL + "api/admin/admin_login", { email_id, password })
    //   .post(API_URL + "/login",insertData)
    //   .then((response) => {

    //     if (response.data.token && typeof response.data.token !=="undefined" && response.data.token!=="") {
    //       localStorage.setItem("user", JSON.stringify(response.data));
    //     }else{
    //       localStorage.removeItem("user");
    //     }

    //     return response.data;
    //   });
  }
  
  UserLoginOtp(mobile_no) {
    return axios
      .post(API_URL + "api/admin/login", { mobile_no })
      .then((response) => {
        return response.data;
      });
  }

  UserLoginOtpVerify(mobile_no, otp) {
    return axios
      .post(API_URL + "api/admin/login_otp_verify", { mobile_no, otp })
      .then((response) => {

        console.log("service response:");
        console.log(response);
        
        if (response.data.token && typeof response.data.token !=="undefined" && response.data.token!=="") {
          localStorage.setItem("user", JSON.stringify(response.data));
        }else{
          localStorage.removeItem("user");
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  }

  logoutAdmin() {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  }
}

export default new AuthService();
