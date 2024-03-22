import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    deleteattachment: 'attachment/deleteattachment',
};
const DeleteManageCustomerServices = {
    deleteAttachmentMethod: function (command, then) {
        Post(url + api.deleteattachment, command, then);
    },
};
export default DeleteManageCustomerServices;