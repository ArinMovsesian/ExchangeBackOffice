import { Post,DownloadExcel, DownloadPdf } from '../../../../../../core/axiosHelper';

import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.pdfDonwload;
const api = {
    getnormalsubsidiaryledgerbalancesheetApi: "subsidiaryledger/getnormalsubsidiaryledgerbalancesheet",
    getPdfExport: "subsidiaryledger/GetNormalSubsidiaryLedgerBalanceSheetPdf",
    getExcelExport: "subsidiaryledger/getnormalsubsidiaryledgerbalancesheetexcel",
};

const GetSubsidiaryLedgerBalanceService = {
    getNormalSubsidiaryLedgerBalanceSheet: function (command , then) {
        Post(url + api.getnormalsubsidiaryledgerbalancesheetApi, command, then);
    },
    getPdfExport: function (command, then) {
        DownloadPdf(url + api.getPdfExport, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getExcelExport, command,fileName);
    },


};
export default GetSubsidiaryLedgerBalanceService;