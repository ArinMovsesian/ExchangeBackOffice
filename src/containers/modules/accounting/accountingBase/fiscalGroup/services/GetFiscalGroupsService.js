import { Post,DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings'

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.LocalUrl;
const api = {
    getfiscalgroupsApi: "fiscalyear/getfiscalgroups",
    getfiscalgroupsExelApi: "fiscalyear/GetFiscalGroupsExcelReport"
}

const GetFiscalGroupsService = {

    getFiscalGroups: function (command, then) {
        Post(url + api.getfiscalgroupsApi, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getfiscalgroupsExelApi, command,fileName);
    },
}
export default GetFiscalGroupsService;