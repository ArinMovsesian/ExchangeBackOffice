import { Post, Get } from 'core/axiosHelper';
import urlSettings from 'constants/urlSettings';
const url = urlSettings.TradeUrl;
const api = {
    getprereceivearchive: "settlementcommoditytransaction/getprereceivearchive",
};

const GetPreReceiveArchive = {
    getprereceivearchiveMethod: function (command, then) {
        Post(url + api.getprereceivearchive, command, then);
    },
};
export default GetPreReceiveArchive;