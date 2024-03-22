

import urlSettings from 'constants/urlSettings';
import { Get } from 'core/axiosHelper';


const url = {
    sharedData: urlSettings.BasicInfoUrl,

};

const api = {

    getmainmarketsApi: "mainmarket/getmainmarkets"


}
const GetMainMarket =  function (then) {
    Get(url.sharedData + api.getmainmarketsApi, null, then);


}
export default GetMainMarket;