import urlSettings from 'constants/urlSettings';
import { Post, Get } from 'core/axiosHelper';


const url = urlSettings.BasicInfoUrl;

const api = {
    getcommoditycontracttype: "common/getcommoditycontracttype",
};
const getCommodityContractType =  {
    getcommoditycontracttypeMethod: function (command, then) {
        Get(url + api.getcommoditycontracttype, command, then);
    },
};
export default getCommodityContractType;