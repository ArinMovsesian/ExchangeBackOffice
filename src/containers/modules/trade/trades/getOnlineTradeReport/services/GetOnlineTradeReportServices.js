import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    getonlinetradereport: "reporting/getonlinetradereport",
    GetOnlineTradeReportPdf: "reporting/GetOnlineTradeReportPdf",
    GetOnlineTradeReportExcel: "reporting/GetOnlineTradeReportExcel"
};

const GetOnlineTradeReportServices = {
    getonlinetradereportMethod: function (command, then) {
        Post(url + api.getonlinetradereport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetOnlineTradeReportPdf, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetOnlineTradeReportExcel, command, then);
    }
};
export default GetOnlineTradeReportServices;