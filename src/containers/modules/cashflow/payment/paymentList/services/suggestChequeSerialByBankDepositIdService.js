import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    suggestchequeserialbybankdepositid: "cashflowchequedetail/suggestchequeserialbybankdepositid",
};


const suggestChequeSerialByBankDepositIdService = {
    suggestchequeserialbybankdepositidMethod: function (command, then) {
        Post(url + api.suggestchequeserialbybankdepositid, command, then);
    },
};
export default suggestChequeSerialByBankDepositIdService;