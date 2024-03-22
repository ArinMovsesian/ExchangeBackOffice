import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    getallpartyforautocompleteApi: "party/getallpartyforautocomplete",
    getallpartybyfilterApi: 'party/getflatcustomers',
    getpartybyidApi: 'party/getpartybyid',
};


const GetPartiesService = {
    getAllPartyForAutocomplete: function (command, then) {
        Post(url + api.getallpartyforautocompleteApi, command, then);
    },
    getAllPartyByFilter : function (command , then) {
        Post(url + api.getallpartybyfilterApi, command , then);
    },
    getpartybyid: function (command , then) {
        Post(url + api.getpartybyidApi, command , then);
    }
};
export default GetPartiesService;