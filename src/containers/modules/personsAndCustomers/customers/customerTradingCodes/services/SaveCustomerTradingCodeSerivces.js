import { Post,Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;

const api = {
    savepartycode: "partycode/savepartycode",

};

const SaveCustomerTradingCodeSerivces = {
    savepartycodeMethod : function (command , then) {
        Post(url + api.savepartycode, command , then);
    },
    
};
export default SaveCustomerTradingCodeSerivces;