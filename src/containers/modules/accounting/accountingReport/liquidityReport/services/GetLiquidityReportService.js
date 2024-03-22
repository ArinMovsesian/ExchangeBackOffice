import { Post,DownloadExcel } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.AccountingUrl;
const api = {
    getliquidityReportApi: "liquidity/getliquidityreport",
    getPdfExport: "liquidity/getliquidityReportpdf",
    getExcelExport: "liquidity/getliquidityReportexcel",
    getSingleExcelExport: "liquidity/getcolumnliquidityReportexcel",
    getSinglePdfExport: "liquidity/getColumnliquidityReportexcel",
};

const GetLiquidityReportService = {
   
    getList: function (command, then) {
        Post(url + api.getliquidityReportApi, command, then);
    },
    getPdfExport: function (command, then) {
        Post(url + api.getPdfExport, command, then);
    },
    getExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getExcelExport, command,fileName);
    },
    getColumnPdfExport: function (command, then) {
        Post(url + api.getSingleExcelExport, command, then);
    },
    getColumnExcelExport: function (command,fileName) {
        DownloadExcel(url + api.getSingleExcelExport, command,fileName);
    },
  
};
export default GetLiquidityReportService;