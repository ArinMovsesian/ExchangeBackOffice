import { Post,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllordersList: "order/GetAllRemovedOrderByFilter",
    GetAllRemovedOrderByFilterExcelReport: "order/GetAllRemovedOrderByFilterExcelReport",
    GetAllRemovedOrderByFilterPdfReport: "order/GetAllRemovedOrderByFilterPdfReport"

  
};


const GetRemovedOrdersService = {
    getAllOrdersList: function (command, then) {
     
        Post(url + api.getAllordersList, command, then);
    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetAllRemovedOrderByFilterExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetAllRemovedOrderByFilterPdfReport, command, then);
    },
};
export default GetRemovedOrdersService;