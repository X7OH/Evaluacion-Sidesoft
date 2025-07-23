package ec.com.sidesoft.eval.service.Invoices;

import java.io.StringWriter;
import java.io.Writer;
import java.util.ArrayList;
import java.util.List;
 
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.hibernate.criterion.Restrictions;
import org.openbravo.base.structure.BaseOBObject;
import org.openbravo.dal.service.OBCriteria;
import org.openbravo.dal.service.OBDal;
import org.openbravo.dal.xml.EntityXMLConverter;
import org.openbravo.model.common.order.OrderLine;
import org.openbravo.model.common.plm.Product;
import org.openbravo.service.web.WebService;

public class OrdersToCompletetWebService implements WebService {
    private static final long serialVersionUID = 1L;
 
    public void doGet(String path, HttpServletRequest request, HttpServletResponse response)
        throws Exception {
        // do some checking of parameters
        final String productID = request.getParameter("product");
        if (productID == null) {
        throw new IllegalArgumentException("The product parameter is mandatory");
        }
        final Product product = OBDal.getInstance().get(Product.class, productID);
        if (product == null) {
        throw new IllegalArgumentException("Product with id: " + productID + " does not exist");
        }
    
        // select lines from C_ORDERLINE table that match the product
        final OBCriteria<OrderLine> orderLineList = OBDal.getInstance().createCriteria(OrderLine.class);
        orderLineList.add(Restrictions.eq(OrderLine.PROPERTY_PRODUCT, product));
        final List<BaseOBObject> orders = new ArrayList<BaseOBObject>();
    
        // iterate through the lines
        for (OrderLine orderLine : orderLineList.list()) {
        // get the order and only add each order once
        if (!orders.contains(orderLine.getSalesOrder())) {
            orders.add(orderLine.getSalesOrder());
        }
        }
    
        // get an xml converter and set some options
        final EntityXMLConverter exc = EntityXMLConverter.newInstance();
        // also export OrderLines
        exc.setOptionIncludeChildren(true);
        // and embed them in the OrderLines
        // element in an Order.
        exc.setOptionEmbedChildren(true);
        // do not read and convert referenced data in the xml
        // so for example a product reference (from orderLine)
        // will be just one tag with the product id and not a
        // complete product xml document
        exc.setOptionIncludeReferenced(false);
    
        // also export the client/organization elements
        exc.setOptionExportClientOrganizationReferences(true);
    
        // write the output to a String writer
        StringWriter sw = new StringWriter();
        exc.setOutput(sw);
    
        // convert
        exc.process(orders);
    
        // and get the result
        final String xml = sw.toString();
    
        // write to the response
        response.setContentType("text/xml");
        response.setCharacterEncoding("utf-8");
        final Writer w = response.getWriter();
        w.write(xml);
        w.close();
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
