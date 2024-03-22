import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.integratedUrl;
const api = {
    getflatmostactivecustomers: "customertradereport/getflatmostactivecustomers",
    GetFlatMostActiveCustomersExcelReport: "customertradereport/GetFlatMostActiveCustomersExcelReport",
    GetFlatMostActiveCustomersPdfReport: "customertradereport/GetFlatMostActiveCustomersPdfReport"
};

const getMostActiveCustomerService = {
    getflatmostactivecustomersMethod: function (command, then) {
        Post(url + api.getflatmostactivecustomers, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetFlatMostActiveCustomersExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetFlatMostActiveCustomersPdfReport, command, then);
    }

};
export default getMostActiveCustomerService;