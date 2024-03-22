import { Post, Get , DownloadPdf, } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    ChequePaymentCommandPdfDownload: "cashflowchequedetail/ChequePaymentCommandPdfDownload",
};


const chequePaymentCommandService = {
    ChequePaymentCommandPdfDownloadMethod: function (command, then) {
        DownloadPdf(url + api.ChequePaymentCommandPdfDownload, command, then);
    },
};
export default chequePaymentCommandService;