import { Post,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
import { Get } from '../../../../../../core/axiosHelper';

const url = urlSettings.TradeUrl;
const api = {
    getAllTradeNumber: "trade/getalltradenumberbyfilter",
    getTradeNumberById: "trade/getsecuritytransactionbyid",
    GetAllTradeNumberExcelReport: "trade/GetAllTradeNumberExcelReport",
    GetAllTradeNumberPdfReport: "trade/GetAllTradeNumberPdfReport"
  
};


const GetTradeNumberService = {
    getAllTradeNumber: function (command, then) {
        Post(url + api.getAllTradeNumber, command, then);
    },
    gtTradeNumberById:function(command,then){
        Get(url+api.getTradeNumberById,command,then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetAllTradeNumberExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetAllTradeNumberPdfReport, command, then);
    }
    
};
export default GetTradeNumberService;