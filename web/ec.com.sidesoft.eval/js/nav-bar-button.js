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
// {
//   className: 'OBApplicationMenuButton',
//   properties: {
//     title: 'UINAVBA_APPLICATION_MENU',
//     initWidget: function () {
//       this.Super('initWidget', arguments);
//       this.baseData = isc.clone(OB.Application.menu);
//     }
//   }
// }
// isc.ClassFactory.defineClass('OBEXAPP_NavBarEvView', isc.Layout);
//  isc.Page.setEvent('load', function () {
//     if (!window.OB || !OB.Application || !OB.Layout) {
//       if (attemptCount < MAX_ATTEMPTS) {
//         isc.Timer.setTimeout(applyAllCustomizations, 200);
//       } else {
//         console.warn("OB no se cargó después de varios intentos");
//       }
//       return;
//     }
    
//     isc.Button.create({
//         baseStyle: 'navBarButton',
//         title: OB.I18N.getLabel('OBToolbarNavBarEv'),
//         overflow: "visible",
//         width: 100,
//         layoutAlign: "center",
//         showRollOver: false,
//         showFocused: false,
//         showDown: false,
//         click: function() {
//             isc.show(isc.OBEXAPP_NavBarEvView.create({
//                 windowTitle: OB.I18N.getLabel('OBToolbarNavBarEv'),
//                 windowContent: 'Datos Facturados: ${data.ordersCount} <br> ' +
//                                 'Nombre del cliente: ${data.name}' +
//                                 '<br> ' +
//                                 'Total de la factura: ${data.totalAmount}'
//             }));
//         }

//     });
// });


(function () {
  var buttonProps = {
    action: function () {
      var view = this.view,
          form = view.viewForm,
          businessPartnerId = form.getItemValue('C_BPartner_ID');

      if (!businessPartnerId) {
        isc.say(OB.I18N.getLabel('OBEXAPP_NoPartnerSelected'));
        return;
      }

      OB.RemoteCallManager.call('ec.com.sidesoft.eval.NavBarComponent', {
        businessPartnerId: businessPartnerId
      }, function (response) {
        if (!response.orders || response.orders.length === 0) {
          isc.say(OB.I18N.getLabel('OBEXAPP_NoOrdersFound'));
          return;
        }

        var msg = "<b>" + OB.I18N.getLabel('OBEXAPP_PendingInvoices') + "</b><br><br>";
        var total = 0;

        response.orders.forEach(function (invoice) {
          msg += OB.I18N.getLabel('OBEXAPP_Customer') + ": " + invoice.name + "<br>";
          msg += OB.I18N.getLabel('OBEXAPP_Status') + ": " + invoice.docstatus + "<br>";
          msg += OB.I18N.getLabel('OBEXAPP_Total') + ": " + invoice.grandtotal + "<br><br>";
          total += isNaN(parseFloat(invoice.grandtotal)) ? 0 : parseFloat(invoice.grandtotal);
        });

        msg += "<b>" + OB.I18N.getLabel('OBEXAPP_TotalPending') + ": " + total.toFixed(2) + "</b>";
        isc.say(msg, null, {width: 400});
      });
    },
    buttonType: 'OBEXAPP_PartnerInvoices',
    prompt: OB.I18N.getLabel('OBEXAPP_ViewPartnerInvoices'),
    updateState: function () {
      var form = this.view.viewForm;
      this.setDisabled(!form || form.isNew || !form.getItemValue('C_BPartner_ID'));
    }
  };

  OB.ToolbarRegistry.registerButton(
    buttonProps.buttonType,
    isc.OBToolbarIconButton,
    buttonProps,
    100,
    '123' // ID de la pestaña Business Partner
  );
})();


// isc.defineClass("OBEXAPP_NavBarEvWindow", "Window").addProperties({
//   keepInParentRect: true,
//   canDragReposition: true,
//   canDragResize: true,
//   width: 200,
//   height: 200,
//   initWidget: function () {
//     this.items = [
//     isc.Label.create({
//       height: 100,
//       padding: 10,
//       width: 100,
//       align: "center",
//       valign: "center",
//       contents: this.windowContent
//     })];
//     this.Super("initWidget", arguments);
//   }
// });

// isc.defineClass("OBEXAPP_NavBarEvView", isc.Layout).addProperties({
//   windowTitle: 'title should be taken from the parameters',
//   width: '100%',
//   height: '100%',
//   align: 'center',
//   defaultLayoutAlign: 'center',
//   initWidget: function () {
//     this.children = [isc.OBEXAPP_NavBarEvWindow.create({
//       title: this.windowTitle,
//       windowContent: this.windowContent
//     })];
//     this.Super("initWidget", arguments);
//   }