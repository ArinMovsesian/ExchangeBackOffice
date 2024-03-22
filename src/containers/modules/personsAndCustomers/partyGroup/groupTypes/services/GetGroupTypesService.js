import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    getgrouptypesApi :"grouptype/getgrouptypes",
    deletegrouptypeApi:'grouptype/deletegrouptype'
};

const GetGroupTypesService = {
    getGroupTypes : function(command , then){
        Post(url + api.getgrouptypesApi, command , then);
    },
    deleteGroupType : function(command , then){
        Post(url + api.deletegrouptypeApi , command , then)
    }
};

export default GetGroupTypesService;