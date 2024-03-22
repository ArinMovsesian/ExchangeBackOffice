import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.AccountingUrl;
const api = {
    gettradingbookbypartyidApi: "tradingbook/gettradingbookbyfilter",
};


const GetTradingBookByPartyIdService = {
    GetTradingBookByPartyIdMethod: function (command, then) {
        Post(url + api.gettradingbookbypartyidApi, command, then);
    },
};
export default GetTradingBookByPartyIdService;