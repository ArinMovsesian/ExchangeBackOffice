import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.loginUrl;
const api = {
    getAllUsers: "resource/getallusers",
    getAlluUerRoles: "resource/getallrole",
};


const GetUsersService = {
 
    getAllUsersByFilter : function (command , then) {
        Post(url + api.getAllUsers, command , then);
    },
    getAllUserRoles:function(command,then){
        Post(url + api.getAlluUerRoles, command , then);

    }
   
};
export default GetUsersService;