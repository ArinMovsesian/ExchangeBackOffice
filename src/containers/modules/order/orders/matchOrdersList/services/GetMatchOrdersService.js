import { Post,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllordersList: "dailyorder/GetAllDailyOrderByFilter",
    deleteSecurityTransactionApi: "order/deleteSecurityTransaction",
    getAllMatchOrderListApi:"order/getAllMatchTradeByOrderId",
    matchSecurityTransactionApi:"order/matchSecurityTransactionsWithOrder",
    getAllMatchableOrderListApi:"order/getAllMatchableTradeByOrderId",
    getAllDailyOrderByFilterExcelReport: "dailyorder/GetAllDailyOrderByFilterExcelReport",
    getAllOrderByFilterPdfReport: "dailyorder/GetAllDailyOrderByFilterPdfReport"
  
};


const GetMatchOrdersService = {
    getAllMatchOrderList: function (command, then) {
     
        Post(url + api.getAllMatchOrderListApi, command, then);
    },
    matchSecurityTransaction: function (command, then) {
     
        Post(url + api.matchSecurityTransactionApi, command, then);
    },
    getAllMatchableTradeList: function (command, then) {
     
        Post(url + api.getAllMatchableOrderListApi, command, then);
    },
    deleteSecurityTransaction:function(command,then){
        Post(url + api.deleteSecurityTransactionApi, command, then);

    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.getAllDailyOrderByFilterExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.getAllOrderByFilterPdfReport, command, then);
    },
};
export default GetMatchOrdersService;