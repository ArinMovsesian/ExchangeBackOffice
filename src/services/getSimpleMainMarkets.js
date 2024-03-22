import urlSettings from 'constants/urlSettings';
import { Get } from 'core/axiosHelper';
const url = {
    sharedData: urlSettings.BasicInfoUrl,

};
const api = {
    getsimplemainmarkets: "mainmarket/getsimplemainmarkets"
};
const getSimpleMainMarkets =  function (then) {
    Get(url.sharedData + api.getsimplemainmarkets, null, then);
};
export default getSimpleMainMarkets;