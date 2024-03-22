import { Post, Get ,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    PaymentListPdf: "cashflowmaster/PaymentListPdf",
    PaymentListExcelReport: "cashflowmaster/PaymentListExcelReport",
};


const DownloadExportsService = {
    
    getExcelExport: function(command, then){
        DownloadExcel(url + api.PaymentListExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.PaymentListPdf, command, then);
    }


};
export default DownloadExportsService;