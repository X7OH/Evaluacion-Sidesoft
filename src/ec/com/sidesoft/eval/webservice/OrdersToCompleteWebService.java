package ec.com.sidesoft.eval.webservice;

import org.openbravo.service.web.BaseWebServiceServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.openbravo.model.common.invoice.Invoice;
import org.openbravo.dal.core.OBContext;
import org.openbravo.dal.service.OBDal;
import org.openbravo.dal.service.OBQuery;
import org.json.JSONArray;
import org.json.JSONObject;
import javax.servlet.ServletException;
import java.io.PrintWriter;
import java.util.List;
import java.io.IOException;
 

public class OrdersToCompleteWebService extends BaseWebServiceServlet{ 
 
  private static final long serialVersionUID = 1L;
 
//  public void doGet(String path, HttpServletRequest request, HttpServletResponse response)
//      throws Exception {
//      OBContext.setAdminMode();
//
//      try {
//        JSONArray jsonArray = new JSONArray(); 
//        OBQuery<Invoice> query = OBDal.getInstance().createQuery(Invoice.class, "");
//        query.setMaxResult(100);
//        List<Invoice> invoices = query.list();
//  //      OBCriteria<Invoice> criteria = OBDal.getInstance().createCriteria(Invoice.class);
//  //      criteria.add(Restrictions.eq(Invoice.PROPERTY_SALESTRANSACTION, true)); // Solo ventas
//  //      criteria.add(Restrictions.eq(Invoice.PROPERTY_DOCUMENTSTATUS, "CO"));  // Solo completadas
//
//
//        for (Invoice inv : invoices) {
//          JSONObject json = new JSONObject();
//          json.put("invoice_number", inv.getDocumentNo());
//          json.put("date", inv.getInvoiceDate().toString());
//          json.put("business_partner", inv.getBusinessPartner().getName());
//          json.put("total_amount", inv.getGrandTotalAmount().toString());
//          json.put("status", inv.getDocumentStatus());
//          jsonArray.put(json);
//        }
//
//        response.setContentType("application/json");
//        PrintWriter out = response.getWriter();
//        out.print(jsonArray.toString());
//        out.flush();
//      } catch (Exception e) {
//        response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error al procesar facturas");
//      } finally {
//        OBContext.restorePreviousMode();
//      }
//    }  
  @Override
  protected void doGet(HttpServletRequest request, HttpServletResponse response) {
    try { 
      OBContext.setAdminMode();
      JSONArray jsonArray = new JSONArray();
      OBQuery<Invoice> query = OBDal.getInstance().createQuery(Invoice.class, "");
      query.setMaxResult(100);
      List<Invoice> invoices = query.list();

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
      e.printStackTrace();
    } finally {
      OBContext.restorePreviousMode();
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


}