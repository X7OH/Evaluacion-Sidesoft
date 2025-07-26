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

 
@ApplicationScoped
@ComponentProvider.Qualifier(NavBarComponentProvider.EXAMPLE_VIEW_COMPONENT_TYPE) 
public class NavBarComponentProvider extends BaseComponentProvider { 

	public static final String EXAMPLE_VIEW_COMPONENT_TYPE = "OBEXAPP_OrderBPartnerViewType";
	
	  @Override
	  public Component getComponent(String componentId, Map<String, Object> parameters) {
	    if (componentId.equals(NavBarViewComponent.EXAMPLE_VIEW_COMPONENT_ID)) {
	      NavBarViewComponent component = new NavBarViewComponent();
	      component.setId(NavBarViewComponent.EXAMPLE_VIEW_COMPONENT_ID);
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
        "ec/com/sidesoft/eval/templates/Navbar.js.ftl", false));
        
    globalResources.add(createStaticResource( prefix + "/js/statusColor.js", false));

    globalResources.add(createStaticResource(prefix + "/js/nav-bar-button.js", false));
    globalResources.add(createStaticResource(prefix + "/js/bpinfo-onchange.js", false));
    
    return globalResources;
  }

  // @Override
  public List<String> getTestResources() {
    return Collections.emptyList();
  }

}




