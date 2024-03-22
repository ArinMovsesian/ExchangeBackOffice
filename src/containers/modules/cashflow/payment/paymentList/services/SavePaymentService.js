import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    savepayment: "cashflowmaster/savepayment",
};


const SavePaymentService = {
    savepaymentMethod: function (command, then) {
        Post(url + api.savepayment, command, then);
    },
};
export default SavePaymentService;