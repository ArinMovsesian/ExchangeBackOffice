import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    suggestchequeserialbycashflowchequemasterid: "cashflowchequedetail/suggestchequeserialbycashflowchequemasterid",
};


const suggestChequeSerialByCashFlowChequeMasterIdService = {
    suggestchequeserialbycashflowchequemasteridMethod: function (command, then) {
        Post(url + api.suggestchequeserialbycashflowchequemasterid, command, then);
    },
};
export default suggestChequeSerialByCashFlowChequeMasterIdService;