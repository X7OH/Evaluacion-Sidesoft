package ec.com.sidesoft.eval;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import javax.enterprise.context.ApplicationScoped;

import org.openbravo.client.kernel.BaseComponentProvider;
import org.openbravo.client.kernel.Component;
import org.openbravo.client.kernel.ComponentProvider;
import org.openbravo.client.kernel.KernelConstants;

 
// @ApplicationScoped
// @ComponentProvider.Qualifier(ExampleComponentProvider.EXAMPLE_VIEW_COMPONENT_TYPE)
 

public class NavBarComponentProvider extends BaseComponentProvider {
  public static final String COMPONENT_TYPE = "ec.com.sidesoft.app.login.login_Resources";
  

  @Override
  public Component getComponent(String componentId, Map<String, Object> parameters) {

    if (componentId.equals(NavBarComponent.NAV_BAR_COMPONENT_ID)) {
      final NavBarComponent component = new NavBarComponent();
      component.setId(NavBarComponent.NAV_BAR_COMPONENT_ID);
      component.setParameters(parameters);
      return component;
    } 
    throw new IllegalArgumentException("Component id " + componentId + " not supported.");
  }

  @Override
  public List<ComponentResource> getGlobalComponentResources() {
    final String prefix = "web/ec.com.sidesoft.eval";

    final List<ComponentResource> globalResources = new ArrayList<ComponentResource>();
    globalResources.add(createStaticResource(
        "/opt/openbravo/estandar/modules/ec.com.sidesoft.eval/src/templates/Navbar.js.ftl", false));

    globalResources.add(createStaticResource(prefix + "/js/order-ev-field.js", false));
    return globalResources;
  }

  // @Override
  public List<String> getTestResources() {
    return Collections.emptyList();
  }

}




