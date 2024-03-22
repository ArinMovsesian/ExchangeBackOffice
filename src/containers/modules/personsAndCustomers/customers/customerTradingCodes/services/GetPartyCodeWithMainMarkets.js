import { Post,Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;

const api = {
    getAllPartyCodeWithMainMarketsAPI: "partycode/getpartycodewithmainmarketsbypartyid",
    // getPartyCodeByFilterAPI: 'partycode/getpartycodebyfilter',
    getPartyCodeByFilterAPI: 'partycode/getcustomerwithpartycodebyfilter',
    updatePartyCodeAPI: 'partycode/saveorupdatepartycode'
};

const GetPartyCodeWithMainMarketsService = {
    getAllPartyCodeWithMainMarkets : function (command , then) {
        Post(url + api.getAllPartyCodeWithMainMarketsAPI, command , then);
    },
    getPartyCodeByFilter: function (command , then) {
        Post(url + api.getPartyCodeByFilterAPI, command , then);
    },
    updatePartyCode: function (command , then) {
        Post(url + api.updatePartyCodeAPI, command , then);
    }
};
export default GetPartyCodeWithMainMarketsService;