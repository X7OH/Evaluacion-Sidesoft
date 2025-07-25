// /* jslint */
// isc.Button.create({
//    var buttonProps = {
//     baseStyle: 'navBarButton',
//     title: OB.I18N.getLabel('OBToolbarNavBarEv'),
//     overflow: "visible",
//     width: 100,
//     layoutAlign: "center",
//     showRollOver: false,
//     showFocused: false,
//     showDown: false,
//     click: function() {
//       var businessPartnerId = OB.ViewManager.currentView.getContextInfo().C_BPartner_ID;
//       // Llamar al backend para obtener las órdenes del tercero
//       OB.RemoteCallManager.call('ec.com.sidesoft.eval.NavBarComponent', {
//         businessPartnerId: businessPartnerId
//       }, function(response) {
//         var msg = "Datos Facturados: " + response.orders.length + "<br>";
//         response.orders.forEach(function(order) {
//           msg += "Nombre del cliente: " + order.name + "<br>";
//           msg += "Total de la factura: " + order.grandtotal + "<br>";
//         });
//         isc.say(msg);
//       });
//     }
//   }
//   OB.ToolbarRegistry.registerButton(buttonProps.buttonType, isc.OBToolbarIconButton, buttonProps, 100, '186'),

// })