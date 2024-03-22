import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;

const api = {
    getflatvouchermastersApi: "vouchermaster/getflatvouchermasters",
    GetFlatVoucherMastersExelApi: "vouchermaster/GetFlatVoucherMastersExcelReport",
    getflatvouchermastersByIdApi: "vouchermaster/getvouchermasterbyid",
    deleteflatvouchermastersByIdApi: "manualvoucher/deletevoucher",

};

const GetVouchersMasterService = {
    getFlatVoucherMasters : function (command, then) {
        Post(url + api.getflatvouchermastersApi, command, then);
    },
    getVoucherMasterById:function(command,then){
        Post(url + api.getflatvouchermastersByIdApi, command, then);
       
    },
    deleteVoucherMaster:function(command,then){
        Post(url + api.deleteflatvouchermastersByIdApi, command, then);
       
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.GetFlatVoucherMastersExelApi, command,fileName);
    },
   
};
export default GetVouchersMasterService;