import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    savegroupApi :"group/savegroup"
};

const AddGroupService = {
    saveGroup : function(command , then){
        Post(url + api.savegroupApi, command , then);
    }
};

export default AddGroupService;