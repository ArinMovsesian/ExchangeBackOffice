import { Post, DownloadExcel} from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
// const url2 = urlSettings.LocalUrl;
const api = {
    getdetailledgersApi: "detailledger/getdetailledgers",
    getdetailledgersExcelApi: "detailledger/GetDetailLedgersExcelReport",
    getdetailledgersforautocompleteApi: "detailledger/searchdetailledgers",
    getallmainclassidsApi: "detailledger/getallmainclassids",
    searchdetailsledgersandsubsidiaryledger: "detailledger/searchdetailsledgersandsubsidiaryledger",
};

const GetDetailLedgerService = {
    getDetailledgers: function (command, then) {
        Post(url + api.getdetailledgersApi, command, then, true);
    },
    getDetailLedgersForAutoComplete:function(command,then){
      Post(url+api.getdetailledgersforautocompleteApi,command,then,true)
    },
    getMainClassId(then){
        Post(url+api.getallmainclassidsApi,null,then,true)
    },
    getNormalDetailedgerAndSubsidiaryLedgerBalanceSheet: function (command, then) {
        Post(url + api.searchdetailsledgersandsubsidiaryledger, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getdetailledgersExcelApi, command,fileName);
    },
};
export default GetDetailLedgerService;