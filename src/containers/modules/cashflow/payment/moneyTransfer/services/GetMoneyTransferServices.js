import { Post, DownloadPdf, DownloadExcel} from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    savetransfer: "cashflowmaster/savetransfer",
    getflattransfer: 'cashflowmaster/getflattransfer',
    gettransferbyid: 'cashflowmaster/gettransferbyid',
    MoneyTransferPdf: 'cashflowmaster/MoneyTransferPdf',
    MoneyTransferExcelReport: 'cashflowmaster/MoneyTransferExcelReport'
};


const GetMoneyTransferServices = {
    savetransferMethod: function (command, then) {
        Post(url + api.savetransfer, command, then);
    },
    getflattransferMethod: function (command, then) {
        Post(url + api.getflattransfer, command, then);
    },
    gettransferbyidMethod: function (command, then) {
        Post(url + api.gettransferbyid, command, then);
    },


    getExcelExport: function(command, then){
        DownloadExcel(url + api.MoneyTransferExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.MoneyTransferPdf, command, then);
    }
};
export default GetMoneyTransferServices;