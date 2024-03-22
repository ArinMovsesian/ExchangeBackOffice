import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    activeorinactivepartyservices: "partyservice/activeorinactivepartyservices",
};

const ActiveorinActivePartyServices = {
    activeorinactivepartyservicesMethod: function (command, then) {
        Post(url + api.activeorinactivepartyservices, command, then);
    },
};
export default ActiveorinActivePartyServices;