package ec.com.sidesoft.eval;

import org.openbravo.client.kernel.BaseTemplateComponent;
import org.openbravo.dal.core.OBContext;
import java.util.Map;


public class NavBarViewComponent extends BaseTemplateComponent {

  public static final String EXAMPLE_VIEW_COMPONENT_ID = "ExampleView";

  public String getUserName() {
    return OBContext.getOBContext().getUser().getName();
  }

}