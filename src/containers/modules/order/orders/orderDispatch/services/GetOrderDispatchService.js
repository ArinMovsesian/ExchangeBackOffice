import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllOngoingOrdersApi: "dailyOrder/GetAllOngoingOrderByFilter",
    getAllWaitingordersListApi: "dailyOrder/GetAllWaitingOrderByFilter",
    frowardOrderApi: "dailyOrder/forwardOrder",
    backwardOrderToPendingApi: "dailyOrder/BackwardOrderToPending",

};


const GetOrdersDispatchService = {
    getAllOngoingOrderList: function (command, then) {
        Post(url + api.getAllOngoingOrdersApi, command, then);
    },
    getAllWaitingOrderList: function (command, then) {
        Post(url + api.getAllWaitingordersListApi, command, then);
    },
    forwardOrder: function (command, then) {
        Post(url + api.frowardOrderApi, command, then);
    },
    backwardOrderToPendingOrder: function (command, then) {
        Post(url + api.backwardOrderToPendingApi, command, then);
    },
};
export default GetOrdersDispatchService;