import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class RegisteredUserService {
 


  RegisteredUserList() {
    return axios
      .get(API_URL + "admin/user/list")
      .then((response) => {
        return response.data;
      });
  }

  
  

 
  
  
}

export default new RegisteredUserService();