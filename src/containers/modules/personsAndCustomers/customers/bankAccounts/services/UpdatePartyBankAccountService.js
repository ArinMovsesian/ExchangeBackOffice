import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    updatedetailledgersApi: "partybankaccount/updatepartybankaccount"
};


const UpdatePartyBankAccountService= function (command, then) {
    Post(url + api.updatedetailledgersApi, command, then, true);
}

export default UpdatePartyBankAccountService;