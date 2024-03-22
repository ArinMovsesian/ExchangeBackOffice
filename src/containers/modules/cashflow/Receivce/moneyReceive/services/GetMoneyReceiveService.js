import { Post, Get ,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    getflatrequestmoney: "cashflowmaster/getflatrequestmoney",
    saverequestmoney: "cashflowmaster/saverequestmoney",
    MoneyRequestPdf: "cashflowmaster/MoneyRequestPdf",
    MoneyRequestExcelReport: "cashflowmaster/MoneyRequestExcelReport"


};


const GetMoneyReceiveService = {
    getflatrequestmoneyMethod: function (command, then) {
        Post(url + api.getflatrequestmoney, command, then);
    },
    saverequestmoneyMethod: function (command, then) {
        Post(url + api.saverequestmoney, command, then);
    },

    getExcelExport: function(command, then){
        DownloadExcel(url + api.MoneyRequestExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.MoneyRequestPdf, command, then);
    }


};
export default GetMoneyReceiveService;