package ec.com.sidesoft.eval;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.openbravo.client.kernel.BaseTemplateComponent;
import org.openbravo.dal.core.OBContext;

import org.apache.log4j.Logger;
import org.hibernate.criterion.Restrictions;
import org.openbravo.base.exception.OBException;
import org.openbravo.base.provider.OBProvider;
import org.openbravo.dal.service.OBCriteria;
import org.openbravo.dal.service.OBDal;
import org.openbravo.database.ConnectionProvider;
import org.openbravo.erpCommon.info.SalesOrder;
import org.openbravo.erpCommon.utility.OBMessageUtils;
import org.openbravo.model.common.order.Order;  
import org.openbravo.scheduling.KillableProcess;
import org.openbravo.scheduling.ProcessBundle;
import org.openbravo.service.db.DalBaseProcess;
import org.openbravo.service.db.DalConnectionProvider;
import org.openbravo.service.db.DbUtility;

import org.openbravo.model.common.invoice.Invoice; // <- ¡usar modelo correcto!
import org.openbravo.model.common.businesspartner.BusinessPartner;

import org.openbravo.client.kernel.BaseActionHandler;

import java.math.BigDecimal;
import org.codehaus.jettison.json.JSONObject;
import org.codehaus.jettison.json.JSONArray; 
 
public class InvoiceStatusHandler extends BaseActionHandler {

  @Override
protected JSONObject execute(Map<String, Object> parameters, String data) {
  try {
    JSONObject jsonData = new JSONObject(data);
    String bpId = jsonData.getString("businessPartnerId");

    if (bpId == null || bpId.isEmpty()) {
      throw new OBException("Business Partner ID is missing");
    }

    OBCriteria<Invoice> invoiceCriteria = OBDal.getInstance().createCriteria(Invoice.class);
    invoiceCriteria.add(Restrictions.eq(Invoice.PROPERTY_BUSINESSPARTNER,
        OBDal.getInstance().get(BusinessPartner.class, bpId)));

    JSONArray invoiceArray = new JSONArray();
    BigDecimal total = BigDecimal.ZERO;

    for (Invoice inv : invoiceCriteria.list()) {
      JSONObject invJson = new JSONObject();
      invJson.put("name", inv.getBusinessPartner().getName());
      invJson.put("docstatus", inv.getDocumentStatus());
      invJson.put("grandtotal", inv.getGrandTotalAmount());
      invoiceArray.put(invJson);

      if (inv.getGrandTotalAmount() != null) {
        total = total.add(inv.getGrandTotalAmount());
      }
    }

    JSONObject result = new JSONObject();
    result.put("invoices", invoiceArray);
    result.put("total", total.doubleValue());

    return result;

  } catch (Exception e) {
    throw new OBException(e);
  }
}

}

//  Componente a utilizar en el navbar OBToolbar  isc_OBToolbar