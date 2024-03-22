import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    confirmationreceive: "cashflowmaster/confirmationreceive",
};


const confirmationReceiveService = {
    confirmationreceiveMethod: function (command, then) {
        Post(url + api.confirmationreceive, command, then);
    },
};
export default confirmationReceiveService;