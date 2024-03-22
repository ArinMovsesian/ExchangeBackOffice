import { Post, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.LocalUrl;
const api = {
    getfiscalyearsApi: "fiscalyear/getfiscalyears",
    getfiscalyearsExcelApi: "fiscalyear/GetFiscalYearsExcelReport",
    getlastFiscalyearsApi: "fiscalyear/getLastFiscalYear"
}

const GetFiscalYearsService = {

    getFiscalYears: function (command, then) {
        Post(url + api.getfiscalyearsApi, command, then, true);
    },
    getLastFiscalYear:function(then){
        Post(url + api.getfiscalyearsApi, null, then, true);

    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getfiscalyearsExcelApi, command,fileName);
    },
}

export default GetFiscalYearsService;