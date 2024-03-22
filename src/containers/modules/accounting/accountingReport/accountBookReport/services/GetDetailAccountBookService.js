import { Post ,DownloadExcel} from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getdetailcodesfordetailaccountbooksApi: "accountbook/getdetailcodesfordetailaccountbooks",
    getspecificdetailaccountbooksApi :"accountbook/getspecificdetailaccountbooks",
    getdetailcodesfordetailaccountbooksExcelApi: "accountbook/GetDetailCodesForDetailAccountBooksExcelReport"
};

const GetDetailAccountBookService = {

    getDetailAccountBooks: function (command, then) {
        Post(url + api.getdetailcodesfordetailaccountbooksApi, command, then);
    },
    getSpecificDetailAccountBooks :  function (command, then) {
        Post(url + api.getspecificdetailaccountbooksApi, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getdetailcodesfordetailaccountbooksExcelApi, command,fileName);
    },
}


export default GetDetailAccountBookService;