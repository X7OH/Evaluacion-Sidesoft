// // isc.defineClass("CreditOperationStatus1", isc.Label);
// // isc.CreditOperationStatus1.addProperties({
// //   height: 1,
// //   width: '100%',
// //   initWidget: function () {
// //     if (this.record) {
// //       this.createField(this.record.sSCORCreditOperatStatus);
// //     }
// //     this.Super("initWidget", arguments);
// //   },
// //   createField: function (code) {
// //     var backGroundColor = "#e9f0ef",
// //       text,
// //       align = "center";
// //     if (code === "A" || code === "C") {
// //       backGroundColor = "#00FF00";
// //       text = "";
// //     } else if (code === "IP") {
// //       backGroundColor = "#ffdf00";
// //       text = "";
// //     } else if (code === "R") {
// //       backGroundColor = "#ff0000";
// //       text = "";
// //     }
// //     this.setBackgroundColor(backGroundColor);
// //     this.setAlign(align);
// //   },
// // });

// OB.OBEXAPP = {};
// OB.OBEXAPP.OnChangeFunctions = {};
// // OB.OBEXAPP.OnChangeFunctions.Note_Name = function (item, view, form, grid) {
// OB.OBEXAPP.OnChangeFunctions = OB.OBEXAPP.OnChangeFunctions || {};
// OB.OBEXAPP.OnChangeFunctions.Note_Name = function (item, view, form, grid) {

//   var bpartnerId = item.getValue();
  
//   if (!bpartnerId) {
//     form.setItemValue('EM_SCTACC_BPINFO', '');
//     return;
//   }

//   var callback = function(response, data, request) {
//     if (data && data.info) {
//       form.setItemValue('EM_SCTACC_BPINFO', data.info);
//     }
//   };

//   OB.RemoteCallManager.call('org.openbravo.client.application.examples.OnChangeInvoiceDataHandler', {
//     c_bpartner_id: bpartnerId
//   }, {}, callback);

// //   // set a message
// //   view.messageBar.setMessage(isc.OBMessageBar.TYPE_INFO, 'Changed!', 'You changed the name to ' + item.getValue());

// //   // set the value for the description and make sure that the
// //   // onchange handlers are called
// //   form.setItemValue('description', 'Description ' + item.getValue());
// // };

// // OB.OBEXAPP.OnChangeFunctions.Note_Description = function (item, view, form, grid) {
// //   form.setItemValue('value', item.getValue());
// };
// OB.OnChangeRegistry.register('8318F93432AA4182AEEA8BE9B3ED71DB', 'c_bpartner_id', OB.OBEXAPP.OnChangeFunctions.Invoice_BPartner, 'OBEXAPP_BPartnerInfo');


// // set a sorting
// OB.OBEXAPP.OnChangeFunctions.Note_Description.sort = 20;

// // register the onchange for the description
// OB.OnChangeRegistry.register('FF8081813290114F0132901EB0A2001A', 'description', OB.OBEXAPP.OnChangeFunctions.Note_Description, 'OBEXAPP_Description1');

// OB.OBEXAPP.OnChangeFunctions.Note_Description2 = function (item, view, form, grid) {
//   form.setValue('value', 'Second onchange called after the first one');
// };

// // set a sort after the other one
// OB.OBEXAPP.OnChangeFunctions.Note_Description2.sort = 30;

// //OB.OnChangeRegistry.register('FF8081813290114F0132901EB0A2001A', 'description',
// //    OB.OBEXAPP.OnChangeFunctions.Note_Description2, 'OBEXAPP_Description2');

// OB.OBEXAPP.OnChangeFunctions.Note_Value = function (item, view, form, grid) {
//   // the callback called after the server side call returns
//   var callback = function (response, data, request) {
//       form.setItemValue(item, data.upperCased);
//       view.messageBar.setMessage(isc.OBMessageBar.TYPE_WARNING, 'Uppercased!', 'The value has been uppercased');
//       };

//   // do a server side call and on return call the callback
//   OB.RemoteCallManager.call('org.openbravo.client.application.examples.OnchangeExampleActionHandler', {
//     value: item.getValue()
//   }, {}, callback);
// };
// OB.OBEXAPP.OnChangeFunctions.Note_Value.sort = 20;

// OB.OnChangeRegistry.register('FF8081813290114F0132901EB0A2001A', 'value', OB.OBEXAPP.OnChangeFunctions.Note_Value, 'OBEXAPP_Value');



// // isc.defineClass("CreditOperationStatus1", isc.Label);
// // isc.CreditOperationStatus2.addProperties({
// //   height: 1,
// //   width: '100%',
// //   initWidget: function () {
// //     if (this.record) {
// //       this.createField(this.record.sscorCreditOperatStatus);
// //     }
// //     this.Super("initWidget", arguments);
// //   },
// //   createField: function (code) {
// //     var backGroundColor = "#e9f0ef",
// //       text,
// //       align = "center";
// //     if (code === "A" || code === "C") {
// //       backGroundColor = "#00FF00";
// //       text = "";
// //     } else if (code === "IP") {
// //       backGroundColor = "#ffdf00";
// //       text = "";
// //     } else if (code === "R") {
// //       backGroundColor = "#ff0000";
// //       text = "";
// //     }
// //     this.setBackgroundColor(backGroundColor);
// //     this.setAlign(align);
// //   },
// // });
