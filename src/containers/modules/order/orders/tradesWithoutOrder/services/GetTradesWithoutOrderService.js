import { Post, DownloadPdf, DownloadExcel  } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAlltradesListApi: "order/GetAllTradesWithoutOrderByFilter",
    getAllTradesWithoutOrderByFilterExcelReportApi: "order/GetAllTradesWithoutOrderByFilterExcelReport",
    getAllTradesWithoutOrderByFilterPdfReportApi: "order/GetAllTradesWithoutOrderByFilterPdfReport",

    sendToOrderApi: "dailyorder/SendToOrder",
    getTradeExcelReportApi: "order/GetTradesWithoutorderExcelReport",
};


const GetTradesWithoutOrderService = {
    getAllTradesList: function (command, then) {
        Post(url + api.getAlltradesListApi, command, then);
    },
    sendToOrder: function (command, then) {
        Post(url + api.sendToOrderApi, command, then);
    },

    getExcelExport: function(command, then){
        DownloadExcel(url + api.getAllTradesWithoutOrderByFilterExcelReportApi, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.getAllTradesWithoutOrderByFilterPdfReportApi, command, then);
    }
};
export default GetTradesWithoutOrderService;