// package ec.com.sidesoft.eval.service.Invoices;

// import org.openbravo.base.secureApp.HttpSecureAppServlet;
// import org.openbravo.database.ConnectionProvider;

// import javax.servlet.*;
// import javax.servlet.http.*;
// import java.io.*;

// import java.sql.*;

// public class OrdersToCompletetWebService extends HttpSecureAppServlet {

//   public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
//     VariablesSecureApp vars = new VariablesSecureApp(request);
//     String invoiceId = vars.getStringParameter("c_invoice_id");

//     response.setContentType("application/json");
//     PrintWriter out = response.getWriter();

//     Connection conn = null;
//     try {
//       conn = getConnection();
//       ConnectionProvider cp = this.getConnectionProvider();

//       if (invoiceId == null || invoiceId.equals("")) {
//         // Mostrar facturas en borrador
//         String query = "SELECT c_invoice_id, documentno FROM c_invoice WHERE docstatus = 'DR'";
//         PreparedStatement ps = conn.prepareStatement(query);
//         ResultSet rs = ps.executeQuery();

//         out.println("{ \"draftInvoices\": [");
//         boolean first = true;
//         while (rs.next()) {
//           if (!first) out.println(",");
//           out.print("  { \"id\": \"" + rs.getString("c_invoice_id") + "\", \"documentno\": \"" + rs.getString("documentno") + "\" }");
//           first = false;
//         }
//         out.println("\n]}");
//         return;
//       }

//       // Ejecutar la función C_INVOICE_POST
//       CallableStatement cs = conn.prepareCall("{CALL c_invoice_post(?,?)}");
//       cs.setString(1, invoiceId);
//       cs.setString(2, vars.getUser()); // o '0' si no necesitas pasar user
//       cs.execute();

//       out.println("{ \"status\": \"success\", \"message\": \"Factura procesada\", \"invoice_id\": \"" + invoiceId + "\" }");

//     } catch (Exception e) {
//       out.println("{ \"status\": \"error\", \"message\": \"" + e.getMessage().replace("\"", "\\\"") + "\" }");
//     } finally {
//       if (conn != null) try { conn.close(); } catch (Exception ignore) {}
//     }
//   }

//   public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {
//     doPost(request, response); // para pruebas GET
//   }
// }
