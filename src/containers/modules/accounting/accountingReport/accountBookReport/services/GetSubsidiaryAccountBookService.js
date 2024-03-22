import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getsubsidiaryaccountbooksApi: "accountbook/getsubsidiarycodesforsubsidiaryaccountbooks",
    getspecificsubsidiaryaccountbooksApi: "accountbook/getspecificsubsidiaryaccountbooks",
    getsubsidiarycodesforsubsidiaryaccountbooksExcelApi: "accountbook/GetSubsidiaryCodesForSubsidiaryAccountBooksExcelReport",
};

const GetSubsidairyAccountBookService = {

    getSubsidiaryAccountBooks: function (command, then) {
        Post(url + api.getsubsidiaryaccountbooksApi, command, then);
    },
    getSpecificSubsidiaryAccountBooks : function(command, then) {
        Post(url + api.getspecificsubsidiaryaccountbooksApi, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getsubsidiarycodesforsubsidiaryaccountbooksExcelApi, command,fileName);
    },
}


export default GetSubsidairyAccountBookService;