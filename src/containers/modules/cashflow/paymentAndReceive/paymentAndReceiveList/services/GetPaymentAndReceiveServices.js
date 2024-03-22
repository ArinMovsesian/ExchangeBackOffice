import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    getflatreceiveandpayment: "cashflowmaster/getflatreceiveandpayment",
};


const GetPaymentAndReceiveServices = {
    getflatreceiveandpaymentMethod: function (command, then) {
        Post(url + api.getflatreceiveandpayment, command, then);
    },
};
export default GetPaymentAndReceiveServices;