import { Post,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllDoneOrdersListApi: "order/GetAllOrdersByIds",
    deleteOrder: "dailyorder/DeleteOrder",
    GetAllDailyOrderByFilterExcelReport: "dailyorder/GetAllDailyOrderByFilterExcelReport",
    GetAllOrderByFilterPdfReport: "dailyorder/GetAllDailyOrderByFilterPdfReport"
  
};


const GetDoneOrdersByIdsService = {
    getAllDoneOrdersByIdsList: function (command, then) {
     
        Post(url + api.getAllDoneOrdersListApi, command, then);
    },
    deleteOrder:function(command,then){
        Post(url + api.deleteOrder, command, then);

    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetAllDailyOrderByFilterExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetAllOrderByFilterPdfReport, command, then);
    },
};
export default GetDoneOrdersByIdsService;