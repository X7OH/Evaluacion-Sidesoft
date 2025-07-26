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
        
    OBContext.setAdminMode();

    try {
      JSONArray jsonArray = new JSONArray();
      List<Invoice> invoices = OBDal.getInstance().createQuery(Invoice.class, "").setMaxResults(100).list();

      for (Invoice inv : invoices) {
        JSONObject json = new JSONObject();
        json.put("invoice_number", inv.getDocumentNo());
        json.put("date", inv.getInvoiceDate().toString());
        json.put("business_partner", inv.getBusinessPartner().getName());
        json.put("total_amount", inv.getGrandTotalAmount().toString());
        json.put("status", inv.getDocumentStatus());
        jsonArray.put(json);
      }

      response.setContentType("application/json");
      PrintWriter out = response.getWriter();
      out.print(jsonArray.toString());
      out.flush();
    } catch (Exception e) {
      response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al procesar facturas");
    } finally {
      OBContext.restorePreviousMode();
    }
    }
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