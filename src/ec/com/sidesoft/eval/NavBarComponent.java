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
import org.openbravo.dal.core.OBContext;
import org.openbravo.dal.service.OBCriteria;
import org.openbravo.dal.service.OBDal;
import org.openbravo.database.ConnectionProvider;
import org.openbravo.erpCommon.info.SalesOrder;
import org.openbravo.erpCommon.utility.OBMessageUtils;
import org.openbravo.model.common.businesspartner.BusinessPartner;
import org.openbravo.model.common.order.Order; 
import org.openbravo.scheduling.KillableProcess;
import org.openbravo.scheduling.ProcessBundle;
import org.openbravo.service.db.DalBaseProcess;
import org.openbravo.service.db.DalConnectionProvider;
import org.openbravo.service.db.DbUtility;

public class NavBarComponent extends BaseTemplateComponent {
	
	static Logger log4j = Logger.getLogger(Order.class);
    
    public static final String NAV_BAR_COMPONENT_ID = "ExampleView";

	@Override
    public Map<String, Object> getData() {
        Map<String, Object> data = new HashMap<>();
        List<Map<String, Object>> ordersList = new ArrayList<>();
        
        try {
            OBContext.setAdminMode(true); 
            
            // Crear criterio para las órdenes con docstatus = 'DR'
            OBCriteria<Order> orderCriteria = OBDal.getInstance().createCriteria(Order.class);
            orderCriteria.add(Restrictions.eq(Order.PROPERTY_DOCUMENTSTATUS, "DR")); 
             
            
            List<Order> orders = orderCriteria.list();
            
            for (Order order : orders) {
                Map<String, Object> orderData = new HashMap<>();
                orderData.put("name", order.getBusinessPartner().getName());
                orderData.put("docstatus", order.getDocumentStatus());
                orderData.put("grandtotal", order.getGrandTotalAmount());
                ordersList.add(orderData);
            }
            
            data.put("orders", ordersList);
            
        } catch (Exception e) {
            log4j.error("Error al obtener órdenes", e);
        } finally {
            OBContext.restorePreviousMode();
        }
        
        return data;
    }
}

//  Componente a utilizar en el navbar OBToolbar  isc_OBToolbar