import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class vendorItemService {
  VendorItemAdd(vendor_id, material_category_id, material_input_type_id, item_name, item_qty, item_rate, update_date) {
    const insertData = new FormData();
    insertData.set('vendor_id', vendor_id);
    /*insertData.set('material_category_id', material_category_id);
    insertData.set('material_input_type_id', material_input_type_id);
    insertData.set('item_name', item_name);
    insertData.set('item_qty', item_qty);
    insertData.set('item_rate', item_rate);
    insertData.set('update_date', update_date);*/

    if(material_category_id && typeof material_category_id !=="undefined" && material_category_id.length>0){
      for (var p = 0; p < material_category_id.length; p++) {
        insertData.append('material_category_id', material_category_id[p]);
      }
    }

    if(material_input_type_id && typeof material_input_type_id !=="undefined" && material_input_type_id.length>0){
      for (var p = 0; p < material_input_type_id.length; p++) {
        insertData.append('material_input_type_id', material_input_type_id[p]);
      }
    }

    if(item_name && typeof item_name !=="undefined" && item_name.length>0){
      for (var p = 0; p < item_name.length; p++) {
        insertData.append('item_name', item_name[p]);
      }
    }

    if(item_qty && typeof item_qty !=="undefined" && item_qty.length>0){
      for (var p = 0; p < item_qty.length; p++) {
        insertData.append('item_qty', item_qty[p]);
      }
    }

    if(item_rate && typeof item_rate !=="undefined" && item_rate.length>0){
      for (var p = 0; p < item_rate.length; p++) {
        insertData.append('item_rate', item_rate[p]);
      }
    }

    if(update_date && typeof update_date !=="undefined" && update_date.length>0){
      for (var p = 0; p < update_date.length; p++) {
        insertData.append('update_date', update_date[p]);
      }
    }
        
    return axios
      .post(API_URL + "admin/vendor_items/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  VendorItemList() {
    return axios
      .get(API_URL + "admin/vendor_items/list")
      .then((response) => {
        return response.data;
      });
  }

  VendorItemInfo(vendor_item_id) {
    return axios
      .post(API_URL + "admin/vendor_items/getinfo", { vendor_item_id })
      .then((response) => {
        return response.data;
      });
  }

  VendorItemUpdate(vendor_item_id, vendor_id, material_category_id, material_input_type_id, item_name, item_qty, item_rate, update_date) {
    const updateData = new FormData();
    updateData.set('vendor_item_id', vendor_item_id);
    updateData.set('vendor_id', vendor_id);
    updateData.set('material_category_id', material_category_id);
    updateData.set('material_input_type_id', material_input_type_id);
    updateData.set('item_name', item_name);
    updateData.set('item_qty', item_qty);
    updateData.set('item_rate', item_rate);
    updateData.set('update_date', update_date);

    return axios
      .post(API_URL + "admin/vendor_items/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  VendorItemDelete(vendor_item_id) {
    return axios
      .post(API_URL + "admin/vendor_items/delete", { vendor_item_id })
      .then((response) => {
        return response.data;
      });
  }

  ListMaterialInputTypeFun(material_category_id) {
    return axios
      .post(API_URL + "admin/material_input_type/material_input_type_list_by_material_category_id", { material_category_id })
      .then((response) => {
        return response.data;
      });
  }

}

export default new vendorItemService();