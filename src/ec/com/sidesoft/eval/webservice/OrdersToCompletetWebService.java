package ec.com.sidesoft.eval.webservice;

import org.openbravo.base.secureApp.HttpSecureAppServlet;
import org.openbravo.database.ConnectionProvider;
import org.openbravo.model.common.invoice.Invoice;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.openbravo.dal.core.OBContext;
import org.openbravo.dal.service.OBCriteria;
import org.openbravo.dal.service.OBDal;
import org.json.JSONArray;
import org.json.JSONObject;
import org.openbravo.base.exception.OBException;
import org.openbravo.base.provider.OBProvider;

import org.hibernate.criterion.Restrictions;

import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
 
import org.openbravo.service.web.WebService;



public class OrdersToCompletetWebService implements WebService{

  private static final long serialVersionUID = 1L;
 
  public void doGet(String path, HttpServletRequest request, HttpServletResponse response)
      throws Exception {
        
	final OBCriteria<Invoice> invoiceList = OBDal.getInstance().createCriteria(Invoice.class);  
	invoiceList.add(Restrictions.eq(Invoice.PROPERTY_DOCUMENTSTATUS , "DR"));
	
	// final List<BaseOBObject> invoices = new ArrayList<BaseOBObject>();
	// // iterate through the lines
  //   for (Invoice invoice : invoiceList.list()) {
  //     // get the order and only add each order once
  //     if (!invoices.contains(invoice.getSalesOrder())) {
  //       invoices.add(invoice.getSalesOrder());
  //     }  
  //   } 
 
  // }   
  
  JSONArray invoicesArray = new JSONArray();

  for (Invoice invoice : invoiceList.list()){   
    JSONObject invoiceJson = new JSONObject(); 
    invoiceJson.put("id", invoice.getId());
    invoiceJson.put("documentNo", invoice.getDocumentNo());
    invoiceJson.put("businessPartner", invoice.getBusinessPartner().getName());
    invoiceJson.put("dateInvoiced", invoice.getInvoiceDate()); 
    // Agrega más campos según lo que necesites exponer
    invoicesArray.put(invoiceJson);
  } 

  JSONObject result = new JSONObject();
  result.put("invoices", invoicesArray);

  response.setContentType("application/json");
  response.setCharacterEncoding("utf-8");
  Writer w = response.getWriter();
  w.write(result.toString());
  w.close();
  }    
 
  public void doDelete(String path, HttpServletRequest request, HttpServletResponse response)
      throws Exception {
  }
 
  public void doPost(String path, HttpServletRequest request, HttpServletResponse response)
      throws Exception {
  }
 
  public void doPut(String path, HttpServletRequest request, HttpServletResponse response)
      throws Exception {
  }

  //   private String getResponse(Response response) {
  //   Gson gson = new Gson();
  //   String json = gson.toJson(response);
  //   return json;
  // }
}