package org.openbravo.client.application.examples;

import java.util.Map;
import org.codehaus.jettison.json.JSONObject;
import org.openbravo.base.exception.OBException;
import org.openbravo.client.kernel.BaseActionHandler;
import org.openbravo.dal.service.OBDal;
import org.openbravo.model.common.businesspartner.BusinessPartner;

public class OnChangeInvoiceDataHandler extends BaseActionHandler {
  protected JSONObject execute(Map<String, Object> parameters, String data) {
    try {
      final JSONObject jsonData = new JSONObject(data);
      final String bpartnerId = jsonData.getString("c_bpartner_id");

      BusinessPartner bp = OBDal.getInstance().get(BusinessPartner.class, bpartnerId);
      String info = "";
      if (bp != null) {
        // Supón que el campo RUC/cédula se llama taxID
        info = bp.getName() + " - " + bp.getTaxID();
      }

      JSONObject json = new JSONObject();
      json.put("info", info);
      return json;
    } catch (Exception e) {
      throw new OBException(e);
    }
  }
}