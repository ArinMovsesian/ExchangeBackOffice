import { Post } from './node_modules/core/axiosHelper';
import urlSettings from './node_modules/constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    getgrouptypesApi :"grouptype/getgrouptypes"
};

const GetGroupTypesService = {
    getGroupTypes : function(command , then){
        Post(url + api.getgrouptypesApi, command , then);
    }
};

export default GetGroupTypesService;