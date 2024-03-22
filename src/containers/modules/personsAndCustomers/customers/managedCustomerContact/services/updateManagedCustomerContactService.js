import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    updatecontact: 'contact/updatecontact',
};
const UpdateManagedCustomerContactServices = {
    updateContactMethod: function (command, then) {
        Post(url + api.updatecontact, command, then);
    },
};
export default UpdateManagedCustomerContactServices;