import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    updatepayment: "cashflowmaster/updatepayment",
};


const UpdatePaymentService = {
    updatepaymentMethod: function (command, then) {
        Post(url + api.updatepayment, command, then);
    },
};
export default UpdatePaymentService;