import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getallroleApi: "resource/getallrole",
    getallaccessbyfilterApi :"resource/getallaccessbyfilter",
    assignroletobuttonApi:"resource/assignroletobutton"
};


const GetAssignRoleToButtonService  = {
    getAllRole : function(command , then){
        Post(url + api.getallroleApi ,command , then);
    },
    getAllAccessByFilter : function(command , then){
        Post(url + api.getallaccessbyfilterApi , command , then);
    },
    assignRoleToButton : function(command , then){
        Post(url + api.assignroletobuttonApi , command , then);
    }
};

export default GetAssignRoleToButtonService;