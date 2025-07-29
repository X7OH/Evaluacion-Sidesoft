
OB.OBEXAPP = OB.OBEXAPP || {};
OB.OBEXAPP.OnChangeFunctions = OB.OBEXAPP.OnChangeFunctions || {};

OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner = function (item, view, form, grid) {
  var bpartnerId = item.getValue();
  if (!bpartnerId) return;

  var callback = function (response, data, request) {
    if (data && data.name) {
      // ✅ Llenamos el campo EM_Sctacc_Bpinfo con el nombre del tercero
      form.setItemValue('BPInfo', data.name);

      // Solo para pruebas, muestra mensaje
      view.messageBar.setMessage(
        isc.OBMessageBar.TYPE_INFO,
        'Tercero cargado',
        'Nombre cargado en BPInfo: ' + data.name
      );
    }
  };

  OB.RemoteCallManager.call(
    'ec.com.sidesoft.eval.OnChangeInvoiceDataHandler',
    { c_bpartner_id: bpartnerId },
    {},
    callback
  );
};

// Registramos el onchange en la ventana de Facturas (C_Invoice)
OB.OnChangeRegistry.register(
  '123', // ← cambia esto si el ID de tu ventana no es '123'
  'c_bpartner_id',
  OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner,
  'SSFE_InvoiceBPartner'
);







// OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner = function (item, view, form, grid) {
//   var bpartnerId = item.getValue();
  
//   if (!bpartnerId) {
//     return;
//   }


//   // if (!bpartnerId) return;

//   var callback = function (response, data, request) {
//     if (data && data.info) {
//       form.setItemValue('EM_Sctacc_Bpinfo', data.info);
//       view.messageBar.setMessage(isc.OBMessageBar.TYPE_INFO, 'Información del tercero', data.info);
//       }else {
//       view.messageBar.setMessage(isc.OBMessageBar.TYPE_WARNING, 'Sin datos', 'No se recibió información del tercero');
//       }
//   };

//   OB.RemoteCallManager.call('ec.com.sidesoft.eval.handler.OnChangeInvoiceDataHandler', {
//     c_bpartner_id: bpartnerId
//   }, {}, callback);
// };

// // OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner.sort = 10;

// OB.OnChangeRegistry.register(
//   '167', // Asegúrate de que sea el ID correcto de la ventana C_Invoice
//   'c_bpartner_id',
//   OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner,
//   'SSFE_InvoiceBPartner'
// );
