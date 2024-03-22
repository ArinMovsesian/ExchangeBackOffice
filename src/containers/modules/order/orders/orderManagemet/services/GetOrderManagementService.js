import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllordersList: "order/GetAllOrderByFilter",
    deleteOrder: "dailyOrder/DeleteOrder",
  
};


const GetOrderManagementService = {
    getAllOrdersList: function (command, then) {
        Post(url + api.getAllordersList, command, then);
    },
    deleteOrder:function(command,then){
        Post(url + api.deleteOrder, command, then);

    }
};
export default GetOrderManagementService;