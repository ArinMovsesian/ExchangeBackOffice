import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    savepartyservice: "partyservice/savepartyservice",
};

const SaveCustomerServicesService = {
    savepartyserviceMethod: function (command, then) {
        Post(url + api.savepartyservice, command, then);
    },
};
export default SaveCustomerServicesService;