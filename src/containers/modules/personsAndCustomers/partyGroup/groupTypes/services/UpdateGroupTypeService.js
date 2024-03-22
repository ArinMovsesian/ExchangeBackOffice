import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    updategrouptypeApi :"grouptype/updategrouptype"
};

const UpdateGroupTypeService = {
    updateGroupType : function(command , then){
        Post(url + api.updategrouptypeApi, command , then);
    }
};

export default UpdateGroupTypeService;