import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const secondUrl = urlSettings.BasicInfoUrl;
const api = {
    getallcashflowchequedetailbyfilter: "cashflowchequedetail/getallcashflowchequedetailbyfilter",
    CashFlowChequeDetailPdf: "cashflowchequedetail/CashFlowChequeDetailPdf",
    CashFlowChequeDetailExcel: "cashflowchequedetail/CashFlowChequeDetailExcelReport"
};


const GetChequePaperServices = {
    getallcashflowchequedetailbyfilterMethod: function (command, then) {
        Post(url + api.getallcashflowchequedetailbyfilter, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.CashFlowChequeDetailPdf, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.CashFlowChequeDetailExcel, command, then);
    }

};
export default GetChequePaperServices;