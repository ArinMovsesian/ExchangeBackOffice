import { Post } from './node_modules/core/axiosHelper';
import urlSettings from './node_modules/constants/urlSettings';

const url = urlSettings.OrderUrl;
const TradingBookUrl=urlSettings.AccountingUrl;
const api = {
    buyOrderApi: "tradingBook/",
    sellOrderApi: "tradingBook/addinpersoncustomersellorder",
  
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