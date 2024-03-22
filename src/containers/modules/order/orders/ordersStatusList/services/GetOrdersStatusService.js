import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const api = {
    getAllordersList: "order/GetAllOrderByFilter",
  
};


const GetOrdersStatusService = {
    getAllOrdersStatusList: function (command, then) {
        Post(url + api.getAllordersList, command, then);
    },
};
export default GetOrdersStatusService;