import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    finalconfirmationmoneyrequest: "cashflowmaster/finalconfirmationreceive",
};


const finalConfirmationReceiveService = {
    finalconfirmationmoneyrequestMethod: function (command, then) {
        Post(url + api.finalconfirmationmoneyrequest, command, then);
    },
};
export default finalConfirmationReceiveService;