import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    party: 'partyrelationship/savepartyrelationship'
};

const AddCustomersRelation = function (command, then) {
        Post(url + api.party, command, then, true);

};
export default AddCustomersRelation;