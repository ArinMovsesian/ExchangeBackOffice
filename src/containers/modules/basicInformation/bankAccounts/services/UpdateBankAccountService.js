import { Post, Get } from '../../../../../core/axiosHelper';
import urlSetting from '../../../../../constants/urlSettings';

const url = urlSetting.BasicInfoUrl;
const api = {
    getbankdepositbyaccountnumberApi: "bankdeposit/getbankdepositbyaccountnumber",
    updatebankdepositApi: "bankdeposit/updatebankdeposit"
};

const EditBankAccountService = {
    
    getBankDepositByAccountNumber: function (params, then) {
        Get(url + api.getbankdepositbyaccountnumberApi, params, then);
    },
    updateBankDeposit: function (command, then) {
        Post(url + api.updatebankdepositApi, command, then);
    }
};
export default EditBankAccountService;