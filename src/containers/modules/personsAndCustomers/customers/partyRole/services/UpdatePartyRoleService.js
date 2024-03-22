import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    updatepartyrole: 'partyroles/updatepartyrole'
};

const UpdatePartyRoleService ={
    updatePartyRoleMethod:function (command, then) {
         Post(url + api.updatepartyrole, command, then, true);
    }
} ;
export default UpdatePartyRoleService;