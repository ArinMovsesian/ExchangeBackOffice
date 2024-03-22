import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.OrderUrl;
const TradingBookUrl=urlSettings.AccountingUrl;
const api = {
    buyOrderApi: "dailyOrder/addinpersoncustomerbuyorder",
    sellOrderApi: "dailyOrder/addinpersoncustomersellorder",
  
  
};


const AddOrdersService = {
    addBuyOrder: function (command, then) {
        Post(url + api.buyOrderApi, command, then);
    },
    addSellOrder: function (command, then) {
        Post(url + api.sellOrderApi, command, then);
    },
    getTradingBookByPartyId:function(command,then){
        Post(url + api.TradingBookUrl, command, then);

    },
    getOrderById: function (command, then) {
        Post(url + api.sellOrderApi, command, then);
    },
};
export default AddOrdersService;