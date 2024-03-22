import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    savepartyrole: 'partyroles/savepartyrole'
};

const CreatePartyRoleService ={
    savePartyRoleMethod:function (command, then) {
        Post(url + api.savepartyrole, command, then, true);
    }
};
export default CreatePartyRoleService;