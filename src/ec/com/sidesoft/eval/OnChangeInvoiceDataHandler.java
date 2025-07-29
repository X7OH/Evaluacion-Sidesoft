package ec.com.sidesoft.eval;

import java.util.Map;
import org.codehaus.jettison.json.JSONObject;
import org.openbravo.base.exception.OBException;
import org.openbravo.client.kernel.BaseActionHandler;
import org.openbravo.dal.service.OBDal;
import org.openbravo.model.common.businesspartner.BusinessPartner;
import org.openbravo.dal.service.OBDal;
import org.openbravo.dal.core.OBContext;

public class OnChangeInvoiceDataHandler extends BaseActionHandler {

  // protected JSONObject execute(Map<String, Object> parameters, String data) {
  //   JSONObject json = new JSONObject();
  //   try {
  //     OBContext.setAdminMode(true);

  //     String bpartnerId = (String) parameters.get("c_bpartner_id");
  //     BusinessPartner bp = OBDal.getInstance().get(BusinessPartner.class, bpartnerId);
  //     if (bp != null) {
  //       json.put("info", bp.getName() + " - " + bp.getTaxID());
  //       json.put("taxId", bp.getTaxID());
  //       json.put("name", bp.getName());

  //     }

  //   } catch (Exception e) {
  //     throw new OBException("Error al obtener info del tercero", e);
  //   }
  //   return json;
  // }
  protected JSONObject execute(Map<String, Object> parameters, String data) {
    JSONObject json = new JSONObject();
    try {
      OBContext.setAdminMode(true);
      String bpartnerId = (String) parameters.get("c_bpartner_id");
      BusinessPartner bp = OBDal.getInstance().get(BusinessPartner.class, bpartnerId);
      if (bp != null) {
        json.put("name", bp.getName()); // ← este valor se usa en JS
      }
    } catch (Exception e) {
      throw new OBException("Error al obtener info del tercero", e);
    } finally {
      OBContext.restorePreviousMode();
    }
    return json;
  }


}