import { Post, DownloadExcel } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getflatvouchermastersApi: "voucherdetail/getflatvoucherdetailsbyvoucehrid",
    GetFlatVoucherDetailsByVoucehrIdExcelApi: "voucherdetail/GetFlatVoucherDetailsByVoucehrIdExcelReport",
};

const GetVouchersDetailService={
   getVoucherDetailList: function (command, then) {
        Post(url + api.getflatvouchermastersApi, command, then);
    },
    getVoucherDetailById: function (command, then) {
        Post(url + api.getflatvouchermastersApi, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.GetFlatVoucherDetailsByVoucehrIdExcelApi, command,fileName);
    },
} 
export default GetVouchersDetailService;