import { Post, Get,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.integratedUrl;
const api = {
    getcustomersinternetactivity: "customertradereport/getcustomersinternetactivity",
    GetCustomersInternetActivityPdfReport: "customertradereport/GetCustomersInternetActivityPdfReport",
    GetCustomersInternetActivityExcelReport: "customertradereport/GetCustomersInternetActivityExcelReport"
};

const GetCustomersInternetactivityServices = {
    getcustomersinternetactivityMethod: function (command, then) {
        Post(url + api.getcustomersinternetactivity, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetCustomersInternetActivityPdfReport, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetCustomersInternetActivityExcelReport, command, then);
    }

};
export default GetCustomersInternetactivityServices;