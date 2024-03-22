import { Post ,DownloadPdf, DownloadExcel} from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllDoneOrdersApi: "dailyOrder/GetAllDoneOrderByFilter",
    getAllActiveOrderApi: "dailyOrder/GetAllActiveOrderByFilter",
    getAllNotEnteredOrdersApi: "dailyOrder/GetAllNotEnteredOrderByFilter",
    assignToDoneOrdersApi: "dailyOrder/assignToDoneOrders",
    assignToActiveOrdersApi: "dailyOrder/assignToActiveOrders",
    assignToNotEnteredOrdersApi: "dailyOrder/assignToNotEnteredOrders",
    GetAllNotEnteredOrderByFilterExcelReport: "dailyOrder/GetAllNotEnteredOrderByFilterExcelReport",
    GetAllNotEnteredOrderByFilterPdfReport: "dailyOrder/GetAllNotEnteredOrderByFilterPdfReport",
    GetAllActiveOrderByFilterExcelReport: "dailyOrder/GetAllActiveOrderByFilterExcelReport",
    GetAllDoneOrderByFilterExcelReport: "dailyOrder/GetAllDoneOrderByFilterExcelReport"

};


const GetTseOrderBranchService = {
    getAllDoneOrderList: function (command, then) {
        Post(url + api.getAllDoneOrdersApi, command, then);
    },
    getAllActiveOrderList: function (command, then) {
        Post(url + api.getAllActiveOrderApi, command, then);
    },
    getAllNotEnteredOrderList: function (command, then) {
        Post(url + api.getAllNotEnteredOrdersApi, command, then);
    },
    assignToActiveOrders: function (command, then) {
        Post(url + api.assignToActiveOrdersApi, command, then);
    },
    assignToDoneOrders: function (command, then) {
        Post(url + api.assignToDoneOrdersApi, command, then);
    },
    assignToNotEnteredOrders: function (command, then) {
        Post(url + api.assignToNotEnteredOrdersApi, command, then);
    },
    getExcelExportDownloadExcelGetAllNotEntered: function(command, then){
        DownloadExcel(url + api.GetAllNotEnteredOrderByFilterExcelReport, command, then);
    },
    getPdfExportDownloadExcelGetAllNotEntered: function(command, then){
        // DownloadPdf(url + api.GetAllNotEnteredOrderByFilterPdfReport, command, then);
    },
    getExcelExportDownloadExcelGetAllActiveOrder: function(command, then){
        DownloadExcel(url + api.GetAllActiveOrderByFilterExcelReport, command, then);
    },
    getPdfExportDownloadExcelGetAllActiveOrder: function(command, then){
        // DownloadPdf(url + api.GetAllNotEnteredOrderByFilterPdfReport, command, then);
    },
    getExcelExportDownloadExcelGetAllDoneOrder: function(command, then){
        DownloadExcel(url + api.GetAllDoneOrderByFilterExcelReport, command, then);
    },
    getPdfExportDownloadExcelGetAllDoneOrder: function(command, then){
        // DownloadPdf(url + api.GetAllNotEnteredOrderByFilterPdfReport, command, then);
    },
};
export default GetTseOrderBranchService;