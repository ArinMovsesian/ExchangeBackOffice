import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    getpartyattachmentbyfilter: 'attachment/getpartyattachmentbyfilter',
    getallattachmentcategory: 'attachment/partyuploadeddocument',

};
const GetManageCustomerRecordsServices = {
    getPartyAttachmentByFilterMethod: function (command, then) {
        Post(url + api.getpartyattachmentbyfilter, command, then);
    },
    getAllAttachmentCategoryMethod: function (command, then) {
        Get(url + api.getallattachmentcategory, command, then);
    },
};
export default GetManageCustomerRecordsServices;