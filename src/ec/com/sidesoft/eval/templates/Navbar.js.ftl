/* jslint */
(function() {
  var buttonProps = {
    action: function() {
      var view = this.view,
          form = view.viewForm,
          businessPartnerId = form.getItemValue('C_BPartner_ID');
      
      if (!businessPartnerId) {
        isc.say(OB.I18N.getLabel('OBEXAPP_NoPartnerSelected'));
        return;
      }

      OB.RemoteCallManager.call('ec.com.sidesoft.eval.NavBarComponent', {
        businessPartnerId: businessPartnerId
      }, function(response) {
        if (!response.orders || response.orders.length === 0) {
          isc.say(OB.I18N.getLabel('OBEXAPP_NoOrdersFound'));
          return;
        }
        
        var msg = "<b>" + OB.I18N.getLabel('OBEXAPP_PendingOrders') + "</b><br><br>";
        var total = 0;
        
        response.orders.forEach(function(order) {
          msg += OB.I18N.getLabel('OBEXAPP_Customer') + ": " + order.name + "<br>";
          msg += OB.I18N.getLabel('OBEXAPP_Status') + ": " + order.docstatus + "<br>";
          msg += OB.I18N.getLabel('OBEXAPP_Total') + ": " + order.grandtotal + "<br><br>";
          total += isNaN(parseFloat(order.grandtotal)) ? 0 : parseFloat(order.grandtotal);
        });
        
        msg += "<b>" + OB.I18N.getLabel('OBEXAPP_TotalPending') + ": " + total + "</b>";
        isc.say(msg, null, {width: 400});
      });
    },
    buttonType: 'OBEXAPP_PartnerOrders',
    prompt: OB.I18N.getLabel('OBEXAPP_ViewPartnerOrders'),
    updateState: function() {
      var view = this.view,
          form = view.viewForm;
      this.setDisabled(form.isNew || !form.getItemValue('C_BPartner_ID'));
    }
  };

  OB.ToolbarRegistry.registerButton(buttonProps.buttonType, isc.OBToolbarIconButton, buttonProps, 100, '143');
}());
