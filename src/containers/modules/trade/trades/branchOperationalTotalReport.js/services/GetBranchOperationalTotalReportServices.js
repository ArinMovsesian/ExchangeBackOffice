import { Post, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.integratedUrl;

const api = {

    getbranchoperationaltotalreport: "customertradereport/getbranchoperationaltotalreport",

    GetBranchOperationalTotalPdfReport: "customertradereport/GetBranchOperationalTotalPdfReport",
  
   
};

const GetBranchOperationalTotalReportServices = {
    
    getbranchoperationaltotalreportMethod : function (command , then) {
        Post(url + api.getbranchoperationaltotalreport, command , then);
    },
    // getExcelExport: function(command, then){
    //     DownloadExcel(url + api.GetTradeExcelReport, command, then);
    // },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetBranchOperationalTotalPdfReport, command, then);
    }
   
   
};
export default GetBranchOperationalTotalReportServices;