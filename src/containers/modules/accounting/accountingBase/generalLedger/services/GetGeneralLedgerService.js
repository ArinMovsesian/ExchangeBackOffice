import { Post, DownloadExcel,DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getgeneralledgersApi: "generalledger/getgeneralledgers",
    getgeneralledgersExcelApi: "generalledger/GetGeneralLedgersExcelReport",
    getgeneralledgersPdfApi: "generalledger/GetGeneralLedgersPdfReport",

};

const GetGeneralLedgerService = {
    getGeneralLedgers: function (command, then) {
        Post(url + api.getgeneralledgersApi, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getgeneralledgersExcelApi, command,fileName);
    },
    getPdfExport: function (command,fileName) {
        DownloadPdf(url + api.getgeneralledgersPdfApi, command,fileName);
    },
};
export default GetGeneralLedgerService;