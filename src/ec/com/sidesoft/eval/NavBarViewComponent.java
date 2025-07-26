package ec.com.sidesoft.eval;

import java.util.HashMap;
import java.util.Map;

import org.openbravo.client.kernel.BaseTemplateComponent;
import org.openbravo.dal.core.OBContext;
import org.openbravo.dal.service.OBDal;
import org.openbravo.model.ad.access.User;

public class NavBarViewComponent extends BaseTemplateComponent {
  
  public static final String EXAMPLE_VIEW_COMPONENT_ID = "ExampleView";
 
  public String getUserName() {
    return OBContext.getOBContext().getUser().getName();
  }

  public String getUserId() {
    return OBContext.getOBContext().getUser().getId();
  }

  public Map<String, Object> getTemplateParameters() {
    Map<String, Object> parameters = new HashMap<String, Object>();

    try {
      String userId = getUserId();
      User user = OBDal.getInstance().get(User.class, userId);
      parameters.put("userName", user != null ? getUserName() : "Desconocido");
    } catch (Exception e) {
      parameters.put("userName", "Error");
    }

    return parameters;
  }
}
