import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    getdetailledgersApi: "partybankaccount/savepartybankaccount"
};


    const AddPartyBankAccountService= function (command, then) {
        Post(url + api.getdetailledgersApi, command, then, true);
    }

export default AddPartyBankAccountService;