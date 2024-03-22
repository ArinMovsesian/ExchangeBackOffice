import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    savecontact: 'contact/savecontact',
};
const SaveManagedCustomerContactServices = {

    saveContactMethod: function (command, then) {
        Post(url + api.savecontact, command, then);
    },

};
export default SaveManagedCustomerContactServices;