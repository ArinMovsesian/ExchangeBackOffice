import { Post, DownloadPdf, DownloadExcel  } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.TradeUrl;
const api = {
    getAlltradesList: "trade/gettrades",
    GetTradeExcelReport: "trade/GetTradeExcelReport",
    GetTradePdfReport: "trade/GetTradePdfReport"
};


const GetTradesService = {
    getAllTradesList: function (command, then) {
        // Post(url + api.getAlltradesList, command, then);
        Post(url + api.getAlltradesList, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetTradeExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetTradePdfReport, command, then);
    }
};
export default GetTradesService;