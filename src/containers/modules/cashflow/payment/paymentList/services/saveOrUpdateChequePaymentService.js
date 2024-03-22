import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    saveorupdatechequepayment: "cashflowmaster/saveorupdatechequepayment",
};


const saveOrUpdateChequePaymentService = {
    saveorupdatechequepaymentMethod: function (command, then) {
        Post(url + api.saveorupdatechequepayment, command, then);
    },
};
export default saveOrUpdateChequePaymentService;