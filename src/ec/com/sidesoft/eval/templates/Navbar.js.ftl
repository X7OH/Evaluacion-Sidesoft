/* jslint */
isc.Button.create({
  baseStyle: 'navBarButton',
  title: OB.I18N.getLabel('OBEXAPP_HelloWorld'),
  overflow: "visible",
  width: 100,
  layoutAlign: "center",
  showRollOver: false,
  showFocused: false,
  showDown: false,
  click: function() {
    isc.say(OB.I18N.getLabel('OBEXAPP_SayHello', ['${data.name}']));
  }
})