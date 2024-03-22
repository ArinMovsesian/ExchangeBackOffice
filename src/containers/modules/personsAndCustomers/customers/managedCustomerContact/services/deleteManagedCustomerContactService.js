import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    deletecontactbyid: 'contact/deletecontactbyid'
};
const DeleteManagedCustomerContactServices = {

    deleteContactByIdMethod: function (command, then) {
        Post(url + api.deletecontactbyid, command, then);
    }
};
export default DeleteManagedCustomerContactServices;