import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    getflatpartygroupApi :"partygroup/getflatpartygroup",
    savepartygroupApi:'partygroup/savepartygroup',
    deletepartygroupApi :'partygroup/deletepartygroup',
    deletepartygroupsApi:'partygroup/deletepartygroups',
    updatepartygroupsApi:'partygroup/updatepartygroups'
};

const GetPartiesGroupsService = {
    getFlatPartyGroup : function(command , then){
        Post(url + api.getflatpartygroupApi, command , then);
    },
    savePartyGroup : function(command , then){
        Post(url + api.savepartygroupApi , command , then);
    },

    deletePartyGroup : function(command , then){
        Post(url + api.deletepartygroupApi , command , then)
    },
    deletePartyGroups : function(command , then){
        Post(url + api.deletepartygroupsApi , command , then);
    },
    updatePartyGroups : function(command , then){
        Post(url + api.updatepartygroupsApi , command , then);
    }
};

export default GetPartiesGroupsService;