import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.LocalUrl;

const api = {
    getcostcentersApi: "costcenter/getcostcenters",
    getcostcentersExcelApi: "costcenter/GetCostCentersExcelReport"
};

const GetCostCentersService = {
    getCostCenters: function (command, then) {
        Post(url + api.getcostcentersApi, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getcostcentersExcelApi, command,fileName);
    },
};
export default GetCostCentersService;