import { Post, Get, DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.integratedUrl;
const api = {
    getnewspaperreportmonthlyvouchertype: "customertradereport/getnewspaperreportmonthlyvouchertype",
    GetNewsPaperReportMonthLyVoucherTypePdfReport: "customertradereport/GetNewsPaperReportMonthLyVoucherTypePdfReport",
    GetNewsPaperReportMonthLyVoucherTypeExcelReport: "customertradereport/GetNewsPaperReportMonthLyVoucherTypeExcelReport"
};

const GetNewsPaperReportMonthlyVoucherTypeServices = {
    getnewspaperreportmonthlyvouchertypeMethod: function (command, then) {
        Post(url + api.getnewspaperreportmonthlyvouchertype, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetNewsPaperReportMonthLyVoucherTypeExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetNewsPaperReportMonthLyVoucherTypePdfReport, command, then);
    }
};
export default GetNewsPaperReportMonthlyVoucherTypeServices;