import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getsubsidiaryledgersApi: "subsidiaryledger/getsubsidiaryledgers",
    getsubsidiaryledgersExcelApi: "subsidiaryledger/GetSubsidiaryLedgersExcelReport"
};

const GetSubsidiaryLedgerService = {
    getsubsidiaryledgers: function (command, then) {
        Post(url + api.getsubsidiaryledgersApi, command, then, true);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getsubsidiaryledgersExcelApi, command,fileName);
    },
};
export default GetSubsidiaryLedgerService;