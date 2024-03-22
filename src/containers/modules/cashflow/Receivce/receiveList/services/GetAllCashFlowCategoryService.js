import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    getallcashflowcategory: "cashflowcategory/getallcashflowcategory",
    getflatreceive: "cashflowmaster/getflatreceive",
    getreceivebyid: 'cashflowmaster/getreceivebyid',
    ReceiveListPdfReport: "cashflowmaster/ReceiveListPdf",
    ReceiveListExcelReport: "cashflowmaster/ReceiveListExcelReport",




};


const GetAllCashFlowCategoryService = {
    getAllCashFlowCategoryMethod: function (command, then) {
        Post(url + api.getallcashflowcategory, command, then);
    },
    getflatreceiveMethod: function (command, then) {
        Post(url + api.getflatreceive, command, then);
    },

    getreceivebyidMethod: function (command, then) {
        Post(url + api.getreceivebyid, command, then);
    },

    getExcelExport: function(command, then){
        DownloadExcel(url + api.ReceiveListExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.ReceiveListPdfReport, command, then);
    }




};
export default GetAllCashFlowCategoryService;