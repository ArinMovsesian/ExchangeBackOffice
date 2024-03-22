import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    confirmationpayment: "cashflowmaster/confirmationpayment",
};


const confirmationPaymentService = {
    confirmationpaymentMethod: function (command, then) {
        Post(url + api.confirmationpayment, command, then);
    },
};
export default confirmationPaymentService;