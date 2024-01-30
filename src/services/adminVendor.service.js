import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class vendorService {
  VendorAdd(name, contact_person, mobile_no, email_id, address, location, pincode) {
    const insertData = new FormData();
    insertData.set('name', name);
    insertData.set('contact_person', contact_person);
    insertData.set('mobile_no', mobile_no);
    insertData.set('email_id', email_id);
    insertData.set('address', address);
    insertData.set('location', location);
    insertData.set('pincode', pincode);

    return axios
      .post(API_URL + "admin/vendor/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  VendorList() {
    return axios
      .get(API_URL + "admin/vendor/list")
      .then((response) => {
        return response.data;
      });
  }

  VendorInfo(vendor_id) {
    return axios
      .post(API_URL + "admin/vendor/getinfo", { vendor_id })
      .then((response) => {
        return response.data;
      });
  }

  VendorUpdate(vendor_id, name, contact_person, mobile_no, email_id, address, location, pincode) {
    const updateData = new FormData();
    updateData.set('vendor_id', vendor_id);
    updateData.set('name', name);
    updateData.set('contact_person', contact_person);
    updateData.set('mobile_no', mobile_no);
    updateData.set('email_id', email_id);
    updateData.set('address', address);
    updateData.set('location', location);
    updateData.set('pincode', pincode);

    return axios
      .post(API_URL + "admin/vendor/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  VendorDelete(vendor_id) {
    return axios
      .post(API_URL + "admin/vendor/delete", { vendor_id })
      .then((response) => {
        return response.data;
      });
  }

  VendorItemsList(vendor_id) {
    return axios
      .post(API_URL + "admin/vendor_items/vendor_item_list_by_vendor_id", { vendor_id })
      .then((response) => {
        return response.data;
      });
  }

  VendorItemsMaterialList(vendor_id, material_category_id, material_input_type_id) {
    return axios
      .post(API_URL + "admin/vendor_items/vendor_item_list_material_by_vendor_id", { vendor_id, material_category_id, material_input_type_id })
      .then((response) => {
        return response.data;
      });
  }

}

export default new vendorService();