import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getallroleApi: "resource/getallrole",
    getallaccessbyfilterApi :"resource/getallaccessbyfilter",
    assignroletomenuApi:"resource/assignroletomenu"
};


const GetAssignRoleToMenuService  = {
    getAllRole : function(command , then){
        Post(url + api.getallroleApi ,command , then);
    },
    getAllAccessByFilter : function(command , then){
        Post(url + api.getallaccessbyfilterApi , command , then);
    },
    assignRoleToMenu : function(command , then){
        Post(url + api.assignroletomenuApi , command , then);
    }
};

export default GetAssignRoleToMenuService;