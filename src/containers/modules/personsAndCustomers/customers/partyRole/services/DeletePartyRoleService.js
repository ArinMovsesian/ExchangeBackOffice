import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    deletepartyrolebyid: 'partyroles/deletepartyrolebyid'
};

const DeletePartyRoleService ={
    deletePartyRoleByIdMethod:function (command, then) {
        Post(url + api.deletepartyrolebyid, command, then, true);
    }
};
export default DeletePartyRoleService;