import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.PartyManagementUrl;
const url2 = urlSettings.BasicInfoUrl;
const api = {
    getflatpartyservice: "partyservice/getflatpartyservice",
    getallrepresentativeforautocomplete: "party/getallrepresentativeforautocomplete",
    getservices: 'services/getservices',
};

const GetCustomersServicesSerivce = {
    getflatpartyserviceMethod: function (command, then) {
        Post(url + api.getflatpartyservice, command, then);
    },
    getallrepresentativeforautocompleteMethod: function(command, then){
        Post(url + api.getallrepresentativeforautocomplete, command, then);
    },
    getservicesMethod: function(command, then){
        Post(url2 + api.getservices, command, then);
    }

};
export default GetCustomersServicesSerivce;