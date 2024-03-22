import { Get } from '../../../../../core/axiosHelper';
import urlSettings from '../../../../../constants/urlSettings';

const url = urlSettings.BasicInfoUrl;
const api = {
    getallbankdepositApi: "bankdeposit/getallbankdeposit"
};

const GetBankAccountsService = {
    getAllBankDeposit: function (params, then) {
        Get(url + api.getallbankdepositApi, params, then, true);
    }
};
export default GetBankAccountsService;