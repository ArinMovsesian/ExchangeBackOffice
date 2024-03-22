import { Post } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    savePersonApi: 'party/saveperson'
};

const CreatePersonManagementService ={
    savePersonApiMethod:function (command, then) {
        Post(url + api.savePersonApi, command, then, true);
    }
};
export default CreatePersonManagementService;