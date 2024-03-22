import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getallroleApi: "resource/getallrole",
    getallaccessbyfilterApi :"resource/getallaccessbyfilter",
    assignroletopageApi:"resource/assignroletopage"
};


const GetAssignRoleToPageService  = {
    getAllRole : function(command , then){
        Post(url + api.getallroleApi ,command , then);
    },
    getAllAccessByFilter : function(command , then){
        Post(url + api.getallaccessbyfilterApi , command , then);
    },
    assignRoleToPage : function(command , then){
        Post(url + api.assignroletopageApi , command , then);
    }
};

export default GetAssignRoleToPageService;