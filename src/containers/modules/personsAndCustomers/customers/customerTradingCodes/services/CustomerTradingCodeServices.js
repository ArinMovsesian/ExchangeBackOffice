import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    getAllParty: 'partycode/getallpartycodebyfilter',
    deleteParty: 'partycode/deletepartycodebyid',
};
const CustomerTradingCodesService = {
    getAllPartyMethod: function (command, then) {
        Post(url + api.getAllParty, command, then);
    },
    deletePartyMethod : function (command , then) {
        Post(url + api.deleteParty, command , then);
    }
};
export default CustomerTradingCodesService;