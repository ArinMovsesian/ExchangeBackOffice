import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    getcashflowchequemasterbybankdepositid: "cashflowchequemaster/getcashflowchequemasterbybankdepositid",
};


const getCashFlowChequeMasterByBankDepositIdService = {
    getcashflowchequemasterbybankdepositidMethod: function (command, then) {
        Post(url + api.getcashflowchequemasterbybankdepositid, command, then);
    },
};
export default getCashFlowChequeMasterByBankDepositIdService;