import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    getAllCustomersRelationByFilterAPI: 'partyrelationship/getallpartyrelationshipbyfilter'
};

const GetCustomersRelationService = {
    
    getAllCustomersRelationByFilter : function (command , then) {
        Post(url + api.getAllCustomersRelationByFilterAPI, command , then);
    }
};
export default GetCustomersRelationService;