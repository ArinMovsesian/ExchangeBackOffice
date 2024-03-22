import { Post } from '../../../../../../core/axiosHelper';
import urlSettings from '../../../../../../constants/urlSettings';

const url = urlSettings.PartyManagementUrl;
const api = {
    deletedetailledgersApi: "partybankaccount/updatepartybankaccountstatusbyidandpartyid"
};


const DeletePartyBankAccountService= function (command, then) {
    Post(url + api.deletedetailledgersApi, command, then, true);
};

export default DeletePartyBankAccountService;