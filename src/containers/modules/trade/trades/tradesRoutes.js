import GetTrades from "./tradesList/components/GetTradesComponent";
import GetTradeNumber from "./tradeNumber/components/GetTradeNumberComponent";
import GetTradeListUploadComponent from "./tradeListUpload/components/GetTradeListUploadComponent";
import GetCommodityTradesListComponent from "./commodityTrades/components/GetCommodityTradesListComponent";
import SettlementCommodityTradeUploadComponent from "./SettlementCommodityTradeUpload/components/settlementCommodityTradeUploadComponent";
import PrepaymentCommodityTradeUploadComponent from "./PrepaymentCommodityTradeUpload/components/prepaymentCommodityTradeUploadComponent";
import getMostActiveCustomerComponent from "./mostActiveCustomer/components/getMostActiveCustomerComponent";
import GetOnlineTradeReportComponent from "./getOnlineTradeReport/components/GetOnlineTradeReportComponent";
import GetBranchOperationalTotalReportComponent from "./branchOperationalTotalReport.js/components/GetBranchOperationalTotalReportComponent";

const route = {
    GetTrades: {
        component: GetTrades,
        title: "فهرست معاملات",
        path: "/main/trade/trades/getTrades",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-chart-bar',
     
    },
    GetTradeNumber: {
        component: GetTradeNumber,
        title: "اعلامیه خرید و فروش",
        path: "/main/trade/trades/getDeclarationSellBuy",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    },


    GetTradeListCommodity: {
        component: GetCommodityTradesListComponent,
        title: "فهرست معاملات کالا",
        path: "/main/trade/trades/getTradeCommodityList",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    },
    GetTradeListUpload: {
        component: GetTradeListUploadComponent,
        title: "بارگذاری معاملات کالا",
        path: "/main/trade/trades/tradeListUpload",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    },

    GetWareHouseUpload: {
        component: GetTradeListUploadComponent,
        title: "بارگذاری فایل هزینه انبار",
        path: "/main/trade/trades/wareHouseUpload",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    },

    SettlementCommodityTradeUpload: {
        component: SettlementCommodityTradeUploadComponent,
        title: "بارگذاری فایل تسویه کالا",
        path: "/main/trade/trades/settlementCommodityTradeUpload",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    },


    PrepaymentCommodityTradeUpload: {
        component: PrepaymentCommodityTradeUploadComponent,
        title: "بارگذاری فایل پیش پرداخت کالا",
        path: "/main/trade/trades/prepaymentCommodityTradeUpload",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    },




    MostActiveCustomer: {
        component: getMostActiveCustomerComponent,
        title: "گزارش فعالترین مشتریان",
        path: "/main/trade/trades/getMostActiveCustomer",
        back: null,
        add: null,
        edit: null,
        // icon: 'fas fa-shopping-cart',
    },



    GetOnlineTradeReport:{
        component: GetOnlineTradeReportComponent,
        title: "گزارش معاملات اینترنتی",
        path: "/main/trade/trades/getOnlineTradeReport",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    },




    GetBranchOperationalTotalReport:{
        component: GetBranchOperationalTotalReportComponent,
        title: "گزارش عملکرد شعب",
        path: "/main/trade/trades/getBranchOperationalReport",
        back: null,
        add: null,
        edit: null,
        icon: 'fas fa-shopping-cart',
    }
}


export default route;

