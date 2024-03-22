import urlSettings from 'constants/urlSettings';
import { Get,Post } from 'core/axiosHelper';


const url = {
    sharedData: urlSettings.BasicInfoUrl,

};

const api = {
    getBankAccountUsagesAPI: "bankaccountusage/getbankaccountusages",
};
const getBankAccountUsages =  function (then) {
    Post(url.sharedData + api.getBankAccountUsagesAPI, null, then);
};
export default getBankAccountUsages;