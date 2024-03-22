import { Post,DownloadPdf, DownloadExcel } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllordersList: "order/getallorderbyfilter",
    deleteOrder: "dailyOrder/DeleteOrder",
    GetAllOrderByFilterExcelReport: "order/GetAllOrderByFilterExcelReport",
    GetAllOrderByFilterPdfReport: "order/GetAllOrderByFilterPdfReport"
  
};


const GetOrdersService = {
    getAllOrdersList: function (command, then) {
        Post(url + api.getAllordersList, command, then);
    },
    deleteOrder:function(command,then){
        Post(url + api.deleteOrder, command, then);

    },
    getExcelExport: function(command, then){
        DownloadExcel(url + api.GetAllOrderByFilterExcelReport, command, then);
    },
    getPdfExport: function(command, then){
        DownloadPdf(url + api.GetAllOrderByFilterPdfReport, command, then);
    },
};
export default GetOrdersService;