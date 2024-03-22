import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    deletecashflowmasterbyid: "cashflowmaster/deletecashflowmasterbyid",
};


const DeletePaymentService = {
    deletecashflowmasterbyidMethod: function (command, then) {
        Post(url + api.deletecashflowmasterbyid, command, then);
    },
};
export default DeletePaymentService;