import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;

const api = {
    buyOrderApi: "dailyOrder/UpdateBuyOrder",
    sellOrderApi: "dailyOrder/UpdateSellOrder",
    DoneOrderApi: "order/ChangeSerialNumber",
    
};


const UpdateOrdersService = {
    editBuyOrder: function (command, then) {
        Post(url + api.buyOrderApi, command, then);
    },
    editSellOrder: function (command, then) {
        Post(url + api.sellOrderApi, command, then);
    },
    editTradingBookByPartyId:function(command,then){
        Post(url + api.TradingBookUrl, command, then);

    },
    getOrderById:function(command,then){
        Post(url + api.sellOrderApi, command, then);
    },
    editDoneOrder: function (command, then) {
        Post(url + api.DoneOrderApi, command, then);
    },
};
export default UpdateOrdersService;