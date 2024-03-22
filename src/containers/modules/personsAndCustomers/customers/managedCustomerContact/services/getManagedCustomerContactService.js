import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    getallcontactbyfilter: 'contact/getallcontactbyfilter',
    getcontactbyid: 'contact/getcontactbyid',
};
const GetManagedCustomerContactServices = {
    getAllContactByFilterMethod: function (command, then) {
        Post(url + api.getallcontactbyfilter, command, then);
    },
    getContactByIdMethod: function (command, then) {
        Post(url + api.getcontactbyid, command, then);
    },
};
export default GetManagedCustomerContactServices;