import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getAllRoles: "resource/getallrole",
    getAlluUerRoles: "resource/getallrole",
};


const GetRolesService = {
 
    getAllRolesByFilter : function (command , then) {
        Post(url + api.getAllRoles, command , then);
    },
    getAllRoles:function(command,then){
        Post(url + api.getAlluUerRoles, command , then);

    }
   
};
export default GetRolesService;