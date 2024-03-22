import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    deletepartyservices: "partyservice/deletepartyservices",
};

const DeleteCustomerServicesService = {
    deletepartyservicesMethod: function (command, then) {
        Post(url + api.deletepartyservices, command, then);
    },
};
export default DeleteCustomerServicesService;