import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class clientService {
  ClientAdd(name, contact_person, mobile_no, email_id, address, location, pincode,warranty,site_name,site_location) {
    const insertData = new FormData();
    insertData.set('name', name);
    insertData.set('contact_person', contact_person);
    insertData.set('mobile_no', mobile_no);
    insertData.set('email_id', email_id);
    insertData.set('address', address);
    insertData.set('location', location);
    insertData.set('pincode', pincode);
    insertData.set('warranty', warranty);


    if(site_name && typeof site_name !=="undefined" && site_name.length>0){
      for (var p = 0; p < site_name.length; p++) {
        insertData.append('site_name', site_name[p]);
      }
    }

    if(site_location && typeof site_location !=="undefined" && site_location.length>0){
      for (var p = 0; p < site_location.length; p++) {
        insertData.append('site_location', site_location[p]);
      }
    }

    return axios
      .post(API_URL + "client/client_reg/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  ClientList() {
    
    return axios
      .get(API_URL + "admin/customer/list", { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }

  ClientInfo(client_id) {
    return axios
      .post(API_URL + "client/client_reg/getinfo", { client_id })
      .then((response) => {
        return response.data;
      });
  }

  ClientUpdate(client_id, name, contact_person, mobile_no, email_id, address, location, pincode,site_name,site_location) {
    const updateData = new FormData();
    updateData.set('client_id', client_id);
    updateData.set('name', name);
    updateData.set('contact_person', contact_person);
    updateData.set('mobile_no', mobile_no);
    updateData.set('email_id', email_id);
    updateData.set('address', address);
    updateData.set('location', location);
    updateData.set('pincode', pincode);

    if(site_name && typeof site_name !=="undefined" && site_name.length>0){
      for (var p = 0; p < site_name.length; p++) {
        updateData.append('site_name', site_name[p]);
      }
    }

    if(site_location && typeof site_location !=="undefined" && site_location.length>0){
      for (var p = 0; p < site_location.length; p++) {
        updateData.append('site_location', site_location[p]);
      }
    }
    
    return axios
      .post(API_URL + "client/client_reg/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  ClientDelete(id) {
   
    return axios
      .post(API_URL + "admin/customer/delete", { id }, { headers: authHeader() })
      .then((response) => {
        return response.data;
      });
  }
}

export default new clientService();