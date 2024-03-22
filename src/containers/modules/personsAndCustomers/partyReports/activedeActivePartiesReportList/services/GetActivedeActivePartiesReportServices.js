import { Post, Get ,DownloadPdf, DownloadExcel} from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    activedeactivepartiesreport: "reporting/activedeactivepartiesreport",
    ActiveDeActivePartiesReportPdf: "reporting/ActiveDeActivePartiesReportPdf",
    ActiveDeActivePartiesReportExcel:"reporting/ActiveDeActivePartiesReportExcel",
};

const GetActivedeActivePartiesReportServices = {
    activedeactivepartiesreportMethod: function (command, then) {
        Post(url + api.activedeactivepartiesreport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.ActiveDeActivePartiesReportPdf, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.ActiveDeActivePartiesReportExcel, command, then);
    }

};
export default GetActivedeActivePartiesReportServices;