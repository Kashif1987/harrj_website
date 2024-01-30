import {
  DATA_SUCCESS,
  DATA_FAIL,
  SET_MESSAGE,
} from "./types";

import adminTicketService from "../services/adminTicket.service";


export const TicketDashboard = () => (dispatch) => {
  return adminTicketService.TicketDashboard().then(
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

export const TicketAdd = (client_id,ticket_desc,priority,estimated_date,warranty,ticket_datetime,location,maintenance_requirement,maintenance_desc,note,warranty_desc='') => (dispatch) => {
  return adminTicketService.TicketAdd(client_id,ticket_desc,priority,estimated_date,warranty,ticket_datetime,location,maintenance_requirement,maintenance_desc,note,warranty_desc='').then(
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


export const TicketAddInspection = (ticket_id,inspection,inspection_date,inspection_desc) => (dispatch) => {
  return adminTicketService.TicketAddInspection(ticket_id,inspection,inspection_date,inspection_desc).then(
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

export const TicketAddTeam = (ticket_id,team_id,staff_id,reporting_to,from_date,to_date) => (dispatch) => {
  return adminTicketService.TicketAddTeam(ticket_id,team_id,staff_id,reporting_to,from_date,to_date).then(
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

export const TicketAddMaintenance = (ticket_id,vendor_id,material_category_id,material_input_type_id,vendor_item_id,material_rate,material_quantity,material_cost,transport_desc,transport_rate,transport_quantity,transport_cost,install_desc,install_rate,install_quantity,install_cost,tax_due_desc,tax_due_rate,tax_due_quantity,tax_due_cost,total_material_cost,total_transportation_cost,total_installation_cost,total_tax_dues_cost,total_maintenace_cost) => (dispatch) => {
  return adminTicketService.TicketAddMaintenance(ticket_id,vendor_id,material_category_id,material_input_type_id,vendor_item_id,material_rate,material_quantity,material_cost,transport_desc,transport_rate,transport_quantity,transport_cost,install_desc,install_rate,install_quantity,install_cost,tax_due_desc,tax_due_rate,tax_due_quantity,tax_due_cost,total_material_cost,total_transportation_cost,total_installation_cost,total_tax_dues_cost,total_maintenace_cost).then(
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

export const TicketAddSupportingDoc = (ticket_id,draw_date,draw_description,version,draw_doc_file,doc_file_desc,doc_file) => (dispatch) => {
  return adminTicketService.TicketAddSupportingDoc(ticket_id,draw_date,draw_description,version,draw_doc_file,doc_file_desc,doc_file).then(
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


export const TicketAddStatus = (Ticket_id, ticket_status) => (dispatch) => {
  return adminTicketService.TicketAddStatus(Ticket_id, ticket_status).then(
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

export const TicketList = (client_id,ticket_status,priority,from_date,to_date) => (dispatch) => {
  return adminTicketService.TicketList(client_id,ticket_status,priority,from_date,to_date).then(
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

export const TicketInfo = (Ticket_id) => (dispatch) => {
  return adminTicketService.TicketInfo(Ticket_id).then(
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



export const TicketBasicInfo = (Ticket_id) => (dispatch) => {
  return adminTicketService.TicketBasicInfo(Ticket_id).then(
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


export const TicketSiteInspectionInfo = (Ticket_id) => (dispatch) => {
  return adminTicketService.TicketSiteInspectionInfo(Ticket_id).then(
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


export const TicketAssignTeamInfo = (Ticket_id) => (dispatch) => {
  return adminTicketService.TicketAssignTeamInfo(Ticket_id).then(
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


export const TicketCostImplementationInfo = (Ticket_id) => (dispatch) => {
  return adminTicketService.TicketCostImplementationInfo(Ticket_id).then(
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

export const TicketSupportingDocumentsInfo = (Ticket_id) => (dispatch) => {
  return adminTicketService.TicketSupportingDocumentsInfo(Ticket_id).then(
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

export const TicketInfoUpdate = (ticket_id, client_id,ticket_desc,priority,estimated_date,warranty,ticket_datetime,location,ticket_maint_id,maintenance_requirement,maintenance_desc,note,warranty_desc='') => (dispatch) => {
  return adminTicketService.TicketInfoUpdate(ticket_id, client_id,ticket_desc,priority,estimated_date,warranty,ticket_datetime,location,ticket_maint_id,maintenance_requirement,maintenance_desc,note,warranty_desc='').then(
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

export const TicketSiteInspectionInfoUpdate = (ticket_id,ticket_insp_id,inspection,inspection_date,inspection_desc) => (dispatch) => {
  return adminTicketService.TicketSiteInspectionInfoUpdate(ticket_id,ticket_insp_id,inspection,inspection_date,inspection_desc).then(
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

export const TicketAssignTeamInfoUpdate = (ticket_id,ticket_assign_id,team_id,staff_id,reporting_to,from_date,to_date) => (dispatch) => {
  return adminTicketService.TicketAssignTeamInfoUpdate(ticket_id,ticket_assign_id,team_id,staff_id,reporting_to,from_date,to_date).then(
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

export const TicketCostImplementationInfoUpdate = (ticket_id,ticket_material_id,vendor_id,material_category_id,material_input_type_id,vendor_item_id,material_rate,material_quantity,material_cost,ticket_transport_id,transport_desc,transport_rate,transport_quantity,transport_cost,ticket_install_id,install_desc,install_rate,install_quantity,install_cost,ticket_tax_dues_id,tax_due_desc,tax_due_rate,tax_due_quantity,tax_due_cost,total_material_cost,total_transportation_cost,total_installation_cost,total_tax_dues_cost,total_maintenace_cost) => (dispatch) => {
  return adminTicketService.TicketCostImplementationInfoUpdate(ticket_id,ticket_material_id,vendor_id,material_category_id,material_input_type_id,vendor_item_id,material_rate,material_quantity,material_cost,ticket_transport_id,transport_desc,transport_rate,transport_quantity,transport_cost,ticket_install_id,install_desc,install_rate,install_quantity,install_cost,ticket_tax_dues_id,tax_due_desc,tax_due_rate,tax_due_quantity,tax_due_cost,total_material_cost,total_transportation_cost,total_installation_cost,total_tax_dues_cost,total_maintenace_cost).then(
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


export const TicketSupportingDocumentsInfoUpdate = (ticket_id,ticket_draw_id,draw_date,draw_description,version,draw_doc_file,ticket_doc_id,doc_file_desc,doc_file) => (dispatch) => {
  return adminTicketService.TicketSupportingDocumentsInfoUpdate(ticket_id,ticket_draw_id,draw_date,draw_description,version,draw_doc_file,ticket_doc_id,doc_file_desc,doc_file).then(
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

export const TicketUpdate = (Ticket_id, name, contact_person, mobile_no, email_id, address, location, pincode) => (dispatch) => {
  return adminTicketService.TicketUpdate(Ticket_id, name, contact_person, mobile_no, email_id, address, location, pincode).then(
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


export const TicketDelete = (Ticket_id) => (dispatch) => {
  return adminTicketService.TicketDelete(Ticket_id).then(
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


export const MaterialCategoryListByVendorId = (vendor_id) => (dispatch) => {
  return adminTicketService.MaterialCategoryListByVendorId(vendor_id).then(
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


export const MaterialInputTypeListByVendorId = (vendor_id,material_category_id) => (dispatch) => {
  return adminTicketService.MaterialInputTypeListByVendorId(vendor_id,material_category_id).then(
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