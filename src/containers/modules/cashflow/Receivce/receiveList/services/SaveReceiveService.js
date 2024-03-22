import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.CashFlowUrl;
const api = {
    savereceive: "cashflowmaster/savereceive",
};


const SaveReceiveService = {
    savereceiveMethod: function (command, then) {
        Post(url + api.savereceive, command, then);
    },
};
export default SaveReceiveService;