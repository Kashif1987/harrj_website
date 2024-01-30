import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class ticketService {
  
  TicketDashboard() {
    return axios
      .get(API_URL + "admin/ticket/ticket_dashboard" )
      .then((response) => {
        return response.data;
      });
  }

  TicketAdd(client_id,ticket_desc,priority,estimated_date,warranty,ticket_datetime,location,maintenance_requirement,maintenance_desc,note,warranty_desc='') {
    const insertData = new FormData();
    insertData.set('client_id', client_id);
    insertData.set('ticket_desc', ticket_desc);
    insertData.set('priority',priority);
    insertData.set('estimated_date',estimated_date);
    insertData.set('warranty',warranty);
    insertData.set('ticket_datetime',ticket_datetime);
    insertData.set('location',location);
    insertData.set('warranty_desc',warranty_desc);
    insertData.set('note',note);

    if(maintenance_requirement && typeof maintenance_requirement !=="undefined" && maintenance_requirement.length>0){
      for (var p = 0; p < maintenance_requirement.length; p++) {
        insertData.append('maintenance_requirement', maintenance_requirement[p]);
      }
    }
    if(maintenance_desc && typeof maintenance_desc !=="undefined" && maintenance_desc.length>0){
      for (var p = 0; p < maintenance_desc.length; p++) {
        insertData.append('maintenance_desc', maintenance_desc[p]);
      }
    }

    return axios
      .post(API_URL + "admin/ticket/add", insertData )
      .then((response) => {
        return response.data;
      });
  }

  TicketAddInspection(ticket_id,inspection,inspection_date,inspection_desc) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

     if(inspection_date && typeof inspection_date !=="undefined" && inspection_date.length>0){
      for (let p = 0; p < inspection_date.length; p++) {
        insertData.append('inspection_date', inspection_date[p]);
      }
    } 
    if(inspection && typeof inspection !=="undefined" && inspection.length>0){
      for (let p = 0; p < inspection.length; p++) {
        insertData.append('inspection', inspection[p]);
      }
    } 
    if(inspection_desc && typeof inspection_desc !=="undefined" && inspection_desc.length>0){
      for (let p = 0; p < inspection_desc.length; p++) {
        insertData.append('inspection_desc', inspection_desc[p]);
      }
    }

    return axios
      .post(API_URL + "admin/ticket/add_inspection", insertData )
      .then((response) => {
        return response.data;
      });
  }
  

  TicketAddTeam(ticket_id,team_id,staff_id,reporting_to,from_date,to_date) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

    if(team_id && typeof team_id !=="undefined" && team_id.length>0){
      for (let p = 0; p < team_id.length; p++) {
        insertData.append('team_id', team_id[p]);
      }
    }
    if(staff_id && typeof staff_id !=="undefined" && staff_id.length>0){
      for (let p = 0; p < staff_id.length; p++) {
        insertData.append('staff_id', staff_id[p]);
      }
    }
    if(reporting_to && typeof reporting_to !=="undefined" && reporting_to.length>0){
      for (let p = 0; p < reporting_to.length; p++) {
        insertData.append('reporting_to', reporting_to[p]);
      }
    }
    if(from_date && typeof from_date !=="undefined" && from_date.length>0){
      for (let p = 0; p < from_date.length; p++) {
        insertData.append('from_date', from_date[p]);
      }
    } 
    if(to_date && typeof to_date !=="undefined" && to_date.length>0){
      for (let p = 0; p < to_date.length; p++) {
        insertData.append('to_date', to_date[p]);
      }
    }
    return axios
      .post(API_URL + "admin/ticket/assign_team", insertData )
      .then((response) => {
        const updateData = new FormData();
        updateData.set('ticket_id', ticket_id);
        updateData.set('ticket_status', "assigned");

        return axios
          .post(API_URL + "admin/ticket/update_ticket_status", updateData )
          .then((responseSub) => {
            //return responseSub.data;
            return response.data;
          });

        
      });
  }


   TicketAddMaintenance(ticket_id,vendor_id,material_category_id,material_input_type_id,vendor_item_id,material_rate,material_quantity,material_cost,transport_desc,transport_rate,
    transport_quantity,transport_cost,install_desc,install_rate,install_quantity,install_cost,tax_due_desc,tax_due_rate,tax_due_quantity,
    tax_due_cost,total_material_cost,total_transportation_cost,total_installation_cost,total_tax_dues_cost,total_maintenace_cost) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

    if(vendor_id && typeof vendor_id !=="undefined" && vendor_id.length>0){
      for (let p = 0; p < vendor_id.length; p++) {
        insertData.append('vendor_id', vendor_id[p]);
      }
    }

    if(material_category_id && typeof material_category_id !=="undefined" && material_category_id.length>0){
      for (let p = 0; p < material_category_id.length; p++) {
        insertData.append('material_category_id', material_category_id[p]);
      }
    }

    if(material_input_type_id && typeof material_input_type_id !=="undefined" && material_input_type_id.length>0){
      for (let p = 0; p < material_input_type_id.length; p++) {
        insertData.append('material_input_type_id', material_input_type_id[p]);
      }
    }

    if(vendor_item_id && typeof vendor_item_id !=="undefined" && vendor_item_id.length>0){
      for (let p = 0; p < vendor_item_id.length; p++) {
        insertData.append('vendor_item_id', vendor_item_id[p]);
      }
    }
    if(material_rate && typeof material_rate !=="undefined" && material_rate.length>0){
      for (let p = 0; p < material_rate.length; p++) {
        insertData.append('material_rate', material_rate[p]);
      }
    } 
    if(material_quantity && typeof material_quantity !=="undefined" && material_quantity.length>0){
      for (let p = 0; p < material_quantity.length; p++) {
        insertData.append('material_quantity', material_quantity[p]);
      }
    }
    if(material_cost && typeof material_cost !=="undefined" && material_cost.length>0){
      for (let p = 0; p < material_cost.length; p++) {
        insertData.append('material_cost', material_cost[p]);
      }
    }
      if(transport_desc && typeof transport_desc !=="undefined" && transport_desc.length>0){
      for (let p = 0; p < transport_desc.length; p++) {
        insertData.append('transport_desc', transport_desc[p]);
      }
    }  if(transport_rate && typeof transport_rate !=="undefined" && transport_rate.length>0){
      for (let p = 0; p < transport_rate.length; p++) {
        insertData.append('transport_rate', transport_rate[p]);
      }
    }  if(transport_quantity && typeof transport_quantity !=="undefined" && transport_quantity.length>0){
      for (let p = 0; p < transport_quantity.length; p++) {
        insertData.append('transport_quantity', transport_quantity[p]);
      }
    }  if(transport_cost && typeof transport_cost !=="undefined" && transport_cost.length>0){
      for (let p = 0; p < transport_cost.length; p++) {
        insertData.append('transport_cost', transport_cost[p]);
      }
    }  if(install_desc && typeof install_desc !=="undefined" && install_desc.length>0){
      for (let p = 0; p < install_desc.length; p++) {
        insertData.append('install_desc', install_desc[p]);
      }
    }  if(install_rate && typeof install_rate !=="undefined" && install_rate.length>0){
      for (let p = 0; p < install_rate.length; p++) {
        insertData.append('install_rate', install_rate[p]);
      }
    }  if(install_quantity && typeof install_quantity !=="undefined" && install_quantity.length>0){
      for (let p = 0; p < install_quantity.length; p++) {
        insertData.append('install_quantity', install_quantity[p]);
      }
    }  if(install_cost && typeof install_cost !=="undefined" && install_cost.length>0){
      for (let p = 0; p < install_cost.length; p++) {
        insertData.append('install_cost', install_cost[p]);
      }
    }  if(tax_due_desc && typeof tax_due_desc !=="undefined" && tax_due_desc.length>0){
      for (let p = 0; p < tax_due_desc.length; p++) {
        insertData.append('tax_due_desc', tax_due_desc[p]);
      }
    }  if(tax_due_rate && typeof tax_due_rate !=="undefined" && tax_due_rate.length>0){
      for (let p = 0; p < tax_due_rate.length; p++) {
        insertData.append('tax_due_rate', tax_due_rate[p]);
      }
    }  if(tax_due_quantity && typeof tax_due_quantity !=="undefined" && tax_due_quantity.length>0){
      for (let p = 0; p < tax_due_quantity.length; p++) {
        insertData.append('tax_due_quantity', tax_due_quantity[p]);
      }
    }  if(tax_due_cost && typeof tax_due_cost !=="undefined" && tax_due_cost.length>0){
      for (let p = 0; p < tax_due_cost.length; p++) {
        insertData.append('tax_due_cost', tax_due_cost[p]);
      }
    }

    if(total_material_cost && typeof total_material_cost !=="undefined" ){

      insertData.set('total_material_cost', total_material_cost);
    } 
    if(total_transportation_cost && typeof total_transportation_cost !=="undefined" ){
      
      insertData.set('total_transportation_cost', total_transportation_cost);
    }   
    if(total_installation_cost && typeof total_installation_cost !=="undefined" ){
      
      insertData.set('total_installation_cost', total_installation_cost);
    }   
    if(total_tax_dues_cost && typeof total_tax_dues_cost !=="undefined" ){
      
      insertData.set('total_tax_dues_cost', total_tax_dues_cost);
    }   
    if(total_maintenace_cost && typeof total_maintenace_cost !=="undefined" ){
      
      insertData.set('total_maintenace_cost', total_maintenace_cost);
    }

    return axios
      .post(API_URL + "admin/ticket/add_maintenance_cost", insertData )
      .then((response) => {
        //return response.data;
        const updateData = new FormData();
        updateData.set('ticket_id', ticket_id);
        updateData.set('ticket_status', "inprogress");

        return axios
          .post(API_URL + "admin/ticket/update_ticket_status", updateData )
          .then((responseSub) => {
            //return responseSub.data;
            return response.data;
          });
      });
  }


  TicketAddSupportingDoc(ticket_id,draw_date,draw_description,version,draw_doc_file,doc_file_desc,doc_file) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

    if(draw_date && typeof draw_date !=="undefined" && draw_date.length>0){
      for (let p = 0; p < draw_date.length; p++) {
        insertData.append('draw_date', draw_date[p]);
      }
    }
    if(draw_description && typeof draw_description !=="undefined" && draw_description.length>0){
      for (let p = 0; p < draw_description.length; p++) {
        insertData.append('draw_description', draw_description[p]);
      }
    }
    if(version && typeof version !=="undefined" && version.length>0){
      for (let p = 0; p < version.length; p++) {
        insertData.append('version', version[p]);
      }
    }
    if(draw_doc_file && typeof draw_doc_file !=="undefined" && draw_doc_file.length>0){
      for (let p = 0; p < draw_doc_file.length; p++) {
        insertData.append('draw_doc_file', draw_doc_file[p]);
      }
    } 
    if(doc_file_desc && typeof doc_file_desc !=="undefined" && doc_file_desc.length>0){
      for (let p = 0; p < doc_file_desc.length; p++) {
        insertData.append('doc_file_desc', doc_file_desc[p]);
      }
    }
    if(doc_file && typeof doc_file !=="undefined" && doc_file.length>0){
      for (let p = 0; p < doc_file.length; p++) {
        insertData.append('doc_file', doc_file[p]);
      }
    }

    console.log(draw_doc_file);
    console.log(".............");
    return axios
      .post(API_URL + "admin/ticket/add_supporting_doc", insertData )
      .then((response) => {
        return response.data;
      });
  }

TicketAddStatus(ticket_id,ticket_status) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);
    insertData.set('ticket_status', ticket_status);

    return axios
      .post(API_URL + "admin/ticket/update_ticket_status", insertData )
      .then((response) => {
        return response.data;
      });
  }


  TicketList(client_id,ticket_status,priority,from_date,to_date) {

    console.log("service client_id");
    console.log(client_id);

    console.log("service ticket_status");
    console.log(ticket_status);

    console.log("service priority");
    console.log(priority);

    console.log("service from_date");
    console.log(from_date);

    console.log("service to_date");
    console.log(to_date);

     const listData = new FormData();
    listData.set('client_id', client_id);
    listData.set('ticket_status', ticket_status);
    listData.set('priority', priority);
    listData.set('from_date', from_date);
    listData.set('to_date', to_date);
    return axios
      // .get(API_URL + "admin/ticket/list?client_id="+client_id+"&ticket_status="+ticket_status+"&priority="+priority+"&from_date="+from_date+"&to_date="+to_date)
       .post(API_URL + "admin/ticket/list",listData)
       .then((response) => {
        return response.data;
      });
  }

  TicketInfo(ticket_id) {
    return axios
      .post(API_URL + "admin/ticket/getinfo", { ticket_id })
      .then((response) => {
        return response.data;
      });
  }

  TicketBasicInfo(ticket_id) {
    return axios
      .post(API_URL + "admin/ticket/basic_ticket_info", { ticket_id })
      .then((response) => {
        return response.data;
      });
  }

  TicketSiteInspectionInfo(ticket_id) {
    return axios
      .post(API_URL + "admin/ticket/site_inspection_info", { ticket_id })
      .then((response) => {
        return response.data;
      });
  }

  TicketAssignTeamInfo(ticket_id) {
    return axios
      .post(API_URL + "admin/ticket/ticket_team_info", { ticket_id })
      .then((response) => {
        return response.data;
      });
  }

  TicketCostImplementationInfo(ticket_id) {
    return axios
      .post(API_URL + "admin/ticket/ticket_cost_info", { ticket_id })
      .then((response) => {
        return response.data;
      });
  }

  TicketSupportingDocumentsInfo(ticket_id) {
    return axios
      .post(API_URL + "admin/ticket/ticket_draw_files_info", { ticket_id })
      .then((response) => {
        return response.data;
      });
  }
  

  TicketInfoUpdate(ticket_id, client_id,ticket_desc,priority,estimated_date,warranty,ticket_datetime,location,ticket_maint_id,maintenance_requirement,maintenance_desc,note,warranty_desc='') {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);
    insertData.set('client_id', client_id);
    insertData.set('client_id', client_id);
    insertData.set('ticket_desc', ticket_desc);
    insertData.set('priority',priority);
    insertData.set('estimated_date',estimated_date);
    insertData.set('warranty',warranty);
    insertData.set('ticket_datetime',ticket_datetime);
    insertData.set('location',location);
    insertData.set('warranty_desc',warranty_desc);
    insertData.set('note',note);

    if(ticket_maint_id && typeof ticket_maint_id !=="undefined" && ticket_maint_id.length>0){
      for (var p = 0; p < ticket_maint_id.length; p++) {
        insertData.append('ticket_maint_id', ticket_maint_id[p]);
      }
    }

    if(maintenance_requirement && typeof maintenance_requirement !=="undefined" && maintenance_requirement.length>0){
      for (var p = 0; p < maintenance_requirement.length; p++) {
        insertData.append('maintenance_requirement', maintenance_requirement[p]);
      }
    }
    
    if(maintenance_desc && typeof maintenance_desc !=="undefined" && maintenance_desc.length>0){
      for (var p = 0; p < maintenance_desc.length; p++) {
        insertData.append('maintenance_desc', maintenance_desc[p]);
      }
    }

    return axios
      .post(API_URL + "admin/ticket/basic_ticket_update", insertData )
      .then((response) => {
        return response.data;
      });
  }

  TicketSiteInspectionInfoUpdate(ticket_id,ticket_insp_id,inspection,inspection_date,inspection_desc) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

    if(ticket_insp_id && typeof ticket_insp_id !=="undefined" && ticket_insp_id.length>0){
      for (let p = 0; p < ticket_insp_id.length; p++) {
        insertData.append('ticket_insp_id', ticket_insp_id[p]);
      }
    }

    if(inspection_date && typeof inspection_date !=="undefined" && inspection_date.length>0){
      for (let p = 0; p < inspection_date.length; p++) {
        insertData.append('inspection_date', inspection_date[p]);
      }
    }
     
    if(inspection && typeof inspection !=="undefined" && inspection.length>0){
      for (let p = 0; p < inspection.length; p++) {
        insertData.append('inspection', inspection[p]);
      }
    } 
    if(inspection_desc && typeof inspection_desc !=="undefined" && inspection_desc.length>0){
      for (let p = 0; p < inspection_desc.length; p++) {
        insertData.append('inspection_desc', inspection_desc[p]);
      }
    }

    return axios
      .post(API_URL + "admin/ticket/site_inspection_update", insertData )
      .then((response) => {
        return response.data;
      });
  }
  

  TicketAssignTeamInfoUpdate(ticket_id,ticket_assign_id,team_id,staff_id,reporting_to,from_date,to_date) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

    if(ticket_assign_id && typeof ticket_assign_id !=="undefined" && ticket_assign_id.length>0){
      for (let p = 0; p < ticket_assign_id.length; p++) {
        insertData.append('ticket_assign_id', ticket_assign_id[p]);
      }
    }
    if(team_id && typeof team_id !=="undefined" && team_id.length>0){
      for (let p = 0; p < team_id.length; p++) {
        insertData.append('team_id', team_id[p]);
      }
    }
    if(staff_id && typeof staff_id !=="undefined" && staff_id.length>0){
      for (let p = 0; p < staff_id.length; p++) {
        insertData.append('staff_id', staff_id[p]);
      }
    }
    if(reporting_to && typeof reporting_to !=="undefined" && reporting_to.length>0){
      for (let p = 0; p < reporting_to.length; p++) {
        insertData.append('reporting_to', reporting_to[p]);
      }
    }
    if(from_date && typeof from_date !=="undefined" && from_date.length>0){
      for (let p = 0; p < from_date.length; p++) {
        insertData.append('from_date', from_date[p]);
      }
    } 
    if(to_date && typeof to_date !=="undefined" && to_date.length>0){
      for (let p = 0; p < to_date.length; p++) {
        insertData.append('to_date', to_date[p]);
      }
    }
    return axios
      .post(API_URL + "admin/ticket/ticket_team_update", insertData )
      .then((response) => {
        //return response.data;

        const updateData = new FormData();
        updateData.set('ticket_id', ticket_id);
        updateData.set('ticket_status', "assigned");

        return axios
          .post(API_URL + "admin/ticket/update_ticket_status", updateData )
          .then((responseSub) => {
            //return responseSub.data;
            return response.data;
          });

      });
  }


   TicketCostImplementationInfoUpdate(ticket_id,ticket_material_id,vendor_id,material_category_id,material_input_type_id,vendor_item_id,material_rate,material_quantity,material_cost,ticket_transport_id,transport_desc,transport_rate,transport_quantity,transport_cost,ticket_install_id,install_desc,install_rate,install_quantity,install_cost,ticket_tax_dues_id,tax_due_desc,tax_due_rate,tax_due_quantity,tax_due_cost,total_material_cost,total_transportation_cost,total_installation_cost,total_tax_dues_cost,total_maintenace_cost) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

    if(ticket_material_id && typeof ticket_material_id !=="undefined" && ticket_material_id.length>0){
      for (let p = 0; p < ticket_material_id.length; p++) {
        insertData.append('ticket_material_id', ticket_material_id[p]);
      }
    }

    if(vendor_id && typeof vendor_id !=="undefined" && vendor_id.length>0){
      for (let p = 0; p < vendor_id.length; p++) {
        insertData.append('vendor_id', vendor_id[p]);
      }
    }

    if(material_category_id && typeof material_category_id !=="undefined" && material_category_id.length>0){
      for (let p = 0; p < material_category_id.length; p++) {
        insertData.append('material_category_id', material_category_id[p]);
      }
    }

    if(material_input_type_id && typeof material_input_type_id !=="undefined" && material_input_type_id.length>0){
      for (let p = 0; p < material_input_type_id.length; p++) {
        insertData.append('material_input_type_id', material_input_type_id[p]);
      }
    }

    if(vendor_item_id && typeof vendor_item_id !=="undefined" && vendor_item_id.length>0){
      for (let p = 0; p < vendor_item_id.length; p++) {
        insertData.append('vendor_item_id', vendor_item_id[p]);
      }
    }
    if(material_rate && typeof material_rate !=="undefined" && material_rate.length>0){
      for (let p = 0; p < material_rate.length; p++) {
        insertData.append('material_rate', material_rate[p]);
      }
    } 
    if(material_quantity && typeof material_quantity !=="undefined" && material_quantity.length>0){
      for (let p = 0; p < material_quantity.length; p++) {
        insertData.append('material_quantity', material_quantity[p]);
      }
    }
    if(material_cost && typeof material_cost !=="undefined" && material_cost.length>0){
      for (let p = 0; p < material_cost.length; p++) {
        insertData.append('material_cost', material_cost[p]);
      }
    }

    if(ticket_transport_id && typeof ticket_transport_id !=="undefined" && ticket_transport_id.length>0){
      for (let p = 0; p < ticket_transport_id.length; p++) {
        insertData.append('ticket_transport_id', ticket_transport_id[p]);
      }
    }
    if(transport_desc && typeof transport_desc !=="undefined" && transport_desc.length>0){
      for (let p = 0; p < transport_desc.length; p++) {
        insertData.append('transport_desc', transport_desc[p]);
      }
    }  if(transport_rate && typeof transport_rate !=="undefined" && transport_rate.length>0){
      for (let p = 0; p < transport_rate.length; p++) {
        insertData.append('transport_rate', transport_rate[p]);
      }
    }  if(transport_quantity && typeof transport_quantity !=="undefined" && transport_quantity.length>0){
      for (let p = 0; p < transport_quantity.length; p++) {
        insertData.append('transport_quantity', transport_quantity[p]);
      }
    }  if(transport_cost && typeof transport_cost !=="undefined" && transport_cost.length>0){
      for (let p = 0; p < transport_cost.length; p++) {
        insertData.append('transport_cost', transport_cost[p]);
      }
    }  

    if(ticket_install_id && typeof ticket_install_id !=="undefined" && ticket_install_id.length>0){
      for (let p = 0; p < ticket_install_id.length; p++) {
        insertData.append('ticket_install_id', ticket_install_id[p]);
      }
    }

    if(install_desc && typeof install_desc !=="undefined" && install_desc.length>0){
      for (let p = 0; p < install_desc.length; p++) {
        insertData.append('install_desc', install_desc[p]);
      }
    }  if(install_rate && typeof install_rate !=="undefined" && install_rate.length>0){
      for (let p = 0; p < install_rate.length; p++) {
        insertData.append('install_rate', install_rate[p]);
      }
    }  if(install_quantity && typeof install_quantity !=="undefined" && install_quantity.length>0){
      for (let p = 0; p < install_quantity.length; p++) {
        insertData.append('install_quantity', install_quantity[p]);
      }
    }  if(install_cost && typeof install_cost !=="undefined" && install_cost.length>0){
      for (let p = 0; p < install_cost.length; p++) {
        insertData.append('install_cost', install_cost[p]);
      }
    }



    if(ticket_tax_dues_id && typeof ticket_tax_dues_id !=="undefined" && ticket_tax_dues_id.length>0){
      for (let p = 0; p < ticket_tax_dues_id.length; p++) {
        insertData.append('ticket_tax_dues_id', ticket_tax_dues_id[p]);
      }
    }

    if(tax_due_desc && typeof tax_due_desc !=="undefined" && tax_due_desc.length>0){
      for (let p = 0; p < tax_due_desc.length; p++) {
        insertData.append('tax_due_desc', tax_due_desc[p]);
      }
    }  if(tax_due_rate && typeof tax_due_rate !=="undefined" && tax_due_rate.length>0){
      for (let p = 0; p < tax_due_rate.length; p++) {
        insertData.append('tax_due_rate', tax_due_rate[p]);
      }
    }  if(tax_due_quantity && typeof tax_due_quantity !=="undefined" && tax_due_quantity.length>0){
      for (let p = 0; p < tax_due_quantity.length; p++) {
        insertData.append('tax_due_quantity', tax_due_quantity[p]);
      }
    }  if(tax_due_cost && typeof tax_due_cost !=="undefined" && tax_due_cost.length>0){
      for (let p = 0; p < tax_due_cost.length; p++) {
        insertData.append('tax_due_cost', tax_due_cost[p]);
      }
    }

    if(total_material_cost && typeof total_material_cost !=="undefined" ){

      insertData.set('total_material_cost', total_material_cost);
    } 
    if(total_transportation_cost && typeof total_transportation_cost !=="undefined" ){
      
      insertData.set('total_transportation_cost', total_transportation_cost);
    }   
    if(total_installation_cost && typeof total_installation_cost !=="undefined" ){
      
      insertData.set('total_installation_cost', total_installation_cost);
    }   
    if(total_tax_dues_cost && typeof total_tax_dues_cost !=="undefined" ){
      
      insertData.set('total_tax_dues_cost', total_tax_dues_cost);
    }   
    if(total_maintenace_cost && typeof total_maintenace_cost !=="undefined" ){
      
      insertData.set('total_maintenace_cost', total_maintenace_cost);
    } 
   
    return axios
      .post(API_URL + "admin/ticket/ticket_cost_update", insertData )
      .then((response) => {
        //return response.data;

        const updateData = new FormData();
        updateData.set('ticket_id', ticket_id);
        updateData.set('ticket_status', "inprogress");

        return axios
          .post(API_URL + "admin/ticket/update_ticket_status", updateData )
          .then((responseSub) => {
            //return responseSub.data;
            return response.data;
          });
          
      });
  }


  TicketSupportingDocumentsInfoUpdate(ticket_id,ticket_draw_id,draw_date,draw_description,version,draw_doc_file,ticket_doc_id,doc_file_desc,doc_file) {
    const insertData = new FormData();
    insertData.set('ticket_id', ticket_id);

    if(ticket_doc_id && typeof ticket_doc_id !=="undefined" && ticket_doc_id.length>0){
      for (let p = 0; p < ticket_doc_id.length; p++) {
        insertData.append('ticket_doc_id', ticket_doc_id[p]);
      }
    }

    if(draw_date && typeof draw_date !=="undefined" && draw_date.length>0){
      for (let p = 0; p < draw_date.length; p++) {
        insertData.append('draw_date', draw_date[p]);
      }
    }
    if(draw_description && typeof draw_description !=="undefined" && draw_description.length>0){
      for (let p = 0; p < draw_description.length; p++) {
        insertData.append('draw_description', draw_description[p]);
      }
    }
    if(version && typeof version !=="undefined" && version.length>0){
      for (let p = 0; p < version.length; p++) {
        insertData.append('version', version[p]);
      }
    }
    if(draw_doc_file && typeof draw_doc_file !=="undefined" && draw_doc_file.length>0){
      for (let p = 0; p < draw_doc_file.length; p++) {
        insertData.append('draw_doc_file', draw_doc_file[p]);
      }
    } 

    if(ticket_draw_id && typeof ticket_draw_id !=="undefined" && ticket_draw_id.length>0){
      for (let p = 0; p < ticket_draw_id.length; p++) {
        insertData.append('ticket_draw_id', ticket_draw_id[p]);
      }
    } 

    if(doc_file_desc && typeof doc_file_desc !=="undefined" && doc_file_desc.length>0){
      for (let p = 0; p < doc_file_desc.length; p++) {
        insertData.append('doc_file_desc', doc_file_desc[p]);
      }
    }
    if(doc_file && typeof doc_file !=="undefined" && doc_file.length>0){
      for (let p = 0; p < doc_file.length; p++) {
        insertData.append('doc_file', doc_file[p]);
      }
    }


    return axios
      .post(API_URL + "admin/ticket/supporting_doc_update", insertData )
      .then((response) => {
        return response.data;
      });
  }



  TicketUpdate(ticket_id, name, contact_person, mobile_no, email_id, address, location, pincode) {
    const updateData = new FormData();
    updateData.set('ticket_id', ticket_id);
    updateData.set('name', name);
    updateData.set('contact_person', contact_person);
    updateData.set('mobile_no', mobile_no);
    updateData.set('email_id', email_id);
    updateData.set('address', address);
    updateData.set('location', location);
    updateData.set('pincode', pincode);

    return axios
      .post(API_URL + "admin/ticket/update", updateData )
      .then((response) => {
        return response.data;
      });
  }
  
  TicketDelete(ticket_id) {
    return axios
      .post(API_URL + "admin/ticket/delete", { ticket_id })
      .then((response) => {
        return response.data;
      });
  }

  MaterialCategoryListByVendorId(vendor_id) {
    return axios
      .post(API_URL + "admin/material_category/material_category_list_by_vendor_id", { vendor_id })
      .then((response) => {
        return response.data;
      });
  }

  MaterialInputTypeListByVendorId(vendor_id, material_category_id) {
    return axios
      .post(API_URL + "admin/material_input_type/material_input_type_list_by_vendor_id", { vendor_id, material_category_id })
      .then((response) => {
        return response.data;
      });
  }
}

export default new ticketService();