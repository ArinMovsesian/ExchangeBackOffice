import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.TradeUrl;
const api = {
    customerscommoditytradecount: "trade/customerscommoditytradecount",
    resultcommoditytrade: "trade/resultcommoditytrade",

};

const GetTradeListCommodityServices = {
    customersCommodityTradeCountMethod : function (command , then) {
        Post(url + api.customerscommoditytradecount, command , then);
    },
    resultCommodityTradeMethod : function (command , then) {
        Post(url + api.resultcommoditytrade, command , then);
    }
};
export default GetTradeListCommodityServices;