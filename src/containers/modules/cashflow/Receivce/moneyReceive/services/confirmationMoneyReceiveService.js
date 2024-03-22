import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    confirmationmoneyrequest: "cashflowmaster/confirmationmoneyrequest",
};


const confirmationMoneyReceiveService = {
    confirmationmoneyrequestMethod: function (command, then) {
        Post(url + api.confirmationmoneyrequest, command, then);
    },
};
export default confirmationMoneyReceiveService;