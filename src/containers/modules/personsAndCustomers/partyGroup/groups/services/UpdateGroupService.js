import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    updategroupApi :"group/updategroup"
};

const UpdateGroupService = {
    updateGroup : function(command , then){
        Post(url + api.updategroupApi, command , then);
    }
};

export default UpdateGroupService;