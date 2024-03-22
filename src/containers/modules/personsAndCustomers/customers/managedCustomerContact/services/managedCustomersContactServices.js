import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const api = {
    getAllContactByFilter: 'contact/getallcontactbyfilter',
    saveContact: 'contact/savecontact',
    getContactByPartyId: 'contact/getcontactbyid',
    contactUpdateContact: 'contact/updatecontact',
    deleteContactById: 'contact/deletecontactbyid'
};
const GetAllContactBy = {
    getAllContactByFilterMethod: function (command, then) {
        Post(url + api.getAllContactByFilter, command, then);
    },
    saveContactMethod: function (command, then) {
        Post(url + api.saveContact, command, then);
    },
    getContactByPartyIdMethod: function (command, then) {
        Post(url + api.getContactByPartyId, command, then);
    },
    updateContactUpdateContactMethod: function (command, then) {
        Post(url + api.contactUpdateContact, command, then);
    },
    deleteContactByIdMethod: function (command, then) {
        Post(url + api.deleteContactById, command, then);
    }
};
export default GetAllContactBy;