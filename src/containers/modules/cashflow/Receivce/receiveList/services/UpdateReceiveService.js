import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    updatereceive: "cashflowmaster/updatereceive",
};


const UpdateReceiveService = {
    updatereceiveMethod: function (command, then) {
        Post(url + api.updatereceive, command, then);
    },
};
export default UpdateReceiveService;