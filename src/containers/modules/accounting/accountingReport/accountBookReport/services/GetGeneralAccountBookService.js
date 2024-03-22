import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;

const api = {
    getgeneralaccountbooksApi: "accountbook/getgeneralcodesforgeneralaccountbooks",
    getspecificgeneralaccountbooksApi : "accountbook/getspecificgeneralaccountbooks",
    getgeneralaccountbooksExcelApi : "accountbook/GetGeneralCodesForGeneralAccountBooksExcelReport",

};


const GetGeneralAccountBookService = {

    getGeneralAccountBooks: function (command, then) {
        Post(url + api.getgeneralaccountbooksApi, command, then, true);
    },
    getspecificgeneralaccountbooks :  function(command , then){
        Post(url + api.getspecificgeneralaccountbooksApi , command , then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getgeneralaccountbooksExcelApi, command,fileName);
    },
}


export default GetGeneralAccountBookService;