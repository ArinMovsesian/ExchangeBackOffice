import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    updatepartyservices: "partyservice/updatepartyservices",
};

const EditCustomerServicesService = {
    updatepartyservicesMethod: function (command, then) {
        Post(url + api.updatepartyservices, command, then);
    },
};
export default EditCustomerServicesService;