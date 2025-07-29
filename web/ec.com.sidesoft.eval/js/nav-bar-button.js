/*
 *************************************************************************
 * The contents of this file are subject to the Openbravo  Public  License
 * Version  1.1  (the  "License"),  being   the  Mozilla   Public  License
 * Version 1.1  with a permitted attribution clause; you may not  use this
 * file except in compliance with the License. You  may  obtain  a copy of
 * the License at http://www.openbravo.com/legal/license.html
 * Software distributed under the License  is  distributed  on  an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the
 * License for the specific  language  governing  rights  and  limitations
 * under the License.
 * The Original Code is Openbravo ERP.
 * The Initial Developer of the Original Code is Openbravo SLU
 * All portions are Copyright (C) 2010-2012 Openbravo SLU
 * All Rights Reserved.
 * Contributor(s):  ______________________________________.
 ************************************************************************
 */



(function () {
  console.log("▶ Cargando botón de estado de facturas...");

  var buttonProps = {
    action: function () {
      console.log("▶ Botón clicado, solicitando datos...");

      var view = this.view,
        grid = view.viewGrid,
        selectedRecords = grid.getSelectedRecords();


      var bpId = selectedRecords[0][OB.Constants.ID];

      var postData = {
        businessPartnerId: bpId
      };

      OB.RemoteCallManager.call(
        'ec.com.sidesoft.eval.InvoiceStatusHandler',
        postData,
        {},
        function (response, data, request) {
          console.log("▶ Respuesta del handler:", data);

          if (data && data.invoices && data.invoices.length > 0) {
            var html = '<b>Facturas del Tercero</b><br><table border="1" cellspacing="0" cellpadding="3"><tr><th>Nombre</th><th>Estado</th><th>Total</th></tr>';
            data.invoices.forEach(function (inv) {
              html += '<tr><td>' + inv.name + '</td><td>' + inv.docstatus + '</td><td>$' + inv.grandtotal.toFixed(2) + '</td></tr>';
            });
            html += '</table><br><b>Total acumulado: $' + data.total.toFixed(2) + '</b>';

            isc.say(html); // Mostrar popup simple
          } else {
            isc.say("Este tercero no tiene facturas de venta.");
          }
        }
      );
    },

    buttonType: 'ssbp_invoice_status',
    prompt: 'Facturas del Tercero',
    updateState: function () {
      this.setDisabled(false); // Siempre habilitado, pero puedes agregar lógica si es necesario
      var view = this.view,
        grid = view.viewGrid,
        selectedRecords = grid.getSelectedRecords();
      this.setDisabled(selectedRecords.length !== 1);
    }
  };

  // Cambiar 'XXX' por el AD_Window_ID real
  OB.ToolbarRegistry.registerButton( buttonProps.buttonType, isc.OBToolbarIconButton, buttonProps, 100, '123' // <= AD_Window_ID de "Tercero" (NO el Tab ID)
  );

  console.log("▶ Botón de facturas registrado para ventana ID '123'");
})();


// (function() {
//   // Configuración
//   var config = {
//     buttonPosition: 14, // Posición en la toolbar
//     buttonTitle: "Ver Facturas",
//     buttonWidth: 100,
//     handlerPath: "ec.com.sidesoft.eval/InvoiceStatusHandler"
//   };
  
//   // Función principal
//   function initInvoiceButton() {
//     // 1. Buscar el formulario de terceros
//     var bpForm = findBusinessPartnerForm();
//     if (!bpForm) {
//       console.log("Formulario de terceros no encontrado, reintentando...");
//       // setTimeout(initInvoiceButton, 100);
//       return;
//     }
    
//     // 2. Obtener la toolbar
//     var toolbar = bpForm.toolStrip || bpForm.toolbar || isc.OBToolbar_11;
//     if (!toolbar) {
//       console.error("No se pudo encontrar la toolbar");
//       return;
//     }
    
//     // 3. Añadir el botón (si no existe)
//     if (!toolbar._invoiceButtonAdded) {
//       toolbar._invoiceButtonAdded = true;
      
//       var btn = isc.IButton.create({
//         title: config.buttonTitle,
//         width: config.buttonWidth,
//         click: function() {
//           var bpId = bpForm.businessPartnerId || 
//                     (bpForm.getEditedRecord && bpForm.getEditedRecord().businessPartnerId);
//           if (bpId) {
//             showInvoices(bpId);
//           } else {
//             isc.say("No se ha seleccionado un tercero");
//           }
//         }
//       });
      
//       toolbar.addMember(btn, config.buttonPosition);
//       console.log("Botón de facturas añadido correctamente");
//     }
//   }
  
//   // Buscar el formulario de terceros
//   function findBusinessPartnerForm() {
//     return isc.BusinessPartnerForm || 
//            window[Object.keys(window).find(key => key.startsWith("isc_BusinessPartnerForm"))];
//   }
  
//   // Mostrar facturas en popup
//   function showInvoices(bpId) {
//     isc.RPCManager.sendRequest({
//       actionURL: OB.Application.contextUrl + config.handlerPath,
//       params: {businessPartnerId: bpId, _action: "execute"},
//       callback: function(resp) {
//         try {
//           var data = isc.JSON.decode(resp.httpResponseText);
          
//           // Crear ventana
//           var win = isc.Window.create({
//             title: "Facturas del Tercero",
//             width: 700,
//             height: 500,
//             items: [
//               isc.ListGrid.create({
//                 data: data.invoices,
//                 fields: [
//                   {name: "documentNo", title: "Número"},
//                   {name: "dateInvoiced", title: "Fecha"},
//                   {name: "docstatus", title: "Estado"},
//                   {name: "grandtotal", title: "Total", formatCellValue: formatCurrency}
//                 ]
//               })
//             ]
//           });
          
//           win.show();
//         } catch(e) {
//           console.error("Error al mostrar facturas:", e);
//           isc.say("Error al cargar facturas");
//         }
//       }
//     });
//   }
  
//   function formatCurrency(value) {
//     return isc.NumberFormat.formatCurrency(value);
//   }
  
//   // Iniciar cuando la página esté lista
//   isc.Page.setEvent("load", initInvoiceButton);
// })();