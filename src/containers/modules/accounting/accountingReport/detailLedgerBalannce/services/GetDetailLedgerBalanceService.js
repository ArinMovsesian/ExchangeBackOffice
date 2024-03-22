import { Post,DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.pdfDonwload;
const api = {
    getnormaldetailledgerbalancesheetApi: "detailledger/getnormaldetailledgerbalancesheet",
    getdetailLedgersSearchApi: "detailledger/searchDetailLedgers",
    getPdfExport: "detailledger/getnormaldetailledgerbalancesheetpdf",
    getExcelExport: "detailledger/getnormaldetailledgerbalancesheetexcel",
};

const GetDetailLedgerBalanceService = {
   
    getNormalDetailedgerBalanceSheet: function (command, then) {
        Post(url + api.getnormaldetailledgerbalancesheetApi, command, then);
    },
    getPdfExport: function (command, then) {
        DownloadPdf(url + api.getPdfExport, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getExcelExport, command,fileName);
    },
    
  
  
};
export default GetDetailLedgerBalanceService;