// // isc.defineClass("OrderStatus", isc.Label);
// // isc.OrderStatus.addProperties({
// //   // record: sctaccEvOrderEst,
// //   height: 1,
// //   width: '100%',
// //   initWidget: function () {
// //     if (this.record) {
// //       this.createField(this.record.sctaccEvOrderEst); // Cambia 'estadoOR' por el nombre real del campo
// //     }
// //     this.Super("initWidget", arguments);
// //   },
// //   createField: function (code) {
// //     var backGroundColor = "#e9f0ef",
// //       align = "center";
// //     // Asigna colores según el valor de sctaccEvOrderEst
// //     if (code === "CO") { // Completado
// //       backGroundColor = "#00FF00";
// //     } else if (code === "DR") { // Borrador
// //       backGroundColor = "#ffdf00";
// //     } else if (code === "VO") { // Anulado
// //       backGroundColor = "#ff0000";
// //     }
// //     this.setBackgroundColor(backGroundColor);
// //     this.setAlign(align);
// //   },
// // });

// // isc.OrderStatus.addMethods({
// //   setRecord: function(record) {
// //     this.record = record;
// //     if (record && record.sctaccEvOrderEst) {
// //       this.updateStatus(record.sctaccEvOrderEst);
// //     }
// //     this.Super("setRecord", arguments);
// //   }
// // });
// isc.defineClass("OrderStatus", isc.Label);
// isc.OrderStatus.addProperties({
//   height: 24,
//   width: 24,
//   borderRadius: "50%", // Para forma circular
//   initWidget: function() {
//     this.Super("initWidget", arguments);
//     if (this.record) {
//       this.updateStatus(this.record.sctacc_EvOrderEst); // Nota el guión bajo
//     }
//   },
//   updateStatus: function(code) {
//     console.log("Actualizando estado con código:", code); // Para depuración
    
//     var colorMap = {
//       "CO": "#00C851", // Verde
//       "DR": "#FFBB33", // Amarillo
//       "VO": "#FF4444", // Rojo
//       null: "#e9f0ef", // Valor por defecto para null
//       undefined: "#e9f0ef" // Valor por defecto para undefined
//     };
    
//     this.setBackgroundColor(colorMap[code] || "#e9f0ef");
//     this.setContents(code || "?"); // Muestra el código o "?" si es nulo
//     this.setAlign("center");
//     this.setValign("center");
    
//     // Opcional: tooltip descriptivo
//     var statusText = {
//       "CO": "Orden Completada",
//       "DR": "Orden en Borrador",
//       "VO": "Orden Anulada"
//     };
//     this.setTitle(statusText[code] || "Estado desconocido");
//   },
//   setRecord: function(record) {
//     this.Super("setRecord", arguments);
//     if (record && record.sctacc_EvOrderEst) { // Nota el guión bajo
//       this.updateStatus(record.sctacc_EvOrderEst);
//     }
//   }
// });


// isc.defineClass("OrderStatus", isc.Label);
// isc.OrderStatus.addProperties({
//   height: 24, // Altura suficiente para ser visible
//   width: 24,
//   borderRadius: "12px", // Para forma circular
//   align: "center",
//   initWidget: function() {
//     console.log("OrderStatus - Inicializando, record:", this.record); // Debug
//     this.Super("initWidget", arguments);
//     if (this.record) {
//       this.updateStatus(this.record.sctacc_EvOrderEst);
//     }
//   },
//   updateStatus: function(code) {
//     console.log("OrderStatus - Código recibido:", code); // Debug
    
//     var colorMap = {
//       "CO": "#00C851", // Verde
//       "DR": "#FFBB33", // Amarillo 
//       "VO": "#FF4444", // Rojo
//       null: "#CCCCCC", // Gris para null
//       undefined: "#CCCCCC" // Gris para undefined
//     };
    
//     var textMap = {
//       "CO": "✓",
//       "DR": "…",
//       "VO": "✗",
//       null: "?",
//       undefined: "?"
//     };
    
//     this.setBackgroundColor(colorMap[code] || "#CCCCCC");
//     this.setContents(textMap[code] || "?");
    
//     // Tooltip descriptivo
//     var tooltipMap = {
//       "CO": "Orden Completada",
//       "DR": "Orden en Borrador",
//       "VO": "Orden Anulada"
//     };
//     this.setTitle(tooltipMap[code] || "Estado desconocido: " + code);
//   },
//   setRecord: function(record) {
//     this.Super("setRecord", arguments);
//     console.log("OrderStatus - Record actualizado:", record); // Debug
//     if (record) {
//       this.updateStatus(record.sctacc_EvOrderEst);
//     }
//   }
// });

isc.defineClass("OrderStatus", isc.Label);
isc.OrderStatus.addProperties({
  height: 24, // Visible (puedes cambiarlo a 1 si quieres solo una línea)
  width: 24,
  borderRadius: "12px", // Mantiene forma circular
  align: "center", // Centrado (aunque no hay texto)
  showTitle: false, // No tooltip

  initWidget: function() {
    if (this.record) {
      this.updateStatus(this.record.docStatus);
    }
    this.Super("initWidget", arguments);
  },

  updateStatus: function(code) {
    var colorMap = {
      "CO": "#00C851", // Verde
      "DR": "#FFBB33", // Amarillo
      "VO": "#FF4444", // Rojo
      null: "#CCCCCC", // Gris
      undefined: "#CCCCCC"
    };

    // Solo se aplica color, sin contenido ni tooltip
    this.setBackgroundColor(colorMap[code] || "#CCCCCC");
    this.setContents(""); // Limpia cualquier texto
    this.setTitle(""); // Elimina tooltip si existiera
  },

  setRecord: function(record) {
    this.Super("setRecord", arguments);
    if (record) {
      this.updateStatus(record.sctacc_EvOrderEst);
    }
  }
});
