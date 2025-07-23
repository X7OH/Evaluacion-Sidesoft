isc.defineClass("CreditOperationStatus1", isc.Label);
isc.CreditOperationStatus1.addProperties({
  height: 1,
  width: '100%',
  initWidget: function () {
    if (this.record) {
      this.createField(this.record.sSCORCreditOperatStatus);
    }
    this.Super("initWidget", arguments);
  },
  createField: function (code) {
    var backGroundColor = "#e9f0ef",
      text,
      align = "center";
    if (code === "A" || code === "C") {
      backGroundColor = "#00FF00";
      text = "";
    } else if (code === "IP") {
      backGroundColor = "#ffdf00";
      text = "";
    } else if (code === "R") {
      backGroundColor = "#ff0000";
      text = "";
    }
    this.setBackgroundColor(backGroundColor);
    this.setAlign(align);
  },
});

// isc.defineClass("CreditOperationStatus1", isc.Label);
// isc.CreditOperationStatus2.addProperties({
//   height: 1,
//   width: '100%',
//   initWidget: function () {
//     if (this.record) {
//       this.createField(this.record.sscorCreditOperatStatus);
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
