import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';



const url = urlSettings.PartyManagementUrl;
const api = {
    savegrouptypeApi :"grouptype/savegrouptype"
};

const AddGroupTypeService = {

    saveGroupType : function(command , then){
        Post(url + api.savegrouptypeApi, command , then);
    }
};

export default AddGroupTypeService;