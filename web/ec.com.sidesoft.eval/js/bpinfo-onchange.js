OB.OBEXAPP = OB.OBEXAPP || {};
OB.OBEXAPP.OnChangeFunctions = OB.OBEXAPP.OnChangeFunctions || {};

OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner = function(item, view, form, grid) {
  var bpartnerId = item.getValue();
  
  if (!bpartnerId) {
    form.setItemValue('EM_SCTACC_BPINFO', '');
    return;
  }

  var callback = function(response, data, request) {
    if (data && data.info) {
      form.setItemValue('EM_SCTACC_BPINFO', data.info);
    }
  };

  OB.RemoteCallManager.call('org.openbravo.client.application.examples.OnChangeInvoiceDataHandler', {
    c_bpartner_id: bpartnerId
  }, {}, callback);
};

// Registrar el callout para el campo C_BPartner_ID en la factura
// Reemplaza 'TU_TAB_ID' con el AD_Tab_ID real de la cabecera de factura (puedes obtenerlo de AD_Tab)
OB.OnChangeRegistry.register('8318F93432AA4182AEEA8BE9B3ED71DB', 'c_bpartner_id', OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner, 'OBEXAPP_BPartnerInfo');
