import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.TradeUrl;
const api = {
    UploadCommodityTrade: "commoditytransactiondetails/resultcommoditytrade",
};

const UploadCommodityTrade = {
    UploadCommodityTradeMethod: function (command, then) {
        Post(url + api.UploadCommodityTrade, command, then);
    },
};
export default UploadCommodityTrade;