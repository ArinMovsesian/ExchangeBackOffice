import { Post,DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.pdfDonwload;
const api = {
    getnormalgeneralledgerbalancesheetApi: "generalledger/getnormalgeneralledgerbalancesheet",
    getPdfExport: "generalledger/getnormalgeneralledgerbalancesheetpdf",
    getExcelExport: "generalledger/getnormalgeneralledgerbalancesheetexcel",
};

const GetGeneralLedgerBalanceService = {
   
    getNormalGeneralLedgerBalanceSheet: function (command, then) {
        Post(url + api.getnormalgeneralledgerbalancesheetApi, command, then);
    },
    getPdfExport: function (command, fileName) {
        DownloadPdf(url + api.getPdfExport, command, fileName);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getExcelExport, command,fileName);
    },
    
  
};
export default GetGeneralLedgerBalanceService;