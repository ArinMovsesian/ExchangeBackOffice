import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    deleteParty: 'partyrelationship/deletepartyrelationshipbyid'
};
const DeleteCustomersRelation = function (command, then) {
    Post(url + api.deleteParty, command, then, true);
};
export default DeleteCustomersRelation;