sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/json/JSONModel"
],
    function (Controller, Filter, FilterOperator, FiltterType, JSONModel) {
        "use strict";

        return Controller.extend("com.sap.zorder1.controller.View1", {
            onInit: function () {

            },

            onOrdersListItemPress: function (OEvent) {
                var that = this;

                var orderId = OEvent.getParameter("listItem").getBindingContext().getProperty("OrderID");

                var OFilter = new Filter("OrderID", FilterOperator.EQ, orderId);

                this.getView().byId("OrderTable").getBinding("items").filter(OFilter, FiltterType.Application);


                this.getSplitConObj().to(that.createId("OrderDetail"));

            },

            onColumnListItemPress: function (oEvent) {

                var that = this;
                var productId = oEvent.getSource().getBindingContext().getProperty("ProductID");

                var oModel = this.getOwnerComponent().getModel();

                oModel.read("/Products(" + productId + ")", {

                    success: function (oData) {

                        var JsonData = new JSONModel(oData);

                        that.getView().byId("SimpleFormId").setModel(JsonData);

                        that.getSplitConObj().to(that.createId("ProductDetails"))

                    },
                    error: function (oError) {
                        console.error(oError);
                    }



                })
            },

            getSplitConObj : function(){
                var result = this.byId("SplitContainerID");
                return result;
            },
            onProductBackPress:function(oEvent){

                this.getSplitConObj().backDetail();
            }


        });
    });
