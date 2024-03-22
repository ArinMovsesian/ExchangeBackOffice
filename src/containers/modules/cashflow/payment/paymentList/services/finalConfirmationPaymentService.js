import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    finalconfirmationpayment: "cashflowmaster/finalconfirmationpayment",
};


const finalConfirmationPaymentService = {
    finalconfirmationpaymentMethod: function (command, then) {
        Post(url + api.finalconfirmationpayment, command, then);
    },
};
export default finalConfirmationPaymentService;