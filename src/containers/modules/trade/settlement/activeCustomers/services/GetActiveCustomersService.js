import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    getallpartyforautocompleteApi: "party/getallpartyforautocomplete",
    getallpartybyfilterApi: 'party/getflatcustomers',

};


const GetActivePartiesService = {
    getAllActivePartyForAutocomplete: function (command, then) {
        Post(url + api.getallpartyforautocompleteApi, command, then);
    },
    getAllActivePartyByFilter : function (command , then) {
        Post(url + api.getallpartybyfilterApi, command , then);
    },
    
};
export default GetActivePartiesService;