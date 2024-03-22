import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.TradeUrl;
const url2 = urlSettings.BasicInfoUrl;
const api = {
    // customerscommoditytradecount: "commoditytrade/getcommoditytrades",
    getcommoditytrades: "commoditytrade/getcommoditytrades",
    searchcommodityproducts: "product/searchcommodityproducts",
   
};

const GetCommodityTradesListService = {
    
    getAllCommodityMethod : function (command , then) {
        Post(url + api.getcommoditytrades, command , then);
    },
    searchcommodityproductsMethod : function (command , then) {
        Post(url2 + api.searchcommodityproducts, command , then);
    },
   
   
};
export default GetCommodityTradesListService;