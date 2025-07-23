/* jslint */
isc.Button.create({
  baseStyle: 'navBarButton',
  title: OB.I18N.getLabel('OBToolbarNavBarEv'),
  overflow: "visible",
  width: 100,
  layoutAlign: "center",
  showRollOver: false,
  showFocused: false,
  showDown: false,
  click: function() {
    var msg = "Datos Facturados: ${data.orders?size} <br>";
    <#if data.orders?has_content>
      <#list data.orders as order>
        msg += "Nombre del cliente: ${order.name} <br>";
        msg += "Total de la factura: ${order.grandtotal} <br>";
      </#list>
    </#if>
    isc.say(msg);
  }
})