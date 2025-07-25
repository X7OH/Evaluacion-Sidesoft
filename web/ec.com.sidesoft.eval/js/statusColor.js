// isc.defineClass("OrderStatus", isc.Label);
// isc.CreditOperationStatus1.addProperties({
//   height: 1,
//   width: '100%',
//   initWidget: function () {
//     if (this.record) {
//       this.createField(this.record.estadoOR);
//     }
//     this.Super("initWidget", arguments);
//   },
//   createField: function (code) {
//     var backGroundColor = "#e9f0ef",
//       text,
//       align = "center";
//     if (code === "A" || code === "C") {
//       backGroundColor = "#00FF00";
//       text = "";
//     } else if (code === "IP") {
//       backGroundColor = "#ffdf00";
//       text = "";
//     } else if (code === "R") {
//       backGroundColor = "#ff0000";
//       text = "";
//     }
//     this.setBackgroundColor(backGroundColor);
//     this.setAlign(align);
//   },
// });

isc.defineClass("OrderStatus", isc.Label);
isc.OrderStatus.addProperties({
  // record: sctaccEvOrderEst,
  height: 1,
  width: '100%',
  initWidget: function () {
    if (this.record) {
      this.createField(this.record.sctaccEvOrderEst); // Cambia 'estadoOR' por el nombre real del campo
    }
    this.Super("initWidget", arguments);
  },
  createField: function (sctaccEvOrderEst) {
    var backGroundColor = "#e9f0ef",
      align = "center";
    // Asigna colores según el valor de sctaccEvOrderEst
    if (sctaccEvOrderEst === "CO") { // Completado
      backGroundColor = "#00FF00";
    } else if (sctaccEvOrderEst === "DR") { // Borrador
      backGroundColor = "#ffdf00";
    } else if (sctaccEvOrderEst === "VO") { // Anulado
      backGroundColor = "#ff0000";
    }
    this.setBackgroundColor(backGroundColor);
    this.setAlign(align);
  },
});
