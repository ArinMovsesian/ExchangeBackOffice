import { Post, DownloadPdf } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    CashFlowChequePreviewPdfDownload: "cashflowchequedetail/CashFlowChequePreviewPdfDownload",
};


const downloadChequePreviewPdfService = {
    CashFlowChequePreviewPdfDownloadMethod: function (command, then, prewPdf) {
        console.log('prewPdf: ', prewPdf);
        DownloadPdf(url + api.CashFlowChequePreviewPdfDownload, command, then, prewPdf);
    },
};
export default downloadChequePreviewPdfService