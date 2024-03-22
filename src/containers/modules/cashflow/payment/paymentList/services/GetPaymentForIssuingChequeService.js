import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    getpaymentforissuingcheque: "cashflowmaster/getpaymentforissuingcheque",
};


const GetPaymentForIssuingChequeService = {
    getpaymentforissuingchequeMethod: function (command, then) {
        Post(url + api.getpaymentforissuingcheque, command, then);
    },
};
export default GetPaymentForIssuingChequeService;